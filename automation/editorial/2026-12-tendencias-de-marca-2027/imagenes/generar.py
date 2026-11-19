"""Genera las placas de "Tendencias de marca 2027" como HTML (SVG + Nunito Sans).
Uso: python3 -I build.py <carpeta_salida> <ruta_fuente_woff2>
"""
import sys, pathlib, random, math

out = pathlib.Path(sys.argv[1]); out.mkdir(parents=True, exist_ok=True)
font = pathlib.Path(sys.argv[2]).resolve().as_uri()

DARK, LIME, PAPER, INK = "#050507", "#DDF81D", "#EEEADF", "#1B1B1F"

# Isotipo (infinito) del logo horizontal del sitio: caja 0..37.3 x 0..20.84
ISO = ("M10.3,0C4.54.07-.07,4.79,0,10.54c.07,5.66,4.64,10.23,10.3,10.3,3.33-.01,6.43-1.64,8.34-4.36,1.91,2.72,5.03,4.35,8.36,4.36,"
       "5.75-.07,10.36-4.79,10.3-10.54-.07-5.66-4.64-10.23-10.3-10.3-3.33.01-6.44,1.63-8.36,4.35C16.73,1.63,13.62.01,10.3,0M10.3,3.91"
       "c3.4.24,5.08,2.38,7.57,4.64h-1.42c.16.54.25,1.1.26,1.67v.4c-.16,3.55-3.15,6.3-6.7,6.14-3.55-.16-6.29-3.15-6.14-6.7.15-3.45,"
       "2.99-6.15,6.43-6.15h0ZM26.99,3.91c3.59,0,6.5,2.92,6.5,6.51,0,3.59-2.91,6.49-6.5,6.5-3.39-.24-5.09-2.38-7.57-4.63h1.43c-.16-.54-"
       ".25-1.1-.26-1.67v-.4c.06-3.5,2.91-6.3,6.4-6.31h0Z")
ISO_W, ISO_H = 37.3, 20.84

# Logotipo "DOOH" (letras del logo horizontal), caja x 44.4..104 y 4..17.2
WORD = [
 "M56.25,10.37c0,1.11-.21,2.07-.62,2.88-.41.81-.96,1.47-1.63,1.99-.68.52-1.44.9-2.29,1.150-.85.25-1.71.37-2.59.37h-4.74V4.05h4.6c.9,0,1.78.11,2.66.31.87.21,1.65.56,2.33,1.04.68.48,1.23,1.13,1.65,1.95.42.81.63,1.82.63,3.020ZM53.05,10.37c0-.72-.12-1.31-.35-1.79-.23-.47-.55-.85-.93-1.13-.39-.28-.83-.48-1.33-.6-.5-.12-1.01-.18-1.54-.18h-1.53v7.43h1.45c.55,0,1.08-.06,1.59-.19.51-.12.96-.33,1.35-.62.39-.29.7-.67.93-1.150.23-.48.35-1.07.35-1.78Z",
 "M72.88,10.36c0,1.01-.17,1.92-.52,2.76-.35.83-.83,1.54-1.45,2.14-.62.59-1.35,1.05-2.2,1.37-.85.32-1.77.49-2.77.49s-1.91-.16-2.76-.49c-.84-.32-1.57-.78-2.19-1.37s-1.1-1.3-1.45-2.14c-.35-.83-.52-1.75-.52-2.76s.17-1.94.52-2.76c.35-.82.83-1.52,1.45-2.09.62-.57,1.35-1.02,2.19-1.33.84-.31,1.76-.47,2.76-.47s1.92.16,2.77.47c.85.31,1.58.75,2.2,1.33.62.58,1.1,1.27,1.45,2.09.35.82.52,1.74.52,2.76ZM69.59,10.36c0-.55-.09-1.07-.27-1.54-.18-.48-.43-.89-.75-1.23-.32-.34-.7-.61-1.15-.81-.45-.2-.94-.3-1.48-.3s-1.03.1-1.47.3c-.44.2-.83.47-1.15.81-.32.34-.57.75-.75,1.23-.17.48-.26.99-.26,1.54s.09,1.1.27,1.59c.18.49.43.9.75,1.25.32.35.7.62,1.14.82.44.2.93.3,1.47.3s1.03-.1,1.47-.3c.44-.2.83-.47,1.15-.82.32-.35.57-.76.75-1.25.18-.48.27-1.01.27-1.59Z",
 "M89.51,10.36c0,1.01-.17,1.92-.52,2.76-.35.83-.83,1.54-1.45,2.14-.62.59-1.35,1.05-2.2,1.37-.85.32-1.77.49-2.77.49s-1.91-.16-2.76-.49c-.84-.32-1.57-.78-2.19-1.37s-1.1-1.3-1.45-2.14c-.35-.83-.52-1.75-.52-2.76s.17-1.94.52-2.76c.35-.82.83-1.52,1.45-2.09.62-.57,1.35-1.02,2.19-1.33.84-.31,1.76-.47,2.76-.47s1.92.16,2.77.47c.85.31,1.58.75,2.2,1.33.62.58,1.1,1.27,1.45,2.09.35.82.52,1.74.52,2.76ZM86.22,10.36c0-.55-.09-1.07-.27-1.54-.18-.48-.43-.89-.75-1.23-.32-.34-.7-.61-1.15-.81-.45-.2-.94-.3-1.48-.3s-1.03.1-1.47.3c-.44.2-.83.47-1.15.81-.32.34-.57.75-.75,1.23-.17.48-.26.99-.26,1.54s.09,1.1.27,1.59c.18.49.43.9.75,1.25.32.35.7.62,1.14.82.44.2.93.3,1.47.3s1.03-.1,1.47-.3c.44-.2.83-.47,1.15-.82.32-.35.57-.76.75-1.25.18-.48.27-1.01.27-1.59Z",
 "M100.92,16.77v-5.32h-4.96v5.32h-3.07V4.05h3.07v4.81h4.96v-4.81h3.07v12.72h-3.07Z",
]

def iso(x, y, w, fill, extra=""):
    s = w / ISO_W
    return f'<path d="{ISO}" transform="translate({x},{y}) scale({s})" fill="{fill}" {extra}/>'

def logo(x, y, w, fill):
    """Isotipo + logotipo DOOH (firma), w = ancho total."""
    s = w / 104.0
    return (f'<g transform="translate({x},{y}) scale({s})" fill="{fill}"><path d="{ISO}"/>'
            + "".join(f'<path d="{p}"/>' for p in WORD) + "</g>")

def page(name, w, h, bg, body_svg, fg, number, title, kicker="Tendencias de marca 2027"):
    html = f"""<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:Nunito;src:url('{font}') format('woff2');font-weight:200 900}}
html,body{{margin:0;width:{w}px;height:{h}px;overflow:hidden;background:{bg}}}
svg{{display:block}} text{{font-family:Nunito}}
</style></head><body>
<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
{body_svg}
<text x="80" y="104" font-size="24" font-weight="800" letter-spacing="4" fill="{fg}" opacity=".6">{kicker.upper()}</text>
<text x="{w-80}" y="104" font-size="24" font-weight="800" letter-spacing="4" fill="{fg}" opacity=".6" text-anchor="end">{number}</text>
<text x="80" y="{h-190}" font-size="64" font-weight="900" letter-spacing="-1.5" fill="{fg}">{title[0]}</text>
<text x="80" y="{h-118}" font-size="64" font-weight="900" letter-spacing="-1.5" fill="{fg}">{title[1]}</text>
{logo(w-80-190, h-104, 190, fg)}
</svg></body></html>"""
    (out / f"{name}.html").write_text(html, encoding="utf-8")

W, H = 1080, 1350

# 1 · Imperfección visible: el infinito bocetado a lápiz sobre papel, con guías de construcción.
rnd = random.Random(7)
sketch = []
for seed, op, wdt, dx, dy in [(3, .9, 2.6, 0, 0), (11, .55, 1.8, 4, -3), (19, .35, 1.4, -5, 4)]:
    attrs = 'stroke="%s" stroke-width="%.3f" opacity="%s" stroke-linejoin="round"' % (INK, wdt / (780 / ISO_W), op)
    sketch.append(f'<g filter="url(#rough{seed})" transform="translate({dx},{dy})">{iso(150, 330, 780, "none", attrs)}</g>')
filters = "".join(
    f'<filter id="rough{seed}" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="{seed}"/>'
    f'<feDisplacementMap in="SourceGraphic" scale="9" xChannelSelector="R" yChannelSelector="G"/></filter>' for seed in (3, 11, 19))
guides = (f'<g stroke="{INK}" stroke-width="1.4" fill="none" opacity=".28" stroke-dasharray="10 9">'
          f'<circle cx="367" cy="547" r="216"/><circle cx="713" cy="547" r="216"/>'
          f'<line x1="90" y1="547" x2="990" y2="547"/><line x1="540" y1="250" x2="540" y2="860"/>'
          f'<line x1="150" y1="330" x2="930" y2="330"/><line x1="150" y1="767" x2="930" y2="767"/></g>')
marker = (f'<path filter="url(#rough11)" d="M190,800 C 360,770 620,790 900,770" stroke="{LIME}" stroke-width="46" '
          f'stroke-linecap="round" fill="none" opacity=".95"/>')
notes = (f'<g font-family="Nunito" font-style="italic" font-size="26" fill="{INK}" opacity=".55">'
         f'<text x="150" y="300">r = 216</text><text x="760" y="300">¿más grueso?</text>'
         f'<text x="420" y="900">trazo 2 · corregido</text></g>')
paper = (f'<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" seed="2"/>'
         f'<feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .09 0"/></filter>'
         f'<rect width="{W}" height="{H}" fill="{PAPER}"/><rect width="{W}" height="{H}" filter="url(#grain)"/>')
page("01-imperfeccion", W, H, PAPER, f"<defs>{filters}</defs>{paper}{marker}{guides}{''.join(sketch)}{notes}", INK,
     "01 / 04", ("La imperfección", "deja de esconderse"))

# 2 · Sistema, no logo: el infinito partido en cuatro soportes que juntos lo completan.
tiles = []
cut_x, cut_y = 540, 547
pieces = [
    ("pack", 120, 300, cut_x - 120, cut_y - 300, 0),
    ("pantalla", cut_x, 300, 960 - cut_x, cut_y - 300, 28),
    ("tarjeta", 120, cut_y, cut_x - 120, 800 - cut_y, 12),
    ("story", cut_x, cut_y, 960 - cut_x, 800 - cut_y, 40),
]
gap = 22
for i, (label, x, y, w, h, r) in enumerate(pieces):
    ox = -gap if x < cut_x else gap
    oy = -gap if y < cut_y else gap
    tiles.append(
        f'<clipPath id="c{i}"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}"/></clipPath>'
        f'<g transform="translate({ox},{oy})"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="#121216" stroke="#2A2A31" stroke-width="2"/>'
        f'<g clip-path="url(#c{i})">{iso(150, 330, 780, LIME)}</g>'
        f'<rect x="{x + 16}" y="{y + (h - 54 if y >= cut_y else 16)}" width="{len(label) * 17 + 34}" height="38" rx="19" fill="{DARK}"/>'
        f'<text x="{x + 33}" y="{y + (h - 27 if y >= cut_y else 43)}" font-size="20" font-weight="800" letter-spacing="3" fill="#B9B9C2">{label.upper()}</text></g>')
page("02-sistema", W, H, DARK, f'<rect width="{W}" height="{H}" fill="{DARK}"/>' + "".join(tiles), "#FFFFFF",
     "02 / 04", ("La marca es un sistema,", "no un logo"))

# 3 · Letras con carácter: DOOH en peso máximo, con volumen.
depth = "".join(f'<text x="{540 + i}" y="{690 + i}" text-anchor="middle" font-size="285" font-weight="900" letter-spacing="-12" fill="{DARK}">DOOH</text>' for i in range(1, 17))
front = f'<text x="540" y="690" text-anchor="middle" font-size="285" font-weight="900" letter-spacing="-12" fill="#FFFFFF" stroke="{DARK}" stroke-width="5" paint-order="stroke">DOOH</text>'
specs = (f'<g font-size="24" font-weight="700" fill="{DARK}" opacity=".7"><text x="80" y="380">Nunito Sans · 900</text>'
         f'<text x="1000" y="380" text-anchor="end">−12 tracking</text></g>'
         f'<line x1="80" y1="400" x2="1000" y2="400" stroke="{DARK}" stroke-width="2" opacity=".35"/>'
         f'<line x1="80" y1="740" x2="1000" y2="740" stroke="{DARK}" stroke-width="2" opacity=".35"/>')
page("03-letras", W, H, LIME, f'<rect width="{W}" height="{H}" fill="{LIME}"/>{specs}{depth}{front}', DARK,
     "03 / 04", ("Las letras cargan", "la identidad"))

# 4 · IA como herramienta: variaciones generadas y una decisión.
cells = []
rnd = random.Random(4)
cw, ch, x0, y0 = 220, 150, 80, 290
chosen = (1, 2)
for r in range(3):
    for c in range(3):
        x, y = x0 + c * (cw + 20), y0 + r * (ch + 20)
        rot = rnd.uniform(-18, 18); sk = rnd.uniform(-14, 14); sc = rnd.uniform(.75, 1.05)
        style = rnd.choice(["stroke", "fill", "dots"])
        if (r, c) == chosen:
            rot, sk, sc = 0, 0, 1
        w = 140 * sc; ix, iy = -w / 2, -w * ISO_H / ISO_W / 2
        cx, cy = x + cw / 2, y + ch / 2
        if style == "fill":
            mark = iso(ix, iy, w, "#4A4A55")
        elif style == "dots":
            mark = iso(ix, iy, w, "none", f'stroke="#6A6A75" stroke-width="{1.4/(w/ISO_W):.3f}" stroke-dasharray="{2/(w/ISO_W):.3f} {3/(w/ISO_W):.3f}"')
        else:
            mark = iso(ix, iy, w, "none", f'stroke="#6A6A75" stroke-width="{1.6/(w/ISO_W):.3f}"')
        sel = (r, c) == chosen
        if sel:
            mark = iso(ix, iy, w, "#FFFFFF")
        cells.append(f'<clipPath id="k{r}{c}"><rect x="{x}" y="{y}" width="{cw}" height="{ch}" rx="14"/></clipPath>'
                     f'<rect x="{x}" y="{y}" width="{cw}" height="{ch}" rx="14" fill="#101014" stroke="{LIME if sel else "#24242B"}" stroke-width="{4 if sel else 2}"/>'
                     f'<g clip-path="url(#k{r}{c})"><g transform="translate({cx},{cy}) rotate({rot:.1f}) skewX({sk:.1f})">{mark}</g></g>')
cursor_x, cursor_y = x0 + chosen[1] * (cw + 20) + cw - 40, y0 + chosen[0] * (ch + 20) + ch - 30
cursor = (f'<path d="M{cursor_x},{cursor_y} l0,46 l12,-11 l9,21 l9,-4 l-9,-20 l16,0 z" fill="#FFFFFF" stroke="{DARK}" stroke-width="2"/>')
arrow = f'<path d="M780 ,{y0 + 245} C 830,{y0 + 245} 840,{y0 + 245} 860,{y0 + 245}" stroke="{LIME}" stroke-width="4" fill="none"/>'
final = (f'<rect x="780" y="{y0}" width="220" height="490" rx="22" fill="{LIME}"/>'
         + iso(800, y0 + 200, 180, DARK)
         + f'<text x="800" y="{y0 + 48}" font-size="22" font-weight="800" letter-spacing="3" fill="{DARK}">DECISIÓN</text>'
         f'<text x="800" y="{y0 + 455}" font-size="22" font-weight="700" fill="{DARK}">una persona</text>')
labels = (f'<text x="{x0}" y="{y0 - 22}" font-size="22" font-weight="800" letter-spacing="3" fill="#8A8A93">PROPUESTAS · IA</text>')
page("04-ia", W, H, DARK, f'<rect width="{W}" height="{H}" fill="{DARK}"/>{labels}{"".join(cells)}{cursor}{final}', "#FFFFFF",
     "04 / 04", ("La IA como herramienta,", "no como estética"))

# Portada del blog (2000 × 1124, como las demás notas: 16:9) con las cuatro placas.
cover = f"""<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:Nunito;src:url('{font}') format('woff2');font-weight:200 900}}
html,body{{margin:0;width:2000px;height:1124px;overflow:hidden;background:{DARK};font-family:Nunito}}
.wrap{{display:flex;height:100%;align-items:center;gap:70px;padding:0 90px;box-sizing:border-box}}
.copy{{flex:0 0 640px;color:#fff}} .copy p{{margin:0;font-size:26px;font-weight:800;letter-spacing:5px;color:{LIME}}}
.copy h1{{margin:26px 0 0;font-size:92px;line-height:.98;font-weight:900;letter-spacing:-2px}}
.copy span{{display:block;margin-top:34px;font-size:30px;color:#B9B9C2;font-weight:600}}
.grid{{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;flex:1}}
.grid img{{width:100%;border-radius:18px;display:block;box-shadow:0 0 0 2px #2A2A31}}
</style></head><body><div class="wrap"><div class="copy"><p>BLOG · DOOH</p><h1>Tendencias de marca 2027</h1>
<span>Cuatro señales para leer antes de diseñar</span></div>
<div class="grid"><img src="01-imperfeccion.png"><img src="02-sistema.png"><img src="03-letras.png"><img src="04-ia.png"></div></div></body></html>"""
(out / "00-portada.html").write_text(cover, encoding="utf-8")
print("ok")

# ---- Versiones para el sitio (16:9) ----
BW, BH = 1600, 892

def blog_page(name, body, bg):
    html = f"""<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:Nunito;src:url('{font}') format('woff2');font-weight:200 900}}
html,body{{margin:0;width:{BW}px;height:{BH}px;overflow:hidden;background:{bg}}} svg{{display:block}} text{{font-family:Nunito}}
</style></head><body><svg xmlns="http://www.w3.org/2000/svg" width="{BW}" height="{BH}" viewBox="0 0 {BW} {BH}">{body}</svg></body></html>"""
    (out / f"{name}.html").write_text(html, encoding="utf-8")

# Señal 4 en 16:9: grilla de propuestas, flecha y decisión.
rnd = random.Random(4)
cw, ch, gx, gy, x0, y0 = 250, 170, 22, 22, 120, 170
blog_cells = []
for r in range(3):
    for c in range(3):
        x, y = x0 + c * (cw + gx), y0 + r * (ch + gy)
        rot = rnd.uniform(-18, 18); sk = rnd.uniform(-14, 14); sc = rnd.uniform(.75, 1.05)
        style = rnd.choice(["stroke", "fill", "dots"])
        sel = (r, c) == (1, 2)
        if sel: rot, sk, sc = 0, 0, 1
        w = 160 * sc; ix, iy = -w / 2, -w * ISO_H / ISO_W / 2
        k = w / ISO_W
        if sel: mark = iso(ix, iy, w, "#FFFFFF")
        elif style == "fill": mark = iso(ix, iy, w, "#4A4A55")
        elif style == "dots": mark = iso(ix, iy, w, "none", 'stroke="#6A6A75" stroke-width="%.3f" stroke-dasharray="%.3f %.3f"' % (1.4 / k, 2 / k, 3 / k))
        else: mark = iso(ix, iy, w, "none", 'stroke="#6A6A75" stroke-width="%.3f"' % (1.6 / k))
        cx, cy = x + cw / 2, y + ch / 2
        blog_cells.append(f'<clipPath id="b{r}{c}"><rect x="{x}" y="{y}" width="{cw}" height="{ch}" rx="16"/></clipPath>'
                          f'<rect x="{x}" y="{y}" width="{cw}" height="{ch}" rx="16" fill="#101014" stroke="{LIME if sel else "#24242B"}" stroke-width="{4 if sel else 2}"/>'
                          f'<g clip-path="url(#b{r}{c})"><g transform="translate({cx},{cy}) rotate({rot:.1f}) skewX({sk:.1f})">{mark}</g></g>')
selx, sely = x0 + 2 * (cw + gx) + cw, y0 + 1 * (ch + gy) + ch / 2
cur = f'<path d="M{selx - 46},{sely + 40} l0,46 l12,-11 l9,21 l9,-4 l-9,-20 l16,0 z" fill="#FFFFFF" stroke="{DARK}" stroke-width="2"/>'
arrow = (f'<path d="M{selx + 30},{sely} L1030,{sely}" stroke="{LIME}" stroke-width="4" stroke-dasharray="10 10"/>'
         f'<path d="M1030,{sely - 12} L1052,{sely} L1030,{sely + 12} z" fill="{LIME}"/>')
card = (f'<rect x="1080" y="{y0}" width="400" height="{3 * ch + 2 * gy}" rx="26" fill="{LIME}"/>'
        + iso(1140, sely - 150 * ISO_H / ISO_W, 280, DARK)
        + f'<text x="1112" y="{y0 + 56}" font-size="24" font-weight="800" letter-spacing="4" fill="{DARK}">DECISIÓN</text>'
        f'<text x="1112" y="{y0 + 3 * ch + 2 * gy - 34}" font-size="26" font-weight="700" fill="{DARK}">una persona</text>')
lab = (f'<text x="{x0}" y="{y0 - 30}" font-size="24" font-weight="800" letter-spacing="4" fill="#8A8A93">PROPUESTAS · IA</text>'
       + logo(BW - 120 - 150, BH - 80, 150, "#FFFFFF"))
blog_page("blog-04-ia", f'<rect width="{BW}" height="{BH}" fill="{DARK}"/>{lab}{"".join(blog_cells)}{cur}{arrow}{card}', DARK)

# Portada de la nota, en la línea de las portadas del blog (nota-11): negro, tipografía grande, pie con DOOH.
thumbs = ""  # Portada solo tipográfica, como las demás notas.
cover_body = (f'<rect width="{BW}" height="{BH}" fill="{DARK}"/>'
              f'<text x="150" y="150" font-size="30" font-weight="300" letter-spacing="9" fill="#FFFFFF">TENDENCIAS DE MARCA 2027</text>'
              f'<text x="150" y="560" font-size="300" font-weight="900" letter-spacing="-8" fill="{LIME}">4</text>'
              f'<text x="365" y="455" font-size="78" font-weight="800" letter-spacing="-1.5" fill="#FFFFFF">señales para leer</text>'
              f'<text x="365" y="545" font-size="78" font-weight="800" letter-spacing="-1.5" fill="#FFFFFF">antes de diseñar</text>'
              + thumbs +
              f'<line x1="150" y1="790" x2="{BW - 150}" y2="790" stroke="#FFFFFF" stroke-opacity=".25" stroke-width="2"/>'
              + "".join(f'<path d="{p}" transform="translate(150,812) scale(1.6) translate(-44.4,-4)" fill="#FFFFFF"/>' for p in WORD)
              + f'<text x="{BW - 150}" y="840" text-anchor="end" font-size="26" font-weight="400" fill="#FFFFFF" opacity=".85">Change the game. By design.</text>')
blog_page("blog-portada", cover_body, DARK)
print("blog ok")
