# Plan técnico para el piloto de plataforma IA para PyMEs

## Estado y propósito

Este documento convierte la hipótesis descrita en [IDEA_PLATAFORMA_IA_PYMES.md](IDEA_PLATAFORMA_IA_PYMES.md) en un plan técnico y operativo para ejecutar un piloto pago. Su objetivo no es construir desde el inicio un SaaS completo, sino crear una base que permita aprender rápido sin perder los activos que luego formarán parte del producto.

**Decisión actual:** avanzar con un piloto asistido de 8 a 12 semanas para 5 a 10 negocios de un único nicho. No iniciar todavía un desarrollo integral de CRM, CMS, gestor de redes, Ads manager o chatbot autónomo.

La regla rectora es:

> Construir y conservar lo que diferencia a DOOH; integrar o contratar lo que es infraestructura, commodity o todavía no fue validado.

## 1. Resultado que debe validar el piloto

El piloto valida un único flujo de punta a punta:

```text
Novedad o foto del negocio
        ↓
Pieza y copy sugeridos según la marca
        ↓
Aprobación explícita del cliente
        ↓
Publicación o landing de campaña
        ↓
Consulta capturada
        ↓
Lead ordenado y seguimiento sugerido
        ↓
Resumen semanal de resultados y próxima acción
```

El producto no se medirá por cantidad de posteos generados. Debe demostrar que ayuda al negocio a comunicar con continuidad, responder mejor y no perder oportunidades comerciales.

### 1.1 Criterio para continuar

Después de tres meses se recomendará construir un MVP funcional propio sólo si se verifica lo siguiente:

- Los pilotos son pagos, incluso si tienen precio preferencial.
- Una mayoría de las cuentas completa el onboarding y logra una primera publicación o consulta en los primeros siete días.
- Los responsables usan el sistema semanalmente.
- Existen renovaciones al tercer mes o una intención contractual verificable de renovación.
- El flujo genera una mejora medible: consultas capturadas, tiempo de respuesta, seguimientos o ventas/turnos/presupuestos cuando puedan atribuirse.
- El onboarding, soporte y revisión humana dejan una contribución positiva por cuenta.
- El mismo flujo se repite sin adaptaciones artesanales significativas entre clientes.

### 1.2 Señales para descartar o reformular

Se debe pausar, cambiar de nicho o reformular la propuesta si se observa que:

- Los entrevistados expresan interés, pero no aceptan pagar.
- Cada cuenta exige diseño, estrategia o configuración manual permanente.
- El uso se concentra en la primera semana y no vuelve a ocurrir.
- El cliente sólo valora contenido producido manualmente por DOOH, no el flujo asistido.
- La complejidad de permisos, canales o soporte supera el valor entregado.
- Los costos variables de IA, mensajería y soporte exceden el ingreso mensual viable.

## 2. Alcance del piloto

### Incluido

1. Perfil de marca: tono, servicios, audiencias, activos, reglas, palabras a evitar y plantillas.
2. Flujo «foto o novedad a publicación»: carga, copy, llamada a la acción, variantes y aprobación.
3. Calendario editorial simple para un canal prioritario, inicialmente Instagram.
4. Landing de campaña basada en bloques seguros y formulario/CTA hacia WhatsApp.
5. Captura de consultas y contactos procedentes de la landing, formularios y, cuando sea viable, WhatsApp.
6. Pipeline mínimo: nuevo, contactado, en seguimiento, ganado, perdido.
7. Respuestas sugeridas para preguntas frecuentes y derivación obligatoria de casos sensibles.
8. Resumen semanal: contenido publicado, consultas, pendientes y próxima acción sugerida.

### Excluido explícitamente

- CRM completo o personalizable.
- Constructor web libre.
- Editor gráfico avanzado.
- Gestión autónoma de Ads o presupuestos publicitarios.
- E-commerce, catálogo, stock o pagos del negocio final.
- Automatizaciones multicanal complejas.
- Respuestas comerciales autónomas sin reglas, aprobación y derivación humana.
- Integraciones hechas a medida para cada cliente.

## 3. Principios de arquitectura

1. **La base de datos propia es la fuente de verdad.** Ninguna planilla, herramienta de automatización o CRM externo debe ser el único lugar donde existen marcas, contactos, contenidos o estados de aprobación.
2. **La experiencia de usuario es propiedad de DOOH.** La interfaz debe ocultar la complejidad técnica detrás de cuatro acciones: crear, aprobar, responder y ver resultados.
3. **Integraciones reemplazables.** IA, email, automatizaciones, pagos y mensajería deben estar encapsulados detrás de servicios propios para poder cambiar de proveedor sin reescribir el producto.
4. **Aprobación por defecto.** La IA propone; la publicación y toda acción comercial sensible se aprueba o se deriva a un humano.
5. **Multiempresa desde el modelo de datos.** Aunque el piloto tenga pocos clientes, cada registro debe pertenecer a una organización/marca y estar protegido por permisos.
6. **Trazabilidad antes que autonomía.** Debe poder saberse qué información originó una pieza o respuesta, qué hizo la IA, quién aprobó y cuándo se ejecutó.
7. **Límites de producto visibles.** Capacidad, revisiones, canales y trabajo humano incluidos deben estar definidos por plan; nunca implícitos.

## 4. Stack recomendado

La selección siguiente privilegia velocidad de aprendizaje, continuidad técnica y bajo costo de operación inicial. Puede revisarse cuando el piloto haya validado los flujos y el volumen.

| Capa | Herramienta/proveedor recomendado | Uso durante el piloto | Decisión a futuro |
|---|---|---|---|
| Aplicación web | Next.js, React, TypeScript y Tailwind | Panel del cliente y landings. El repositorio actual ya usa esta base. | Mantener como capa de producto. |
| Hosting | Vercel o infraestructura equivalente | Despliegue, previews y entornos. | Mantener; evaluar costo al escalar. |
| Base de datos, auth y archivos | Supabase | Organizaciones, usuarios, marcas, leads, actividades, permisos, storage. | Mantener inicialmente como fuente de verdad. |
| IA de texto y análisis | API de OpenAI, mediante servicio backend propio | Copy, variantes, extracción desde imagen, clasificación, resúmenes y respuestas sugeridas. | Mantener proveedor intercambiable. |
| IA visual | API de imagen, opcional al comienzo | Variantes y adaptaciones visuales simples. | Incorporar sólo cuando el flujo de contenido valide su valor. |
| Orquestación | n8n autoalojado o Make | Webhooks, avisos, recordatorios e integraciones de baja complejidad. | Mantener como auxiliar, no como fuente de verdad. |
| Publicación social | API oficial de Meta / Instagram Graph API | Publicar contenido aprobado y consultar estado básico. | Integración oficial permanente. |
| WhatsApp | WhatsApp Business Platform / Cloud API | Conversaciones, plantillas aprobadas, derivación humana y eventos. | Fase posterior del piloto; debe ser oficial. |
| Landing y formularios | Componentes propios en Next.js | Formularios y páginas de campaña por bloques seguros. | Mantener; no crear CMS libre. |
| Analítica de producto | PostHog y eventos propios | Activación, uso, embudo y retención. | Mantener o sustituir por necesidad. |
| Errores y monitoreo | Sentry o equivalente | Excepciones, alertas y trazas. | Mantener desde el primer usuario real. |
| Email transaccional | Resend, Postmark o equivalente | Invitaciones, recordatorios y resumen semanal. | Mantener como proveedor intercambiable. |
| Pagos | Cobro manual en piloto; Mercado Pago para Argentina y Stripe si se internacionaliza | Validar disposición a pagar y luego automatizar suscripciones. | Decidir por mercado objetivo. |
| Repositorio y entrega | GitHub + CI/CD | Código, revisiones, ramas, despliegues y trazabilidad. | Mantener. |
| Diseño y descubrimiento | Figma + herramienta de gestión (Linear, Notion o GitHub Projects) | Prototipos, entrevistas, backlog, decisiones y evidencia. | Mantener una única fuente de planificación. |

### 4.1 Qué no debe resolver una plataforma no-code

Herramientas como n8n, Make, formularios externos o un CRM de terceros permiten acelerar el aprendizaje, pero no deben ser el núcleo de la solución. No deben ser el único repositorio de:

- usuarios, marcas y permisos;
- historial de contactos y actividades;
- contenidos, aprobaciones y publicaciones;
- reglas de marca y bases de conocimiento;
- métricas de uso y facturación.

Si una automatización falla, se duplica o se cambia de proveedor, los datos y el producto deben conservar su continuidad.

## 5. Arquitectura lógica inicial

```text
Cliente / equipo DOOH
        │
        ▼
Aplicación Next.js
  - Crear / Aprobar / Responder / Resultados
        │
        ▼
Backend de aplicación
  - autorización por organización
  - reglas de negocio
  - auditoría y aprobaciones
  - API interna
     │          │          │
     ▼          ▼          ▼
Supabase      Servicio IA     Adaptadores de integración
- datos        - prompts      - Meta/Instagram
- auth         - contexto     - WhatsApp
- archivos     - evaluación   - email
- auditoría    - costos       - n8n/Make
     │                              │
     └──────── eventos y métricas ──┘
                    │
                    ▼
             Analítica / alertas
```

### 5.1 Entidades mínimas de datos

| Entidad | Finalidad |
|---|---|
| Organización | Cuenta comercial del cliente, plan, límites y configuración. |
| Usuario y rol | Acceso del dueño, equipo del cliente y operadores de DOOH. |
| Marca | Tono, servicios, audiencias, reglas, activos y templates. |
| Activo | Imagen, documento, logo u otro archivo con metadatos y permisos. |
| Campaña/contenido | Borrador, versión, canal, CTA, fecha, estado y responsable. |
| Aprobación | Quién aprobó/rechazó, comentario, fecha y versión aprobada. |
| Publicación | Identificador externo, canal, estado, URL y métricas básicas. |
| Contacto | Datos mínimos, origen, consentimiento y organización. |
| Conversación/mensaje | Canal, estado, clasificación, responsable y vínculo con contacto. |
| Oportunidad | Estado del pipeline, valor opcional, próxima acción y resultado. |
| Actividad | Llamada, tarea, seguimiento, nota o cambio de estado. |
| Ejecución IA | Entrada, salida, versión de prompt, costos, modelo y controles aplicados. |
| Evento de auditoría | Acción, actor, fecha, recurso afectado y resultado. |

El identificador de organización debe estar presente en toda entidad de negocio. Los permisos a nivel de base de datos deben impedir que una cuenta acceda a datos de otra.

## 6. Diseño de IA y seguridad de acciones

La IA no debe manejarse como un agente genérico que "hace marketing". Cada capacidad se implementa como una tarea acotada, con información conocida y resultado verificable.

| Capacidad | Entrada permitida | Salida | Control obligatorio |
|---|---|---|---|
| Generar copy | Brief, activo, perfil de marca, canal | Borrador y variantes | Aprobación antes de publicar. |
| Clasificar consulta | Mensaje entrante y categorías | Intención, prioridad, tema | Derivar si hay baja confianza o tema sensible. |
| Sugerir respuesta | FAQ validada, mensaje y tono | Borrador de respuesta | Aprobación humana en piloto. |
| Crear resumen semanal | Eventos y métricas del sistema | Resumen y próxima acción | No inventar métricas; enlaces a evidencia. |
| Extraer información de imagen | Imagen y contexto ingresado por el usuario | Etiquetas o propuesta de contenido | El usuario confirma datos comerciales. |

No se habilitará al modelo a cambiar precios, condiciones, disponibilidad, compromisos legales o presupuestos de Ads. Tales operaciones son acciones estructuradas y requieren aprobación explícita de una persona autorizada.

### 6.1 Capa de IA a conservar

El valor propio no está en el modelo fundacional, sino en:

- el perfil de marca estructurado;
- los prompts y plantillas versionados;
- las reglas de canal y negocio;
- la recuperación de conocimiento aprobado;
- la evaluación de calidad y seguridad;
- el historial de aprobación y correcciones;
- las métricas de costo, resultado y uso.

Las claves de proveedores se guardarán exclusivamente en variables seguras del servidor. Nunca se expondrán en el navegador ni se compartirán entre clientes.

## 7. Integraciones y orden de implementación

### Fase 1: núcleo sin dependencia externa crítica

- Perfil de marca y carga de activos.
- Creación de contenido, copy y estados de aprobación.
- Landing con formulario propio.
- Contactos, pipeline y recordatorios internos.
- Métricas de producto y auditoría.

Esta fase permite probar la experiencia incluso si las integraciones de Meta o WhatsApp demoran su aprobación.

### Fase 2: Instagram

- Conexión mediante API oficial y permisos correspondientes.
- Publicación de contenido que ya fue aprobado.
- Registro de publicación y resultado de entrega.
- Manejo de revocación de permisos y fallos de publicación.

No se debe depender de credenciales personales de empleados ni de mecanismos no oficiales de automatización.

### Fase 3: WhatsApp

- Cuenta de negocio, número y proceso de verificación según los requisitos vigentes del proveedor.
- Captura de eventos de mensajes por webhook.
- Conversación vinculada a contacto y organización.
- Derivación humana y templates para mensajes salientes cuando correspondan.
- Políticas de consentimiento, retención y atención de solicitudes de datos.

Por su complejidad operativa, regulatoria y de costos, WhatsApp debe incorporarse una vez que el flujo de contenido, landing y lead haya demostrado valor.

### Fase 4: automatizaciones

- Recordatorio si un lead no tuvo seguimiento.
- Resumen semanal por email.
- Aviso de contenido listo para aprobar.
- Registro de errores o tareas pendientes.

Cada automatización debe ser idempotente: si se ejecuta dos veces, no debe duplicar publicaciones, contactos ni mensajes.

## 8. Plan de ejecución

| Etapa | Duración orientativa | Entregables | Decisión de salida |
|---|---:|---|---|
| Descubrimiento | 4–6 semanas | Nicho elegido, 15–20 entrevistas, mapa de tareas, prototipo navegable y propuesta piloto. | Hay dolor claro y clientes dispuestos a pagar. |
| Preparación técnica | 2–3 semanas, en paralelo | Modelo de datos, entornos, auth, seguridad básica, analítica, diseño de aprobaciones. | La plataforma puede recibir datos de piloto de forma segura. |
| Piloto asistido | 8–12 semanas | 5–10 cuentas, operación documentada, métricas semanales y registro de excepciones. | Uso, renovación y margen inicial. |
| MVP funcional | 3–4 meses después de validar | Interfaz propia consolidada sobre los flujos repetidos. | Suscripción recurrente con operación estandarizada. |
| Escala controlada | Posterior | Onboarding automatizado, más cuentas, nuevos canales o verticales. | Crecimiento sin trabajo manual diario por cuenta. |

### 8.1 Backlog técnico del piloto, en orden

1. Definir nicho, promesa, precio piloto y criterios de éxito.
2. Crear modelo de datos multiempresa y roles de usuario.
3. Configurar repositorio, entornos, despliegue, secretos, logging y monitoreo.
4. Implementar onboarding de marca y carga segura de activos.
5. Implementar creación de contenido, versiones, aprobación y auditoría.
6. Implementar landing de campaña, formularios, contactos y pipeline mínimo.
7. Instrumentar eventos de producto y tablero interno de métricas.
8. Integrar publicación de Instagram sólo si los permisos están listos.
9. Incorporar automatizaciones de bajo riesgo y operación asistida.
10. Incorporar WhatsApp sólo después de validar el flujo central y la base legal.

## 9. Operación del piloto

Cada cuenta debe seguir el mismo proceso para que el aprendizaje sea comparable:

1. Selección y aceptación del piloto pago.
2. Onboarding de 60–90 minutos con checklist fijo.
3. Carga de servicios, tono, FAQs, activos, contactos iniciales y límites de aprobación.
4. Configuración de una campaña/novedad real durante la primera semana.
5. Revisión semanal de uso, excepciones, consultas y tareas.
6. Registro de todo trabajo humano adicional: duración, causa y frecuencia.
7. Revisión de continuidad y renovación al cierre del período.

El soporte no debe resolver por fuera de la plataforma lo que podría convertirse en una función o una limitación explícita. Si se hace una excepción, debe quedar registrada como tal.

## 10. Métricas

### Producto

- Porcentaje que completa onboarding.
- Tiempo hasta primera publicación o primer lead.
- Usuarios activos semanalmente por organización.
- Contenido creado, aprobado y publicado.
- Tasa de aprobación, rechazo y edición manual.
- Uso de las funciones de crear, aprobar, responder y resultados.

### Valor para el cliente

- Consultas capturadas por fuente.
- Tiempo hasta primera respuesta.
- Porcentaje de leads con seguimiento.
- Turnos, presupuestos u oportunidades creadas.
- Valor/resultado declarado por el cliente cuando no sea posible atribuir una venta.

### Negocio y operación

- Conversión de entrevista a piloto pago.
- Renovación al mes 1 y mes 3.
- Ingreso mensual promedio por cuenta.
- Costo de onboarding, soporte e intervención humana por cuenta.
- Costo de IA, mensajería, infraestructura y almacenamiento por cuenta.
- Margen de contribución por cuenta.
- Porcentaje de cuentas que compra un add-on o servicio premium.

La métrica económica central es:

```text
contribución mensual por cuenta = ingreso mensual
  - IA - APIs/mensajería - hosting - almacenamiento - soporte variable
```

## 11. Seguridad, privacidad y cumplimiento

Antes de incorporar datos reales de contactos y conversaciones se debe definir, con asesoramiento legal, como mínimo:

- política de privacidad y términos del servicio;
- rol de DOOH y del cliente respecto de los datos personales;
- acuerdos de tratamiento de datos cuando correspondan;
- finalidad, minimización, consentimiento y retención de datos;
- procedimientos de acceso, rectificación y eliminación;
- política de acceso por roles y baja de usuarios;
- backups, recuperación y registro de auditoría;
- manejo de incidentes de seguridad;
- proveedores que procesan datos y sus transferencias internacionales.

Para Argentina se debe considerar la Ley 25.326. Si se ofrecen servicios en España o se tratan datos sujetos al RGPD, se requerirá una revisión específica de responsabilidades, medidas y contratos.

## 12. Perfiles y responsabilidades

| Perfil | Necesidad | Responsabilidad principal |
|---|---|---|
| Product owner / responsable de negocio | Imprescindible | Nicho, promesa, precio, prioridades, métricas y decisión de inversión. |
| Tech lead / ingeniero full-stack senior | Imprescindible | Arquitectura, datos, seguridad, integraciones, calidad y deuda técnica. |
| Desarrollador/a full-stack | Imprescindible durante construcción | Interfaz, backend, base de datos, landings e integraciones. |
| Diseñador/a UX/UI o product designer | Imprescindible en descubrimiento y MVP | Prototipo, usabilidad y flujos de baja fricción. |
| Estratega de marca/contenido DOOH | Imprescindible | Perfil de marca, templates, calidad y límites creativos. |
| Operaciones / customer success | Imprescindible durante piloto | Onboarding, soporte, documentación y registro de excepciones. |
| Especialista IA aplicada | Recomendado; puede ser el tech lead al inicio | Prompts, evaluaciones, guardrails, costos y calidad. |
| Legal en privacidad y contratos tecnológicos | Puntual pero obligatorio antes de escalar | Datos personales, contratos, consentimientos y cumplimiento. |
| Finanzas / analista de negocio | Recomendado | Unit economics, pricing, margen y punto de equilibrio. |

### 12.1 Papel de las plataformas de IA

Las plataformas de IA aceleran prototipado, generación de código, contenido, clasificación y automatizaciones. Son suficientes para un prototipo demostrable, pero no reemplazan el rol técnico en un piloto pago con datos de terceros.

Un perfil técnico es necesario para manejar correctamente autenticación, separación entre clientes, permisos OAuth, webhooks, claves, reintentos, seguridad, costos, trazabilidad y evolución del código. La IA aumenta su productividad; no asume la responsabilidad de la arquitectura ni del cumplimiento.

## 13. Decisiones que no deben postergarse

1. Nicho inicial y problema prioritario.
2. Quién será responsable del producto y quién será responsable técnico.
3. Precio de implementación y precio piloto.
4. Canal inicial: Instagram como prioridad y WhatsApp como segunda integración.
5. Política de aprobación y temas que siempre se derivan a una persona.
6. Fuente de verdad de datos: base propia desde el inicio.
7. Criterios cuantitativos para continuar, pausar o cancelar.

## 14. Próximas acciones inmediatas

1. Elegir un nicho y preparar la lista de 15–20 entrevistas.
2. Redactar guion de entrevistas y oferta de piloto pago.
3. Diseñar en Figma el flujo «foto/novedad a publicación y lead».
4. Nombrar a un product owner y contratar/asignar un tech lead.
5. Estimar el costo y plazo de la preparación técnica mínima.
6. Iniciar la revisión de permisos de Meta, WhatsApp y requisitos de privacidad sin bloquear el aprendizaje inicial.
7. Vender los primeros 5–10 pilotos antes de ampliar el alcance de desarrollo.

## 15. Conclusión

La oportunidad no se valida construyendo una plataforma grande, sino entregando una mejora visible y repetible a un grupo pequeño de clientes pagos. La arquitectura inicial debe ser deliberadamente liviana, pero conservar los datos, flujos, reglas de marca y trazabilidad que constituirán el producto de DOOH.

El camino recomendado es: **entrevistas → piloto pago asistido → evidencia de uso y margen → MVP propio sobre flujos repetidos**. Esta secuencia reduce inversión prematura y permite escalar sin reconstruir lo esencial.
