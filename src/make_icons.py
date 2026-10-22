"""Draw the app icons (Echo in front of the full moon) with headless Chromium.

  python3 src/make_icons.py

Needs the Python Playwright package with Chromium, and Pillow. Writes icons/ at the top of the repository.
"""
import io, os, re
from PIL import Image
from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(HERE), 'icons')

echo_svg = re.search(r"echo: '(<svg[^']+</svg>)'", open(os.path.join(HERE, 'widgets1.js'), encoding='utf-8').read()).group(1)
COLORS = '--raven:#1F1B2E;--raven-sheen:#5B48B5;--raven-sheen-2:#3C5FB0;--raven-beak:#2C2A38;--raven-beak-2:#3A3748;--raven-rim:#1F1B2E;'


def page(scale):
    """scale: how much of the square the moon and raven fill (smaller for maskable icons, which get cropped)"""
    return '''<!doctype html><html><head><style>
html, body {{ margin: 0; width: 1024px; height: 1024px; }}
body {{ background: radial-gradient(circle at 50% 38%, #2B3570 0%, #1C2348 62%, #141A38 100%); position: relative; overflow: hidden; {colors} }}
.stars i {{ position: absolute; width: 10px; height: 10px; border-radius: 50%; background: #F3F0E6; opacity: .8; }}
.moon {{ position: absolute; left: 50%; top: 50%; width: {moon}px; height: {moon}px; margin: -{half}px 0 0 -{half}px; border-radius: 50%;
  background: radial-gradient(circle at 38% 34%, #FFF8E3 0%, #F4E9C8 55%, #E2D3A6 100%); box-shadow: 0 0 120px rgba(244, 233, 200, .35); }}
.bird {{ position: absolute; left: 50%; top: 50%; width: {bird}px; height: {bird}px; margin: -{bhalf}px 0 0 -{bhalf}px; }}
.bird svg {{ width: 100%; height: 100%; }}
</style></head><body>
<div class="stars"><i style="left:150px;top:170px"></i><i style="left:840px;top:140px;width:7px;height:7px"></i><i style="left:880px;top:420px;width:6px;height:6px"></i><i style="left:120px;top:560px;width:7px;height:7px"></i><i style="left:230px;top:850px;width:6px;height:6px"></i><i style="left:800px;top:860px"></i></div>
<div class="moon"></div><div class="bird">{svg}</div>
</body></html>'''.format(colors=COLORS, moon=int(700 * scale), half=int(350 * scale), bird=int(640 * scale), bhalf=int(320 * scale), svg=echo_svg)


def main():
    os.makedirs(OUT, exist_ok=True)
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={'width': 1024, 'height': 1024})
        shots = {}
        for name, scale in (('full', 1.0), ('maskable', 0.78)):
            pg.set_content(page(scale))
            pg.wait_for_timeout(100)
            shots[name] = Image.open(io.BytesIO(pg.screenshot())).convert('RGB')
        b.close()
    for size, name, src in ((180, 'apple-touch-icon.png', 'full'), (192, 'icon-192.png', 'full'),
                            (512, 'icon-512.png', 'full'), (512, 'icon-maskable-512.png', 'maskable')):
        shots[src].resize((size, size), Image.LANCZOS).save(os.path.join(OUT, name), optimize=True)
        print('icons/' + name)


if __name__ == '__main__':
    main()
