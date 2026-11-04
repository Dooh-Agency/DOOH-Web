# Puesta en producción en Cloudflare Pages

Guía para publicar el sitio en `https://www.dooh.com.ar` y dejar de usar Wix. Seguir los pasos en orden: el dominio se mueve recién al final, cuando el preview está probado.

## 1. Crear el proyecto de Pages

1. Crear una cuenta gratuita de Cloudflare con un correo del equipo (por ejemplo `hello@dooh.com.ar`).
2. Ir a **Workers & Pages → Create → Pages → Connect to Git** y autorizar GitHub para el repositorio `Dooh-Agency/DOOH-Web`.
3. Configurar el build:

   | Campo | Valor |
   | --- | --- |
   | Production branch | `main` |
   | Framework preset | `None` |
   | Build command | `npm run build` |
   | Build output directory | `out` |
   | Variable `NODE_VERSION` | `20` |

4. Antes del primer deploy, cargar las variables del paso 2. Si el primer build sale sin ellas, cargarlas y usar **Retry deployment**.

## 2. Variables de entorno

En **Settings → Variables and Secrets**. Las `NEXT_PUBLIC_*` se leen al compilar: cada cambio requiere un nuevo deploy. Las demás las leen las funciones (formulario y planificador) en cada pedido.

| Variable | Tipo | Production | Preview |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Text | `https://www.dooh.com.ar` | URL del preview, por ejemplo `https://dooh-web.pages.dev` |
| `RESEND_API_KEY` | **Secret** | Clave de Resend (paso 3) | Igual |
| `RESEND_FROM_EMAIL` | Text | `DOOH <contacto@dooh.com.ar>` | Igual |
| `CONTACT_RECIPIENT` | Text | `hello@dooh.com.ar` | Igual |
| `ALLOWED_CONTACT_ORIGIN` | Text | `https://www.dooh.com.ar` | Vacía |
| `ACCESS_TEAM_DOMAIN`, `ACCESS_AUD`, `PLANNER_SYNC_SECRET`, `PLANNER_ACTIONS_URL` | Ver guía del planificador | Production | — |

El planificador de redes usa además la base D1 `PLANNER_DB`, el bucket R2 `PLANNER_BUCKET` y Cloudflare Access. Su configuración está en [`automation/google-sheet-sync/SETUP.md`](../../automation/google-sheet-sync/SETUP.md).

## 3. Resend (envío del formulario)

1. Crear una cuenta en [resend.com](https://resend.com) con el correo del equipo.
2. En **Domains → Add domain**, agregar `dooh.com.ar` y copiar los registros DNS que indique (SPF, DKIM y el MX de rebote). Cargarlos en el DNS donde esté el dominio hoy; si ya se migró a Cloudflare (paso 5), cargarlos ahí con el proxy **desactivado** (nube gris).
3. Esperar a que el dominio figure como **Verified**.
4. En **API Keys → Create API key**, permiso **Sending access** limitado a `dooh.com.ar`. Pegar la clave como `RESEND_API_KEY` y no guardarla en ningún otro lado.

## 4. Probar el preview

Con el deploy en `*.pages.dev`, revisar:

- [ ] Inicio en escritorio y celular: menú, servicios, galería de proyectos y botón de WhatsApp.
- [ ] Formulario: enviar una consulta real y confirmar que llega a `hello@dooh.com.ar` y que redirige a `/gracias`. Sin aceptar la política de privacidad no debe enviarse.
- [ ] Blog: abrir `/blog` y una nota con tildes en la URL (por ejemplo `/blog/diseño-que-siente-tecnología-que-conecta`).
- [ ] Redirecciones de Wix: `/post/riba-reimaginada-rediseñar-el-legado` → nota del blog; `/proyectos/kanso` → sección de proyectos; `/blog/categories/diseño` → `/blog`.
- [ ] `/privacidad`, una URL inexistente (debe mostrar la página 404 de DOOH), `/robots.txt` y `/sitemap.xml`.
- [ ] Favicon en la pestaña e imagen al compartir: pegar el link en [opengraph.xyz](https://www.opengraph.xyz) o en el [Post Inspector de LinkedIn](https://www.linkedin.com/post-inspector/).
- [ ] `/planificador-redes`: el acceso por email funciona (agregar antes la URL del preview en Supabase, ver paso 6).

## 5. Mover el dominio a Cloudflare

`dooh.com.ar` está registrado en NIC Argentina; el DNS hoy lo resuelve Wix.

1. En Cloudflare, **Add a domain** → `dooh.com.ar` → plan **Free**.
2. Cloudflare importa los registros DNS actuales. **Revisar que estén los MX y TXT del correo** (Google Workspace u otro proveedor) antes de seguir: si faltan, el correo deja de funcionar al cambiar los nameservers.
3. En [NIC Argentina](https://nic.ar) (Trámites a Distancia), en el dominio, reemplazar los servidores DNS de Wix por los dos nameservers que indique Cloudflare. Puede tardar unas horas en impactar.
4. Cuando el dominio figure **Active** en Cloudflare, ir al proyecto de Pages → **Custom domains** y agregar `www.dooh.com.ar` y `dooh.com.ar`.
5. Redirigir el dominio sin `www` al principal: **Rules → Redirect Rules → Create rule**, si el hostname es `dooh.com.ar`, redirección dinámica 301 a `concat("https://www.dooh.com.ar", http.request.uri.path)` conservando la query string.
6. En **SSL/TLS**, modo **Full** y **Always Use HTTPS** activado.

## 6. Después de publicar

- Supabase → **Authentication → URL Configuration**: Site URL `https://www.dooh.com.ar` y agregar `https://www.dooh.com.ar/planificador-redes` (y la URL del preview, si se sigue usando) a Redirect URLs.
- Confirmar `ALLOWED_CONTACT_ORIGIN = https://www.dooh.com.ar` en Production y volver a enviar una consulta de prueba.
- Métricas sin cookies: proyecto de Pages → **Metrics → Web Analytics → Enable**.
- [Google Search Console](https://search.google.com/search-console): agregar la propiedad de dominio `dooh.com.ar` (verificación por TXT en Cloudflare) y enviar `https://www.dooh.com.ar/sitemap.xml`.
- Dar de baja el plan de Wix solo después de comprobar que el sitio, el correo y el formulario funcionan. Si el dominio se hubiera comprado a través de Wix, transferirlo antes de cancelar.
