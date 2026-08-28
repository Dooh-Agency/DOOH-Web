const logos = Array.from({ length: 12 }, (_, index) => `/clientes/logos/logo-${String(index + 1).padStart(2, '0')}.webp`)

export function ClientLogoCarousel() {
  const items = [...logos, ...logos]

  return (
    <section aria-label="Clientes de DOOH" className="overflow-hidden bg-white py-12 md:py-16">
      <div className="client-logo-fade">
        <div className="client-logo-marquee">
          {items.map((src, index) => (
            <div key={`${src}-${index}`} aria-hidden={index >= logos.length} className="flex h-28 w-52 shrink-0 items-center justify-center px-1 md:h-36 md:w-56 md:px-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="max-h-full max-w-full object-contain grayscale opacity-55 transition-opacity duration-300 hover:opacity-90" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
