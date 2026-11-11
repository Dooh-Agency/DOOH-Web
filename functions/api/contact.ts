import type { D1Database } from "../_shared/planner";
import { describeOrigin, readOrigin, recordLead } from "../_shared/leads";

interface Env {
  PLANNER_DB?: D1Database;
  ALLOWED_CONTACT_ORIGIN?: string;
  CONTACT_RECIPIENT?: string;
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
}

type ContactFields = {
  email: string;
  mensaje: string;
  nombre: string;
  whatsapp: string;
};

const maxLengths = {
  nombre: 120,
  email: 254,
  whatsapp: 60,
  mensaje: 5000,
};

function value(formData: FormData, name: keyof ContactFields) {
  return String(formData.get(name) ?? "").trim().slice(0, maxLengths[name]);
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function redirect(request: Request, destination: "/gracias" | "/contacto-error") {
  return Response.redirect(new URL(destination, request.url), 303);
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  const { request, env } = context;
  const origin = request.headers.get("Origin");

  if (env.ALLOWED_CONTACT_ORIGIN && origin !== env.ALLOWED_CONTACT_ORIGIN) {
    return new Response("Origen no autorizado.", { status: 403 });
  }

  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL || !env.CONTACT_RECIPIENT) {
    return new Response("El formulario no está configurado.", { status: 503 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return redirect(request, "/contacto-error");
  }

  // El honeypot sigue presente para descartar envíos automatizados sin
  // revelarles que fueron detectados.
  if (String(formData.get("bot-field") ?? "").trim()) {
    return redirect(request, "/gracias");
  }

  // Los envíos reales pasan por la página: el navegador completa “form-start”
  // con la hora en que se abrió el formulario y la página de contacto. Los bots
  // que mandan el POST directo llegan sin eso (o en menos de 3 segundos) y se
  // descartan en silencio, sin mail ni registro.
  const startedAt = Number(formData.get("form-start"));
  const elapsed = Date.now() - startedAt;
  if (!startedAt || !String(formData.get("origen_page") ?? "").trim() || elapsed < 3000 || elapsed > 2 * 24 * 60 * 60 * 1000) {
    console.warn(`Formulario descartado como automático (form-start: ${startedAt ? `${Math.round(elapsed / 1000)} s` : "sin dato"}).`);
    return redirect(request, "/gracias");
  }

  const fields: ContactFields = {
    nombre: value(formData, "nombre"),
    email: value(formData, "email"),
    whatsapp: value(formData, "whatsapp"),
    mensaje: value(formData, "mensaje"),
  };

  if (!fields.nombre || !fields.mensaje || !/^\S+@\S+\.\S+$/.test(fields.email)) {
    return redirect(request, "/contacto-error");
  }

  // Canal por el que llegó la persona (sin datos personales), ver functions/_shared/leads.ts.
  const leadOrigin = readOrigin((name) => formData.get(name));
  const originText = describeOrigin(leadOrigin);

  const safeName = fields.nombre.replace(/[\r\n]/g, " ");
  // Tolera espacios o saltos de línea pegados junto con la clave en Cloudflare.
  const apiKey = env.RESEND_API_KEY.trim();
  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.RESEND_FROM_EMAIL,
      to: [env.CONTACT_RECIPIENT],
      reply_to: fields.email,
      subject: `Nueva consulta web: ${safeName}`,
      text: [
        `Nombre: ${fields.nombre}`,
        `Email: ${fields.email}`,
        `WhatsApp: ${fields.whatsapp || "No informado"}`,
        "",
        "Mensaje:",
        fields.mensaje,
        "",
        `Origen: ${originText}`,
      ].join("\n"),
      html: `<h1>Nueva consulta web</h1>
<p><strong>Nombre:</strong> ${escapeHtml(fields.nombre)}</p>
<p><strong>Email:</strong> ${escapeHtml(fields.email)}</p>
<p><strong>WhatsApp:</strong> ${escapeHtml(fields.whatsapp || "No informado")}</p>
<p><strong>Mensaje:</strong></p>
<p>${escapeHtml(fields.mensaje).replace(/\n/g, "<br>")}</p>
<p style="color:#666;font-size:12px"><strong>Origen:</strong> ${escapeHtml(originText)}</p>`,
    }),
  });

  if (!emailResponse.ok) {
    // Visible en Cloudflare → Workers & Pages → dooh-web → Functions → Real-time logs.
    // No incluye datos de la consulta ni la clave: solo el código, el motivo que
    // devuelve Resend y el formato de la clave (largo y prefijo) para detectar
    // si se guardó incompleta.
    console.error(
      `Resend rechazó el envío (${emailResponse.status}): ${(await emailResponse.text()).slice(0, 300)}` +
        ` · clave: ${apiKey.length} caracteres, empieza con "re_": ${apiKey.startsWith("re_")}`,
    );
    return redirect(request, "/contacto-error");
  }

  // El registro del origen nunca debe impedir que la consulta llegue.
  try {
    await recordLead(env.PLANNER_DB, "form", leadOrigin);
  } catch (error) {
    console.error(`No se pudo registrar el origen de la consulta: ${String(error).slice(0, 200)}`);
  }

  return redirect(request, "/gracias");
}
