'use client'

import { useEffect, useState } from 'react'

type Project = {
  name: string
  category: string
  description: string
  background: string
  color: string
  size: string
  images: Array<{ src: string; alt: string }>
}

const galleryImages = (folder: string, projectName: string, imageCount: number) =>
  Array.from({ length: imageCount }, (_, index) => ({
    src: `/proyectos/${folder}/${String(index + 1).padStart(2, '0')}.jpg`,
    alt: `${projectName} — imagen ${index + 1}`,
  }))

const projects: Project[] = [
  {
    name: 'MUUD',
    category: 'Branding · Packaging',
    description: 'Identidad, packaging y sistema gráfico para una cafetería de especialidad.',
    background: '#2b1f14', color: '#f7f7f7', size: 'aspect-[4/3]',
    images: [{ src: '/proyectos/muud.jpg', alt: 'Proyecto MUUD: identidad y packaging' }],
  },
  {
    name: 'Meralba',
    category: 'Identidad · Web aspiracional',
    description: 'Identidad visual y experiencia web para una inmobiliaria boutique.',
    background: '#0d2416', color: '#f7f7f7', size: 'aspect-[3/4]',
    images: [{ src: '/proyectos/meralba.png', alt: 'Proyecto Meralba: identidad y experiencia web' }],
  },
  {
    name: 'RVD.AI',
    category: 'Web · Contenido con IA',
    description: 'Rediseño de presencia digital y sistema de comunicación para educación en IA.',
    background: '#0a0a1a', color: '#ddf81d', size: 'aspect-[4/5]',
    images: [
      { src: '/proyectos/rvd.jpg', alt: 'Proyecto RVD.AI: web y contenido con IA' },
      ...galleryImages('rvd.ai-rivadavia', 'RVD.AI', 3),
    ],
  },
  {
    name: 'Edumaia',
    category: 'Web educativa · Lead generation',
    description: 'Experiencia web orientada a comunicar valor y generar consultas calificadas.',
    background: '#1a0f00', color: '#f7f7f7', size: 'aspect-[4/3]',
    images: [
      { src: '/proyectos/edumaia.jpg', alt: 'Proyecto Edumaia: experiencia web educativa' },
      ...galleryImages('edumaia', 'Edumaia', 5),
    ],
  },
  {
    name: 'KANSO',
    category: 'Identidad gastronómica · Vajilla',
    description: 'Sistema de marca y comunicación para una propuesta gastronómica de autor.',
    background: '#111111', color: '#f7f7f7', size: 'aspect-[5/4]',
    images: [
      { src: '/proyectos/kanso.png', alt: 'Proyecto KANSO: identidad gastronómica' },
      ...galleryImages('kanso', 'KANSO', 9),
    ],
  },
  {
    name: 'Trust Transfer',
    category: 'Comunicación institucional',
    description: 'Diseño editorial e institucional para una marca de servicios financieros.',
    background: '#0a1628', color: '#f7f7f7', size: 'aspect-[3/4]',
    images: [{ src: '/proyectos/trust-transfer.png', alt: 'Proyecto Trust Transfer: comunicación institucional' }],
  },
  {
    name: 'Epicook Catering',
    category: 'Branding · Packaging',
    description: 'Sistema de identidad y aplicaciones para una propuesta gastronómica.',
    background: '#37231c', color: '#f7f7f7', size: 'aspect-[4/3]',
    images: galleryImages('epicook-catering', 'Epicook Catering', 2),
  },
  {
    name: 'Kapelusz',
    category: 'Identidad · Comunicación',
    description: 'Proyecto de comunicación visual y desarrollo de presencia digital.',
    background: '#29201d', color: '#f7f7f7', size: 'aspect-[3/4]',
    images: galleryImages('kapeluz', 'Kapelusz', 3),
  },
  {
    name: 'Mentora',
    category: 'Branding · Comunicación',
    description: 'Identidad gráfica y sistema de comunicación para una marca con visión propia.',
    background: '#231f36', color: '#f7f7f7', size: 'aspect-[4/5]',
    images: galleryImages('mentora', 'Mentora', 5),
  },
  {
    name: 'Trotécnica Láser',
    category: 'Identidad · Comunicación institucional',
    description: 'Sistema visual y piezas institucionales para una empresa de tecnología aplicada.',
    background: '#17232a', color: '#f7f7f7', size: 'aspect-[4/3]',
    images: galleryImages('trotecnica-laser', 'Trotécnica Láser', 6),
  },
  {
    name: 'Deteik',
    category: 'Branding · Comunicación',
    description: 'Desarrollo de identidad visual y aplicaciones de marca.',
    background: '#21302c', color: '#f7f7f7', size: 'aspect-[5/4]',
    images: galleryImages('deteik', 'Deteik', 2),
  },
  {
    name: 'Electroverse',
    category: 'Identidad · Comunicación',
    description: 'Construcción de lenguaje visual y comunicación de marca.',
    background: '#171527', color: '#f7f7f7', size: 'aspect-[3/4]',
    images: galleryImages('electroverse', 'Electroverse', 2),
  },
  {
    name: 'CashPoint',
    category: 'Branding · Comunicación institucional',
    description: 'Identidad y sistema de comunicación para una empresa de servicios.',
    background: '#14251f', color: '#f7f7f7', size: 'aspect-[4/3]',
    images: galleryImages('cashpoint', 'CashPoint', 6),
  },
  {
    name: 'GoPush',
    category: 'Branding · Comunicación corporativa',
    description: 'Diseño y desarrollo de marca gráfica y comunicación corporativa.',
    background: '#202d36', color: '#f7f7f7', size: 'aspect-[4/5]',
    images: galleryImages('gopush', 'GoPush', 5),
  },
  {
    name: 'Fiduc Inversiones',
    category: 'Branding · Desarrollo web',
    description: 'Rediseño de marca gráfica y desarrollo de sitio web.',
    background: '#173d3c', color: '#f7f7f7', size: 'aspect-[4/3]',
    images: galleryImages('fiduc-inversiones', 'Fiduc Inversiones', 5),
  },
]

export function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const openProject = (project: Project) => {
    setImageIndex(0)
    setSelectedProject(project)
  }

  const showImage = (direction: number) => {
    if (!selectedProject) return
    setImageIndex(current => (current + direction + selectedProject.images.length) % selectedProject.images.length)
  }

  return (
    <>
      <div className="portfolio-track columns-1 md:columns-3 gap-3 md:gap-5">
        {projects.map((project) => (
          <article key={project.name} className={`portfolio-card inline-block w-full mb-3 md:mb-5 break-inside-avoid ${project.size}`}>
            <button
              type="button"
              onClick={() => openProject(project)}
              className="relative w-full h-full overflow-hidden rounded-2xl group cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-dooh-lime focus-visible:ring-offset-4"
              style={{ backgroundColor: project.background }}
              aria-label={`Ver proyecto ${project.name}`}
            >
              <span className="portfolio-img-overlay absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${project.images[0].src})` }} />
              <span className="absolute inset-0 opacity-0 group-hover:opacity-[0.84] transition-opacity duration-500" style={{ backgroundColor: project.background }} />
              <span className="portfolio-card-inner relative z-10 h-full flex flex-col justify-between p-6" style={{ color: project.color }}>
                <span className="text-[10px] font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-80 transition-all duration-300 self-end">Ver proyecto →</span>
                <span>
                  <span className="block text-[10px] font-semibold tracking-widest uppercase opacity-60 group-hover:opacity-100 translate-y-1.5 group-hover:translate-y-0 transition-all duration-300">{project.category}</span>
                  <span className="block text-xl md:text-2xl font-bold leading-tight opacity-75 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 delay-[50ms]">{project.name}</span>
                </span>
              </span>
            </button>
          </article>
        ))}
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] bg-dooh-dark/95 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={`Proyecto ${selectedProject.name}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedProject(null)
          }}
        >
          <div className="relative w-full max-w-7xl max-h-full grid grid-cols-1 lg:grid-cols-[16rem_minmax(0,1fr)] overflow-auto bg-dooh-dark border border-white/10 rounded-2xl">
            <aside className="p-7 md:p-9 flex flex-col justify-between gap-10 border-b lg:border-b-0 lg:border-r border-white/10">
              <div>
                <button type="button" onClick={() => setSelectedProject(null)} className="inline-flex items-center gap-2 text-xs text-dooh-gray-mid hover:text-dooh-lime transition-colors mb-10" aria-label="Cerrar proyecto">
                  <span className="text-lg leading-none">×</span>
                  Cerrar proyecto
                </button>
                <p className="text-dooh-lime text-[10px] font-semibold tracking-widest uppercase mb-4">{selectedProject.category}</p>
                <h3 className="text-3xl font-bold text-dooh-white tracking-tightest mb-4">{selectedProject.name}</h3>
                <p className="text-sm text-dooh-gray-mid font-light leading-relaxed">{selectedProject.description}</p>
              </div>
              <p className="text-xs text-dooh-gray-mid/50">{String(imageIndex + 1).padStart(2, '0')} / {String(selectedProject.images.length).padStart(2, '0')}</p>
            </aside>

            <div className="relative min-h-[45vh] lg:min-h-[70vh] bg-black">
              <img src={selectedProject.images[imageIndex].src} alt={selectedProject.images[imageIndex].alt} className="w-full h-full object-contain" />
              {selectedProject.images.length > 1 && (
                <>
                  <button type="button" onClick={() => showImage(-1)} aria-label="Imagen anterior" className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/55 text-dooh-white border border-white/15 hover:bg-dooh-lime hover:text-dooh-dark transition-colors">←</button>
                  <button type="button" onClick={() => showImage(1)} aria-label="Imagen siguiente" className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/55 text-dooh-white border border-white/15 hover:bg-dooh-lime hover:text-dooh-dark transition-colors">→</button>
                </>
              )}
            </div>

            <button type="button" onClick={() => setSelectedProject(null)} aria-label="Cerrar proyecto" className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dooh-white text-dooh-dark font-light text-xl hover:bg-dooh-lime transition-colors">×</button>
          </div>
        </div>
      )}
    </>
  )
}
