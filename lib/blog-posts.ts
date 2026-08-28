export type BlogBlock = {
  tag: "p" | "h3" | "blockquote";
  text: string;
};

export type BlogPost = {
  slug: string;
  legacyPath: string;
  title: string;
  publishedAt: string;
  category: string;
  image: string;
  blocks: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    "title": "Tendencias de content marketing impulsadas por inteligencia artificial",
    "category": "Pensamiento",
    "image": "/blog/nota-01.png",
    "blocks": [
      {
        "tag": "blockquote",
        "text": "Cómo las tendencias de content marketing impulsadas por inteligencia artificial están transformando la estrategia digital bajo un enfoque inteligente, humano y eficaz"
      },
      {
        "tag": "p",
        "text": "Hoy las tendencias de content marketing impulsadas por inteligencia artificial redefinen cómo las marcas diseñan, producen y distribuyen contenido. El contenido digital dejó de medirse por volumen y empezó a evaluarse por relevancia, claridad y propósito. Las tendencias que se vienen marcando para el 2026 —impulsadas por IA, formatos ágiles y nuevas expectativas de los usuarios— obligan a las marcas a revisar sus bases, no solo sus métricas."
      },
      {
        "tag": "p",
        "text": "Desde el diseño hasta la estrategia, todo indica que entramos en una etapa donde el contenido deja de ser “publicación” y pasa a ser sistema, donde cada pieza se articula con otra para construir sentido."
      },
      {
        "tag": "h3",
        "text": "Tendencias de content marketing impulsadas por inteligencia artificial: De “hacer más” a “hacer mejor”"
      },
      {
        "tag": "p",
        "text": "La primera gran transformación llega de la mano de la eficiencia. Las herramientas de inteligencia artificial permiten producir contenido de alta calidad con menos recursos, pero esto no implica producir sin criterio: implica diseñar con intención."
      },
      {
        "tag": "p",
        "text": "El nuevo tipo de contenido se estructura con claridad y pensamiento editorial:"
      },
      {
        "tag": "p",
        "text": "Lecturas más limpias y jerarquizadas."
      },
      {
        "tag": "p",
        "text": "Narrativas pensadas para búsquedas impulsadas por IA."
      },
      {
        "tag": "p",
        "text": "Actualización constante de piezas ya existentes para mantener vigencia."
      },
      {
        "tag": "p",
        "text": "La lógica ya no es publicar para llenar espacios, sino crear para construir valor."
      },
      {
        "tag": "h3",
        "text": "Formatos ágiles + consumo móvil: el dominio del “snackable”"
      },
      {
        "tag": "p",
        "text": "La atención no es más breve, sin embargo sí es más exigente. Los usuarios buscan contenido que diga algo con rapidez, que resuma sin simplificar y que emocione sin exagerar. Por eso crecen los formatos cortos: micro-videos, visuales dinámicos, textos precisos, cápsulas que sintetizan valor."
      },
      {
        "tag": "blockquote",
        "text": "En diseño modular —y en contenido— se volvió imprescindible. Una sola idea puede transformarse en múltiples piezas sin perder coherencia de marca ni claridad narrativa."
      },
      {
        "tag": "h3",
        "text": "Personalización y autenticidad: diseñar contenido para alguien, no para todos"
      },
      {
        "tag": "p",
        "text": "La hiper-personalización dejó de ser un plus tecnológico para pasar a ser un estándar cultural. Las personas esperan que las marcas los entiendan sin necesidad de explicarse demasiado."
      },
      {
        "tag": "p",
        "text": "Eso exige contenido adaptable, respetuoso y auténtico, descartando versiones prefabricadas, para dar lugar a mensajes que sepan dónde, cómo y con quién dialogan."
      },
      {
        "tag": "p",
        "text": "La autenticidad se convirtió, más que nunca, en un criterio estratégico: el contenido debe sonar humano, no optimizado."
      },
      {
        "tag": "h3",
        "text": "Del contenido único al contenido vivo"
      },
      {
        "tag": "p",
        "text": "El contenido dejó de ser un producto final para convertirse en un sistema en evolución constante. Ese informe, ese blog o ese video pueden regenerarse, reescribirse y reinterpretarse en nuevos formatos, ampliando su vida útil sin perder profundidad."
      },
      {
        "tag": "p",
        "text": "Es la lógica del content-loop: crear, transformar, reutilizar y volver a activar."
      },
      {
        "tag": "h3",
        "text": "Reflexión final: lo vital no es la herramienta, sino la intención"
      },
      {
        "tag": "p",
        "text": "2026 confirmará que el contenido que realmente importa no es el que se produce más rápido, sino el que se piensa mejor. El que combina IA, diseño y estrategia para decir algo claro, relevante y humano. El que entiende el contexto, respeta la atención del usuario y se integra en su mundo sin invadirlo."
      },
      {
        "tag": "blockquote",
        "text": "Hay que construir con intención. Porque en un entorno saturado, la diferencia ya no está en publicar, sino en conectar."
      },
      {
        "tag": "p",
        "text": "Si tu marca siente que necesita un sistema de contenido más claro, más consciente y más preparado para el futuro, podemos ayudarte a diseñarlo. Hablemos, analicemos tu escenario y construyamos juntos una estrategia que tenga sentido —hoy y mañana."
      },
      {
        "tag": "blockquote",
        "text": "DOOH — Creative Tech Studio Donde la creatividad transforma marcas."
      }
    ],
    "slug": "marketing-de-contenidos-estrategia-ia-y-nuevas-reglas-del-juego",
    "legacyPath": "/post/marketing-de-contenidos-estrategia-ia-y-nuevas-reglas-del-juego",
    "publishedAt": "2025-11-27"
  },
  {
    "title": "Estrategias de contenido digital impulsadas por inteligencia artificial, el nuevo enfoque del marketing",
    "category": "Marketing",
    "image": "/blog/nota-02.png",
    "blocks": [
      {
        "tag": "blockquote",
        "text": "Cómo las marcas están transformando su estrategia para conectar, no solo comunicar"
      },
      {
        "tag": "p",
        "text": "En el universo del marketing, el contenido dejó de ser una mercancía. Ya no se trata de hacer más sino de hacer mejor, para quien importa, en el momento justo. Las últimas tendencias muestran que los cambios no son sólo tecnológicos, sino también culturales, éticos y estructurales. Las estrategias de contenido digital impulsadas por inteligencia artificial están redefiniendo la forma en que las marcas conectan con sus audiencias."
      },
      {
        "tag": "h3",
        "text": "Estrategias de contenido digital impulsadas por inteligencia artificial, el nuevo enfoque del marketing"
      },
      {
        "tag": "p",
        "text": "Los motores de búsqueda tradicionales enfrentan una nueva realidad: la inteligencia artificial que responde directamente a usuarios, resume contenido y decide qué merece atención. Así, aparece un nuevo reto: crear contenido que no sólo sea encontrado, sino citado, referenciado y valorado por sistemas inteligentes."
      },
      {
        "tag": "p",
        "text": "Esto impulsa decisiones de diseño editorial como:"
      },
      {
        "tag": "p",
        "text": "Lenguaje conversacional que replica cómo la gente pregunta."
      },
      {
        "tag": "p",
        "text": "Estructuras de contenido que facilitan la lectura automática (títulos, párrafos cortos, encabezados claros)."
      },
      {
        "tag": "p",
        "text": "Renovación constante del contenido existente, porque ya no vale “publicar y olvidar”."
      },
      {
        "tag": "p",
        "text": "En DOOH, diseñamos arquitecturas de contenido que anticipan estos criterios: no solo la mirada humana, sino también la “mirada IA” que evalúa relevancia, claridad y experiencia de usuario."
      },
      {
        "tag": "h3",
        "text": "Video, visuales y personalización: la nueva triada que decide"
      },
      {
        "tag": "p",
        "text": "El contenido textual sigue siendo vital, pero ahora convive con formatos que capturan atención y comunican en menos segundos. El video no es un añadido: es un canal estratégico. Los gráficos visuales, los datos animados, las micro-experiencias se vuelven la norma."
      },
      {
        "tag": "p",
        "text": "Por otro lado, la personalización deja de ser “una opción” para convertirse en expectativa del usuario: mensajes relevantes, adaptados a contexto, a dispositivo, a preferencia."
      },
      {
        "tag": "p",
        "text": "En la práctica, esto significa que las marcas necesitan pensar en los siguientes niveles de diseño de contenido:"
      },
      {
        "tag": "p",
        "text": "¿Cómo se ve y funciona en móviles o dispositivos emergentes?"
      },
      {
        "tag": "p",
        "text": "¿Cómo se ajusta la interfaz, el ritmo, los visuales al perfil del usuario?"
      },
      {
        "tag": "p",
        "text": "¿Cómo el diseño soporta la personalización sin perder coherencia de marca?"
      },
      {
        "tag": "h3",
        "text": "Calidad frente a volumen: la decisión estratégica"
      },
      {
        "tag": "p",
        "text": "En muchos sectores se está abandonando la idea de “más es mejor”. El enfoque se dirige a “más relevante, más útil, más conectado”. Los informes lo marcan: la producción de contenido debe orientarse a etapas medias y bajas del funnel, con intención clara de conversión, no solo de visibilidad."
      },
      {
        "tag": "p",
        "text": "Desde la óptica de DOOH, esto implica repensar los procesos de creación:"
      },
      {
        "tag": "p",
        "text": "Reducción de piezas sin propósito."
      },
      {
        "tag": "p",
        "text": "Monitoreo continuo del contenido existente (“¿sirve aún?”)."
      },
      {
        "tag": "p",
        "text": "Diseño de sistemas visuales que permitan reutilización, adaptabilidad y coherencia."
      },
      {
        "tag": "h3",
        "text": "Un cierre con mirada humana"
      },
      {
        "tag": "p",
        "text": "En este último tiempo, el contenido que importa no es el que destaca por su brillo técnico, sino el que se inserta en contextos, se adapta a las necesidades humanas y permanece relevante. La tecnología —IA, plataformas, formatos emergentes— está habilitando nuevas posibilidades, pero la diferencia la sigue marcando la sensibilidad, la conexión, la intención."
      },
      {
        "tag": "p",
        "text": "El contenido es ahora tanto una herramienta de estrategia como un acto de diseño. Y cuando diseño y estrategia se alinean, el resultado no sólo se ve bien: se siente, se usa y funciona."
      },
      {
        "tag": "blockquote",
        "text": "DOOH — Creative Tech Studio Donde la creatividad transforma marcas."
      }
    ],
    "slug": "de-la-producción-masiva-de-contenidos-al-diseño-con-intención",
    "legacyPath": "/post/de-la-producción-masiva-de-contenidos-al-diseño-con-intención",
    "publishedAt": "2025-11-13"
  },
  {
    "title": "RIBA reimaginada: rediseñar el legado",
    "category": "Diseño",
    "image": "/blog/nota-03.png",
    "blocks": [
      {
        "tag": "blockquote",
        "text": "El rediseño de la Royal Institute of British Architects es más que una actualización visual: es un ejercicio de coherencia entre historia, identidad y futuro. Acompañanos a analizar cómo una marca con legado puede renovarse sin perder su esencia."
      },
      {
        "tag": "p",
        "text": "Hay marcas que no necesitan reinventarse, sino reencontrarse con su propia historia. Ese es el caso de la Royal Institute of British Architects (RIBA), que este año presentó una nueva identidad visual creada por Johnson Banks: un proyecto que combina respeto por el pasado, claridad visual y una visión contemporánea del diseño institucional."
      },
      {
        "tag": "p",
        "text": "Desde nuestra visión lo leemos como un gesto ejemplar: una marca con más de 180 años de historia que entiende que evolucionar no es olvidar, sino actualizar su lenguaje para seguir siendo relevante."
      },
      {
        "tag": "p",
        "text": "Fuente: https://www.wallpaper.com/design-interiors/corporate-design-branding/riba-brand-identity-johnston-banks?utm_source=chatgpt.com"
      },
      {
        "tag": "p",
        "text": "Lo que cambia — y lo que permanece"
      },
      {
        "tag": "p",
        "text": "El rediseño de RIBA no busca romper, sino depurar. La nueva identidad abandona la ornamentación excesiva y apuesta por una tipografía sans-serif de trazo firme, priorizando la legibilidad y el reconocimiento directo del nombre. El histórico rojo se mantiene, pero con una energía más luminosa y contemporánea, mientras que el tradicional escudo —símbolo de herencia y prestigio— se reinterpreta como un sello discreto, casi un susurro visual."
      },
      {
        "tag": "p",
        "text": "El resultado es una identidad que equilibra pasado y presente, tradición y vigencia."
      },
      {
        "tag": "blockquote",
        "text": "“El desafío no era rediseñar un logo, sino renovar una voz institucional sin borrar su acento.”"
      },
      {
        "tag": "p",
        "text": "Un rediseño que deja lecciones"
      },
      {
        "tag": "p",
        "text": "La nueva identidad de RIBA invita a reflexionar sobre cómo las marcas actuales pueden transformarse sin perder su esencia. En un contexto donde lo nuevo suele imponerse sobre lo verdadero, este proyecto demuestra que el cambio más poderoso es el que se construye desde adentro."
      },
      {
        "tag": "blockquote",
        "text": "La elección de una tipografía clara y arquitectónica habla de transparencia; la preservación del escudo, de memoria; y la intensidad del color, de energía y compromiso."
      },
      {
        "tag": "p",
        "text": "Cada decisión está conectada con el ADN de la institución, no con una tendencia pasajera. En otras palabras: no se trata de diseñar algo distinto, sino de diseñar algo que siga siendo RIBA."
      },
      {
        "tag": "p",
        "text": "Qué nos deja a los estudios de diseño"
      },
      {
        "tag": "p",
        "text": "Desde DOOH, encontramos en este proyecto una inspiración tangible para quienes trabajamos en branding estratégico. Nos recuerda que el diseño institucional necesita una visión de continuidad, no de ruptura. Que los logotipos pueden evolucionar sin necesidad de renunciar a su historia. Y que la verdadera modernidad no está en la forma, sino en el propósito."
      },
      {
        "tag": "blockquote",
        "text": "“El diseño más contemporáneo no es el que se aleja de su origen, sino el que lo vuelve relevante otra vez.”"
      },
      {
        "tag": "p",
        "text": "¿Cómo aplicamos estas inspiraciones en DOOH?"
      },
      {
        "tag": "p",
        "text": "Alimentamos nuestra creatividad con inspiraciones, tomamos cada aprendizaje y los aplicamos a nuestros procesos: diseñar con sensibilidad, mantener viva la identidad, evolucionar con sentido. La tecnología nos permite explorar nuevas expresiones visuales, pero el alma de cada marca sigue siendo humana. Como Creative Tech Studio, entendemos que el futuro del diseño no se mide por la novedad, sino por la capacidad de permanecer actual sin dejar de ser auténtico."
      },
      {
        "tag": "blockquote",
        "text": "DOOH — Creative Tech Studio Donde la creatividad transforma marcas."
      },
      {
        "tag": "p",
        "text": "Contactanos"
      },
      {
        "tag": "p",
        "text": "Fuente del artículo: https://www.wallpaper.com/design-interiors/corporate-design-branding/riba-brand-identity-johnston-banks?utm_source=chatgpt.com"
      }
    ],
    "slug": "riba-reimaginada-rediseñar-el-legado",
    "legacyPath": "/post/riba-reimaginada-rediseñar-el-legado",
    "publishedAt": "2025-11-06"
  },
  {
    "title": "Canva lanza su Creative OS: diseño, IA y colaboración en una sola plataforma. ",
    "category": "Tecnología",
    "image": "/blog/nota-04.png",
    "blocks": [
      {
        "tag": "blockquote",
        "text": "Una mirada estratégica sobre cómo evoluciona el sistema del diseño digital con el nuevo Creative OS de Canva."
      },
      {
        "tag": "p",
        "text": "El diseño ya no es solo el acabado visual de una marca, sino el sistema que organiza ideas, herramientas, flujos de trabajo y comunicación en un solo espacio coherente. El reciente lanzamiento del Creative Operating System de Canva, que integra video, código, IA y colaboración visual en un entorno único, no es solo una evolución de plataforma: es una señal de cambio para el diseño profesional."
      },
      {
        "tag": "p",
        "text": "Este lanzamiento ocurre pocos meses después de la adquisición de Affinity, un movimiento que consolidó a Canva dentro del terreno profesional del diseño. Con el nuevo Creative Operating System, la compañía da un paso más allá: no busca competir solo en herramientas, sino en sistemas de flujo creativo, donde diseño, colaboración y tecnología coexisten."
      },
      {
        "tag": "blockquote",
        "text": "Diseño como sistema, no solo como producto."
      },
      {
        "tag": "h3",
        "text": "Canva lanza su Creative OS: diseño, IA y colaboración en una sola plataforma."
      },
      {
        "tag": "p",
        "text": "Tradicionalmente, el diseñador planteaba un arte final, una entrega puntual. Hoy el desafío es diferente: se trata de crear ecosistemas visuales que pueden cambiar, crecer y adaptarse. Con su nueva Visual Suite, IA generativa que entiende diseño y herramientas de código, Canva apunta a que diseñadores, marcas y equipos internos trabajen en un espacio integrado, no fragmentado."
      },
      {
        "tag": "p",
        "text": "Eso nos lleva a preguntarnos: ¿estamos diseñando solo piezas, o arquitecturas visuales? En DOOH respondemos con una convicción clara: el buen diseño debe preverse como sistema, considerando herramientas, colaboradores, actualizaciones y escala."
      },
      {
        "tag": "h3",
        "text": "IA al frente del diseño sin que desaparezca la mirada humana"
      },
      {
        "tag": "p",
        "text": "Una de las novedades más relevantes es el modelo de IA entrenado para “entender diseño” dentro de la plataforma: genera layouts, gráficos o campañas con solo un prompt."
      },
      {
        "tag": "p",
        "text": "Pero la clave no radica en la IA en sí, sino en cómo la incorporamos al flujo creativo:"
      },
      {
        "tag": "p",
        "text": "Que la IA proponga, pero el humano decida."
      },
      {
        "tag": "p",
        "text": "Que la IA agilice tareas repetitivas, pero que la sensibilidad siga en el diseñador."
      },
      {
        "tag": "p",
        "text": "Que el sistema atienda la colaboración (diseñador–marca–usuario) y no solo la creación individual."
      },
      {
        "tag": "p",
        "text": "Diseñar mañana implica preparar al equipo para trabajar con máquinas inteligentes, pero manteniendo la mirada crítica, emocional y estratégica."
      },
      {
        "tag": "h3",
        "text": "Colaboración, velocidad y consistencia visual"
      },
      {
        "tag": "p",
        "text": "El nuevo sistema de Canva también está pensado para equipos que trabajan en red, colaboran, editan en tiempo real y producen para múltiples canales. La promesa es clara: un solo espacio donde diseño, marketing y desarrollo convergen."
      },
      {
        "tag": "p",
        "text": "Ese paradigma obliga a ajustar la forma de diseñar:"
      },
      {
        "tag": "p",
        "text": "Visuales que funcionen en video, streaming, mobile y código."
      },
      {
        "tag": "p",
        "text": "Identidades que se modulan según canal pero mantienen coherencia."
      },
      {
        "tag": "p",
        "text": "Documentación accesible para que cualquier equipo “entienda” la identidad sin depender de un manual voluminoso."
      },
      {
        "tag": "p",
        "text": "En DOOH creemos que el valor real está en la consistencia visible, no solo en la creatividad aislada."
      },
      {
        "tag": "h3",
        "text": "Una mirada hacia lo que viene"
      },
      {
        "tag": "p",
        "text": "La herramienta es relevante, pero lo más interesante es lo que implica para la práctica del diseño:"
      },
      {
        "tag": "p",
        "text": "Menos silos (diseño vs marketing) y más plataformas integradas."
      },
      {
        "tag": "p",
        "text": "Menos entregables finales estáticos y más flujos de trabajo dinámicos."
      },
      {
        "tag": "p",
        "text": "Menos herramientas aisladas y más sistemas que respiran."
      },
      {
        "tag": "p",
        "text": "El anuncio de Canva no es solo para usuarios de esa plataforma: es para toda la industria del diseño. Y como estudio que apuesta al futuro, la lección es clara: debemos pensar no solo en la pieza final, sino en el entorno en el que la pieza vive."
      },
      {
        "tag": "p",
        "text": "En un mundo donde la tecnología acelera la producción, la ventaja seguirá perteneciendo a quienes mantengan la mirada humana, la estrategia clara y el sistema preparado. Cuando el diseño se convierte en plataforma, la marca no solo se ve mejor: se sostiene mejor."
      },
      {
        "tag": "blockquote",
        "text": "DOOH — Creative Tech Studio Donde la creatividad transforma marcas."
      },
      {
        "tag": "p",
        "text": "Contactanos"
      },
      {
        "tag": "p",
        "text": "Fuente del artículo: https://www.lifewire.com/canva-launches-creative-operating-system-11838470"
      }
    ],
    "slug": "canva-lanza-su-creative-os-diseño-ia-y-colaboración-en-una-sola-plataforma",
    "legacyPath": "/post/canva-lanza-su-creative-os-diseño-ia-y-colaboración-en-una-sola-plataforma",
    "publishedAt": "2025-11-04"
  },
  {
    "title": "Diseño UX/UI para aplicaciones educativas impulsadas por inteligencia artificial",
    "category": "Proyectos",
    "image": "/blog/nota-05.png",
    "blocks": [
      {
        "tag": "blockquote",
        "text": "Cuando el diseño entiende de aprendizaje, la tecnología se vuelve un puente y no una barrera."
      },
      {
        "tag": "p",
        "text": "En DOOH tuvimos el desafío —y el privilegio— de diseñar la identidad digital de RVD.AI, una herramienta educativa con integración de inteligencia artificial, diseñada para cumplir objetivos curriculares. Cada agente guía al estudiante, responde dudas y reporta al docente el progreso de los alumnos para que tomes decisiones basadas en datos reales."
      },
      {
        "tag": "p",
        "text": "Nuestro rol fue dar forma a su sitio web institucional, documentación corporativa y diseño UX/UI de la aplicación, asegurando una experiencia coherente, clara y profundamente humana en cada punto de contacto."
      },
      {
        "tag": "h3",
        "text": "RVD.AI: Diseñar una experiencia que enseñe. Trabajamos en el diseño UX/UI para aplicaciones educativas impulsadas por inteligencia artificial"
      },
      {
        "tag": "p",
        "text": "Desde el inicio, comprendimos que RVD.AI no era solo una aplicación. Era un ecosistema pedagógico impulsado por inteligencia artificial, creado para acompañar a docentes, directivos y estudiantes en la transformación digital del aprendizaje."
      },
      {
        "tag": "p",
        "text": "Nuestro trabajo comenzó con una pregunta esencial: ¿Cómo puede el diseño ayudar a que la tecnología educativa se sienta cercana, confiable y accesible?"
      },
      {
        "tag": "p",
        "text": "El diseño UX/UI para aplicaciones educativas impulsadas por inteligencia artificial era una apuesta inquietante. La respuesta llegó desde el diseño de experiencia. Analizamos flujos de uso, comportamiento y jerarquía de contenidos para construir una interfaz intuitiva, donde la IA no se percibiera como un elemento técnico, sino como una presencia empática, que guía, sugiere y acompaña."
      },
      {
        "tag": "p",
        "text": "El resultado fue una experiencia UX pensada para aprender sin fricción: navegación fluida, estructura modular y una arquitectura visual que prioriza lo importante —el contenido y las personas."
      },
      {
        "tag": "h3",
        "text": "Identidad visual: claridad, ritmo y propósito"
      },
      {
        "tag": "p",
        "text": "En un entorno donde la tecnología educativa tiende a lo complejo, buscamos lo contrario: claridad visual, equilibrio tipográfico y coherencia sistémica. Creamos una estética que refleja la filosofía de RVD.AI: innovación con propósito."
      },
      {
        "tag": "p",
        "text": "El diseño UI combina una paleta luminosa, trazos precisos y microinteracciones suaves, que comunican orden, dinamismo y cercanía. Cada color y cada ícono fueron pensados como parte de un lenguaje común entre docentes, alumnos y tecnología."
      },
      {
        "tag": "blockquote",
        "text": "Diseñar no fue solo construir pantallas; fue crear un espacio donde el aprendizaje digital se sienta humano."
      },
      {
        "tag": "h3",
        "text": "Un sitio web que comunica inteligencia"
      },
      {
        "tag": "p",
        "text": "El sitio institucional de RVD.AI debía reflejar no solo la funcionalidad de la aplicación, sino su visión educativa. Lo concebimos como una extensión de la experiencia del producto: un lugar para explorar, entender y confiar."
      },
      {
        "tag": "p",
        "text": "Diseñamos una narrativa visual que equilibra información técnica y claridad comunicacional, con foco en la usabilidad, la accesibilidad y la lectura ágil. Cada sección —desde las presentaciones de los agentes de IA hasta las páginas de “Cómo funciona” o “Solicitá demo”— fue construida para invitar a la acción con contenido útil y diseño limpio."
      },
      {
        "tag": "h3",
        "text": "Documentación corporativa: coherencia visual y profesionalismo"
      },
      {
        "tag": "p",
        "text": "Acompañando la evolución de RVD.AI, desarrollamos un sistema de documentación institucional y técnica que mantuviera la coherencia estética en todos los soportes: presentaciones, informes, manuales y material interno. Nuestra prioridad fue garantizar unidad y claridad visual en cada pieza, asegurando que la marca se perciba sólida, confiable y consistente tanto en ámbitos educativos como empresariales."
      },
      {
        "tag": "h3",
        "text": "Reflexión final: diseñar con propósito"
      },
      {
        "tag": "p",
        "text": "El trabajo con RVD.AI reafirmó una convicción que nos guía como estudio cuando el diseño se pone al servicio del conocimiento, la tecnología se vuelve verdaderamente transformadora."
      },
      {
        "tag": "p",
        "text": "Ver a RVD.AI, reconocida dentro del ámbito educativo no es solo un logro del proyecto, sino una validación de una manera de pensar el diseño: como puente entre innovación y humanidad, entre estrategia y emoción."
      },
      {
        "tag": "p",
        "text": "En DOOH creemos que las marcas tecnológicas no se construyen solo con interfaces, sino con sentido. Y ese sentido —cuando se diseña bien— educa, conecta e inspira."
      },
      {
        "tag": "blockquote",
        "text": "DOOH — Creative Tech Studio Donde la creatividad transforma marcas."
      }
    ],
    "slug": "rvd-ai-diseño-que-educa-tecnología-que-inspira",
    "legacyPath": "/post/rvd-ai-diseño-que-educa-tecnología-que-inspira",
    "publishedAt": "2025-10-23"
  },
  {
    "title": "Las marcas se reconfiguran frente a la autenticidad.",
    "category": "Marketing",
    "image": "/blog/nota-06.png",
    "blocks": [
      {
        "tag": "blockquote",
        "text": "Las marcas se reconfiguran frente a la autenticidad, la inteligencia artificial y el poder del contenido visual"
      },
      {
        "tag": "p",
        "text": "El marketing cambió de ritmo. Ya no se trata de gritar más fuerte, sino de comunicar con propósito. Las marcas que dominan la conversación en 2025 lo hacen desde un lugar más humano, más inteligente y más consciente de su contexto digital."
      },
      {
        "tag": "p",
        "text": "Los estudios más recientes —como la Guía de Marketing Octubre 2025 de Faster Solutions y el Informe de Marketing de Contenidos B2B 2025 de Nine Dot— confirman lo que ya se percibe en el día a día: la autenticidad, la búsqueda por IA, los formatos cortos, el video y la personalización están transformando la manera en que las marcas se relacionan con las personas."
      },
      {
        "tag": "h3",
        "text": "Las marcas se reconfiguran frente a la autenticidad: la nueva moneda de valor"
      },
      {
        "tag": "p",
        "text": "La palabra autenticidad dejó de ser un ideal para convertirse en una estrategia. Las audiencias actuales —especialmente las más jóvenes— detectan la sobreproducción, el tono impostado y los discursos genéricos en segundos. La diferencia ya no está en qué se dice, sino en cómo se dice y desde dónde se comunica."
      },
      {
        "tag": "p",
        "text": "El diseño, cuando se trabaja con intención, no disfraza a una marca: la revela. El desafío no pasa por parecer auténtico, sino por serlo con coherencia en cada punto de contacto. Cada elección visual, verbal o tecnológica debería responder a una verdad de marca tangible."
      },
      {
        "tag": "h3",
        "text": "Inteligencia artificial y el nuevo SEO"
      },
      {
        "tag": "p",
        "text": "La llegada de los motores de búsqueda impulsados por IA reescribe las reglas del posicionamiento digital. Ya no bastan las palabras clave: ahora los sistemas entienden contexto, intención y conversación. Esto obliga a pensar los sitios web y las plataformas de contenido con una nueva lógica: información estructurada, jerarquías claras y lenguaje natural."
      },
      {
        "tag": "p",
        "text": "El objetivo no es solo aparecer en los resultados, sino ser elegidos por relevancia semántica y claridad emocional. La IA obliga a diseñar con más empatía y precisión, no con menos."
      },
      {
        "tag": "h3",
        "text": "El imperio del formato corto"
      },
      {
        "tag": "p",
        "text": "El usuario no tiene menos atención; tiene más opciones. Por eso, los formatos breves no buscan simplificar, sino destilar valor. Reels, clips, cápsulas y microvideos son parte de un lenguaje instantáneo que exige claridad y ritmo."
      },
      {
        "tag": "p",
        "text": "El verdadero reto es condensar significado sin perder profundidad. Diseñar experiencias que digan más en menos tiempo, que vibren en segundos pero permanezcan en la memoria."
      },
      {
        "tag": "h3",
        "text": "Video y contenido visual: la narrativa dominante"
      },
      {
        "tag": "p",
        "text": "El video continúa siendo el medio con mayor poder de conexión. Permite transmitir ideas complejas de manera inmediata, emocional y accesible. Según el informe de Nine Dot, el contenido visual sigue siendo el eje que más impulsa el crecimiento en entornos B2B, donde la saturación informativa es extrema."
      },
      {
        "tag": "p",
        "text": "El público no solo quiere leer sobre una marca; quiere verla en acción. Y el diseño visual, cuando está bien orquestado, no ilustra: interpreta y da contexto."
      },
      {
        "tag": "h3",
        "text": "Personalización: diseñar para alguien, no para todos"
      },
      {
        "tag": "p",
        "text": "La personalización dejó de ser un lujo tecnológico para convertirse en una expectativa cultural. Las personas esperan que las marcas comprendan quiénes son, qué buscan y cómo prefieren interactuar."
      },
      {
        "tag": "p",
        "text": "Diseñar con esa sensibilidad es una forma de respeto. Interfaces modulares, recorridos adaptativos y mensajes ajustables son parte de un nuevo código de comunicación donde cada interacción cuenta. El diseño deja de ser estático para transformarse en una conversación continua entre marca y usuario."
      },
      {
        "tag": "h3",
        "text": "Una mirada hacia adelante"
      },
      {
        "tag": "p",
        "text": "El marketing del futuro inmediato no pertenece a quienes tienen más presupuesto, sino a quienes comprenden mejor a las personas. La tecnología ofrece herramientas extraordinarias, pero sigue siendo la intención humana la que marca la diferencia."
      },
      {
        "tag": "blockquote",
        "text": "Autenticidad, IA, video, personalización y formato corto no son tendencias aisladas: son señales de un mismo cambio. Un cambio que pide marcas más conscientes, más ágiles y más reales."
      },
      {
        "tag": "p",
        "text": "En un entorno de automatización y algoritmos, la ventaja competitiva está en la sensibilidad. Porque lo que conecta —ayer, hoy y mañana— no es el ruido, sino la verdad bien diseñada."
      },
      {
        "tag": "p",
        "text": "Fuente: 1. https://fastersolutions.com/october-2025-marketing-guide-key-dates-trends-strategies/?utm_source=chatgpt.com 2. https://www.ninedot.com/insights/b2b-content-marketing-trends-2025?utm_source=chatgpt.com"
      },
      {
        "tag": "blockquote",
        "text": "DOOH — Creative Tech Studio Donde la creatividad transforma marcas."
      }
    ],
    "slug": "marketing-orientado-hacia-una-nueva-era-de-conexión-consciente",
    "legacyPath": "/post/marketing-orientado-hacia-una-nueva-era-de-conexión-consciente",
    "publishedAt": "2025-10-20"
  },
  {
    "title": "Domino’s, un rebranding que conecta con lo sensorial",
    "category": "Diseño",
    "image": "/blog/nota-07.png",
    "blocks": [
      {
        "tag": "blockquote",
        "text": "Domino’s Pizza redefine su identidad apostando por una experiencia multisensorial: un rebranding que se escucha, se ve y se siente. La marca deja de vender pizza para transmitir energía, ritmo y conexión emocional."
      },
      {
        "tag": "p",
        "text": "Más que una pizza, una actitud"
      },
      {
        "tag": "p",
        "text": "Domino’s acaba de presentar esta semana un nuevo capítulo en su historia visual. El rebranding, acompañado por un jingle creado por el artista country Shaboozey, marca un cambio de tono y de enfoque:"
      },
      {
        "tag": "p",
        "text": "Menos corporativo, más cultural. Menos “delivery”, más ritmo de vida."
      },
      {
        "tag": "p",
        "text": "El nuevo sistema de identidad simplifica el clásico dominó azul y rojo, pero con ajustes que lo vuelven más contemporáneo:"
      },
      {
        "tag": "p",
        "text": "Paleta: tonos más vibrantes y contrastados, con un azul más profundo y un rojo más cálido."
      },
      {
        "tag": "p",
        "text": "Tipografía: sans serif geométrica más bold y condensada, que transmite energía y cercanía."
      },
      {
        "tag": "p",
        "text": "Formato: composiciones dinámicas donde el ícono y las letras ganan protagonismo en entornos digitales y animados."
      },
      {
        "tag": "p",
        "text": "¿Cuál fue el resultado? Una marca más limpia, más flexible y más viva."
      },
      {
        "tag": "p",
        "text": "Del claim al ritmo: cuando la música se vuelve identidad"
      },
      {
        "tag": "p",
        "text": "Uno de los giros más interesantes del rebranding es el uso del jingle como lenguaje visual y auditivo. Domino’s abandona el claim tradicional y traslada su voz a una identidad sonora: un ritmo pegadizo que refuerza la recordación emocional."
      },
      {
        "tag": "p",
        "text": "Fuente: https://www.independent.co.uk/news/world/americas/domino-pizza-shaboozey-new-logo-b2844476.html"
      },
      {
        "tag": "p",
        "text": "El sonido también se ve. La marca incorpora la secuencia “mmmmmm” en sus piezas gráficas, replicando visualmente la sensación de placer asociada al sabor y reforzando el ritmo del jingle."
      },
      {
        "tag": "p",
        "text": "Este recurso cumple una doble función técnica:"
      },
      {
        "tag": "p",
        "text": "Sensorial: conecta lo visual con lo auditivo, creando coherencia multisensorial."
      },
      {
        "tag": "p",
        "text": "Emocional: apela a la memoria gustativa y afectiva; no describe el producto, lo hace sentir."
      },
      {
        "tag": "p",
        "text": "Así, la música reemplaza el claim verbal, pero también lo traduce en imagen. Cada “mmm” se convierte en una extensión del sonido y del apetito emocional que la marca busca despertar."
      },
      {
        "tag": "p",
        "text": "Una lectura personal"
      },
      {
        "tag": "p",
        "text": "Desde nuestra mirada, Domino's logra no sólo un rebranding que conecta con lo sensorial. Busca modernizar y ampliar el lenguaje emocional de la marca. El nuevo tono es más orgánico, rítmico y social: deja de hablar de producto para hablar de experiencia compartida."
      },
      {
        "tag": "p",
        "text": "En lugar de prometer rapidez, Domino’s comunica energía. El ritmo y el humor reemplazan al mensaje racional. Y eso redefine cómo las marcas masivas pueden conectar con audiencias que priorizan la autenticidad y la inmediatez."
      },
      {
        "tag": "p",
        "text": "Desde nuestra mirada, el rediseño lo acompaña:"
      },
      {
        "tag": "p",
        "text": "El logotipo y la tipografía transmiten movimiento y cercanía."
      },
      {
        "tag": "p",
        "text": "El color mantiene la identidad histórica, pero actualiza su brillo y contraste para entornos digitales."
      },
      {
        "tag": "p",
        "text": "Las composiciones gráficas adoptan layouts modulares y animaciones simples, pensadas para scroll, reels y pantallas."
      },
      {
        "tag": "p",
        "text": "Fuente: https://www.reasonwhy.es/actualidad/dominos-pizza-rebranding-evocar-apetecible"
      },
      {
        "tag": "p",
        "text": "De fast food a fast feeling"
      },
      {
        "tag": "p",
        "text": "Domino’s Pizza entendió que en un entorno donde la velocidad es lo común, la emoción es la diferencia. No se trata solo de entregar rápido, sino de provocar una sensación inmediata."
      },
      {
        "tag": "p",
        "text": "Su rebranding traslada el concepto de “delivery” al terreno del branding sensorial: entregar una experiencia coherente, reconocible y viva, donde lo que se escucha y lo que se ve generan la misma sensación."
      },
      {
        "tag": "p",
        "text": "Desde DOOH lo interpretamos como un ejemplo de cómo las marcas evolucionan hacia sistemas de percepción integrales, donde el color, el sonido, el movimiento y la emoción funcionan como un solo lenguaje."
      },
      {
        "tag": "blockquote",
        "text": "DOOH — Creative Tech Studio Donde la creatividad transforma marcas."
      },
      {
        "tag": "p",
        "text": "Fuente del artículo People.com – Domino’s debuts its all-new rebrand with a catchy jingle from country star Shaboozey"
      }
    ],
    "slug": "domino-s-un-rebranding-que-busca-más-que-apetito",
    "legacyPath": "/post/domino-s-un-rebranding-que-busca-más-que-apetito",
    "publishedAt": "2025-10-15"
  },
  {
    "title": "¿Cómo se está construyendo hoy en día un diseño de marca?",
    "category": "Diseño",
    "image": "/blog/nota-08.png",
    "blocks": [
      {
        "tag": "p",
        "text": "El diseño de marca está viviendo un momento de gran madurez.Atrás quedaron los años de los rebrandings apresurados o las modas pasajeras: hoy las marcas buscan coherencia, propósito y conexión emocional real con su público objetivo."
      },
      {
        "tag": "p",
        "text": "Este es un requerimiento que se viene presentando hace ya un tiempo y que lo estamos viendo día a día desde nuestra agencia. Las empresas no buscan solo un logo, quieren una identidad completa, viva, capaz de adaptarse, moverse y sentirse parte de un ecosistema en cambio constante. A continuación les listamos cuáles son las características más importantes que se deben tener en cuenta a la hora de sentarse a realizar un diseño de branding corporativo."
      },
      {
        "tag": "p",
        "text": "Simplicidad con intención"
      },
      {
        "tag": "p",
        "text": "Los nuevos diseños de marca están volviendo a lo esencial. Estilo de diseño que no debe confundirse con lo simple o lo que está de moda. En el diseño de marca, la simplicidad se entiende como una decisión estratégica: reducir para comunicar mejor. El valor no está en el exceso, sino en la claridad."
      },
      {
        "tag": "blockquote",
        "text": "El diseño no es austeridad, es precisión. Cada forma debe tener sentido. Cada silencio, también."
      },
      {
        "tag": "p",
        "text": "Identidades que se mueven"
      },
      {
        "tag": "p",
        "text": "Ya las marcas no se diseñan como logotipos fijos o estáticos, sino como ecosistemas dinámicos. No es diseñar sólo la marca, si no abarcar todo su universo visual. Hoy las identidades viven en constante movimiento, desarrollando su comunicación dentro de diferentes entornos interactivos que conforman distintas experiencias digitales donde el cambio es parte del lenguaje."
      },
      {
        "tag": "blockquote",
        "text": "Diseñamos sistemas que se adaptan, que responden al contexto y mantienen coherencia sin perder vitalidad. Una marca sólida no es la que nunca cambia, sino la que sabe cómo hacerlo."
      },
      {
        "tag": "p",
        "text": "Tipografía como voz"
      },
      {
        "tag": "p",
        "text": "La tipografía dejó de ser un soporte visual para pasar a ser una extensión de la personalidad de la marca. La tipografía cobra un protagonismo central donde cada letra habla, cada trazo tiene tono. Ayudado por el avance de la tecnología, y sobre todo en estos tiempos de IA y automatización, la tipografía personalizada devuelve a cada marca rasgos de humanidad que ayudan a fortalecer el discurso visual."
      },
      {
        "tag": "blockquote",
        "text": "Tratar la tipografía como una voz que aporte un carácter propio a la marca es una tarea central. Esto permite que pueda ser firme o cálida, racional o emocional, pero siempre auténtica."
      },
      {
        "tag": "p",
        "text": "Tecnología como aleada central"
      },
      {
        "tag": "p",
        "text": "La tecnología dejó de ser solo una herramienta para convertirse en un aliado clave en la comunicación de marca."
      },
      {
        "tag": "p",
        "text": "Los entornos digitales viven un momento de esplendor gracias a la incorporación de herramientas de inteligencia artificial que ampliaron las posibilidades creativas, permitiendo generar contenidos de alto impacto con menos tiempo, recursos y complejidad técnica."
      },
      {
        "tag": "p",
        "text": "La clave está en usarlas con sensibilidad: paletas suaves, gradientes que respiran, interfaces con movimiento orgánico y luz emocional. El diseño digital se está volviendo más humano, más sensorial, más consciente."
      },
      {
        "tag": "p",
        "text": "Marcas que se sienten (no solo se ven)"
      },
      {
        "tag": "p",
        "text": "En un entorno donde todo comunica —sonidos, animaciones, gestos, interacciones— las marcas se diseñan pensando en la experiencia total del usuario. No basta con verse bien: deben sentirse bien."
      },
      {
        "tag": "p",
        "text": "Estamos en un momento en que las marcas entienden que su poder no está en ser reconocidas, sino en ser recordadas por cómo te hacen sentir. El diseño vuelve a su centro: pensar, conectar, evolucionar."
      },
      {
        "tag": "blockquote",
        "text": "Trabajamos para que cada marca que creamos sea más que estética: queremos que sea una experiencia viva, coherente entre tecnología y emoción. En esencia, es lo que define nuestro trabajo. DOOH Agency - Creative Tech Studio"
      }
    ],
    "slug": "cómo-se-está-construyendo-hoy-en-día-las-marcas",
    "legacyPath": "/post/cómo-se-está-construyendo-hoy-en-día-las-marcas",
    "publishedAt": "2025-10-14"
  },
  {
    "title": "Diseño que siente, tecnología que conecta",
    "category": "Diseño",
    "image": "/blog/nota-09.png",
    "blocks": [
      {
        "tag": "p",
        "text": "Trabajamos para que cada marca que creamos sea una experiencia viva, una expresión coherente entre tecnología y emoción."
      },
      {
        "tag": "p",
        "text": "Cada proyecto es una oportunidad para traducir una visión en algo tangible, con identidad y propósito. Nuestro enfoque une estrategia, diseño y tecnología para construir marcas que trascienden lo visual, evolucionan y generan conexión real con las personas."
      },
      {
        "tag": "p",
        "text": "El diseño para nosotros no es meramente un acto decorativo: es una herramienta de pensamiento. Por eso, en DOOH lo abordamos como un sistema que combina análisis, creatividad y sensibilidad."
      },
      {
        "tag": "blockquote",
        "text": "Detrás de cada decisión visual hay un propósito; detrás de cada línea, una intención."
      },
      {
        "tag": "h3",
        "text": "✦ La evolución hacia el diseño consciente"
      },
      {
        "tag": "p",
        "text": "El diseño interpreta realidades. Cada identidad, interfaz o experiencia que creamos parte de una comprensión profunda del contexto: el entorno digital, los comportamientos humanos y las nuevas formas de interacción."
      },
      {
        "tag": "p",
        "text": "La tecnología —incluida la inteligencia artificial— se integra como un recurso que amplifica el pensamiento creativo, para darnos la posibilidad de explorar diferentes escenarios, anticipar tendencias y materializar ideas con mayor precisión, pero siempre al servicio de una visión humana."
      },
      {
        "tag": "p",
        "text": "Porque incluso en la era de la automatización, la diferencia sigue estando en la mirada."
      },
      {
        "tag": "h3",
        "text": "✦ Human + Tech Design"
      },
      {
        "tag": "p",
        "text": "Creamos identidades que funcionan como sistemas vivos, capaces de adaptarse a cada entorno, sin perder su esencia. La estrategia define la estructura; el diseño, la emoción; y la tecnología, la evolución."
      },
      {
        "tag": "p",
        "text": "Cada elemento, desde una tipografía hasta una interfaz, busca equilibrar lo racional y lo sensorial. Esa es la base del diseño consciente: crear experiencias que se comprendan tanto con la mente como con la intuición."
      },
      {
        "tag": "blockquote",
        "text": "Nos apoyamos en una premisa simple: diseñar marcas que piensen y sientan."
      },
      {
        "tag": "h3",
        "text": "✦ Una nueva cultura de diseño"
      },
      {
        "tag": "p",
        "text": "En DOOH entendemos el diseño como cultura. Un lenguaje que conecta personas, ideas y tecnología para dar forma a marcas relevantes, sostenibles y emocionalmente inteligentes. Porque cuando la estética se une a la estrategia, y la innovación se combina con la sensibilidad, el resultado no es solo una marca más, sino una historia que vive, evoluciona y conecta."
      },
      {
        "tag": "p",
        "text": "Contactanos"
      },
      {
        "tag": "p",
        "text": "hello@dooh.com.ar"
      }
    ],
    "slug": "diseño-que-siente-tecnología-que-conecta",
    "legacyPath": "/post/diseño-que-siente-tecnología-que-conecta",
    "publishedAt": "2025-10-08"
  },
  {
    "title": "Somos un espacio donde la creatividad transforma marcas",
    "category": "Pensamiento",
    "image": "/blog/nota-10.png",
    "blocks": [
      {
        "tag": "p",
        "text": "En DOOH Agency creemos que el diseño y la comunicación no son solo estética: son el puente que conecta a las marcas con las personas. Este blog nace como un espacio para compartir ideas, tendencias y experiencias que inspiran el futuro del branding, el marketing digital y la creatividad aplicada a los negocios."
      },
      {
        "tag": "p",
        "text": "Queremos abrir la conversación sobre cómo las marcas pueden trascender en un mundo cada vez más digital, competitivo y cambiante. Desde tips de diseño estratégico hasta análisis de proyectos reales, este será un lugar para explorar, aprender y dejarse inspirar."
      },
      {
        "tag": "p",
        "text": "¿Qué encontrarás aquí?"
      },
      {
        "tag": "p",
        "text": "Tendencias globales de diseño y branding: lo que las grandes marcas están haciendo y cómo adaptarlo a proyectos locales."
      },
      {
        "tag": "p",
        "text": "Casos de estudio: insights de proyectos desarrollados por nuestro equipo y aprendizajes clave."
      },
      {
        "tag": "p",
        "text": "Estrategias de marketing digital: desde funnels de conversión hasta la integración de inteligencia artificial en campañas."
      },
      {
        "tag": "p",
        "text": "Creatividad aplicada: ideas, recursos y reflexiones para quienes buscan innovar en comunicación visual."
      },
      {
        "tag": "p",
        "text": "Primer insight para arrancar:"
      },
      {
        "tag": "p",
        "text": "Hoy más que nunca, las marcas que generan impacto no son las que hablan más fuerte, sino las que logran ser auténticas, consistentes y memorables. Y en DOOH trabajamos para que cada identidad, cada campaña y cada producto hable en ese idioma."
      },
      {
        "tag": "p",
        "text": "👉 Esta es solo la primera página de un viaje creativo que recién comienza. Si sos emprendedor, creativo, marketer o simplemente alguien que disfruta del buen diseño, este blog es para vos."
      },
      {
        "tag": "p",
        "text": "Bienvenid@ a la comunidad DOOH. We are DOOH. We are hearing. 🎧"
      }
    ],
    "slug": "somos-un-espacio-donde-la-creatividad-transforma-marcas",
    "legacyPath": "/post/somos-un-espacio-donde-la-creatividad-transforma-marcas",
    "publishedAt": "2025-10-03"
  }
] as BlogPost[];

export const getBlogPost = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);
