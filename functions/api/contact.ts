interface Env {
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

  const formData = await request.formData();

  // El honeypot sigue presente para descartar envíos automatizados sin
  // revelarles que fueron detectados.
  if (String(formData.get("bot-field") ?? "").trim()) {
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

  const safeName = fields.nombre.replace(/[\r\n]/g, " ");
  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
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
      ].join("\n"),
      html: `<h1>Nueva consulta web</h1>
<p><strong>Nombre:</strong> ${escapeHtml(fields.nombre)}</p>
<p><strong>Email:</strong> ${escapeHtml(fields.email)}</p>
<p><strong>WhatsApp:</strong> ${escapeHtml(fields.whatsapp || "No informado")}</p>
<p><strong>Mensaje:</strong></p>
<p>${escapeHtml(fields.mensaje).replace(/\n/g, "<br>")}</p>`,
    }),
  });

  return emailResponse.ok
    ? redirect(request, "/gracias")
    : redirect(request, "/contacto-error");
}
