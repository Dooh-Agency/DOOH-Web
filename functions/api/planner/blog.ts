import { accessEmail, error, json, type PlannerContext } from "../../_shared/planner";
import { listBlogNotes } from "../../_shared/blog";

// Notas en preparación de la pestaña “Blog” de la grilla, para la pestaña “Blog”
// del planificador. Las publicadas y programadas las arma el sitio al compilar
// (/planificador-redes/notas-blog.json).
export async function onRequestGet({ request, env }: PlannerContext) {
  const email = await accessEmail(request, env);
  if (!email) return error("Ingresá al planificador con un email habilitado del equipo.", 401);
  return json({ notes: await listBlogNotes(env.PLANNER_DB) });
}
