#!/usr/bin/env python3
"""Download a country flag in the site's style (Twemoji, 240x240 PNG).

The existing flags in assets/images/ are Twemoji flags rendered at 240px.
This fetches the Twemoji SVG and renders it with headless Chromium
(requires: pip install playwright && playwright install chromium).

Usage:
    python3 add_flag.py <iso2_code>[:<file_name>] [...]

Examples:
    python3 add_flag.py jp:japan
    python3 add_flag.py dk:denmark us:usa
"""

import sys
import urllib.request
from pathlib import Path

from playwright.sync_api import sync_playwright

ASSETS = Path(__file__).parent.parent / "assets" / "images"
TWEMOJI = "https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/{cp}.svg"
SIZE = 240


def twemoji_url(code: str) -> str:
    # Flags are pairs of regional indicator symbols: 'a' -> U+1F1E6
    cps = [format(0x1F1E6 + ord(c) - ord("a"), "x") for c in code.lower()]
    return TWEMOJI.format(cp="-".join(cps))


def render_flag(page, code: str, name: str) -> bool:
    try:
        with urllib.request.urlopen(twemoji_url(code), timeout=10) as r:
            svg = r.read().decode()
    except Exception as e:
        print(f"  ERROR fetching '{code}': {e}", file=sys.stderr)
        return False

    svg = svg.replace("<svg", f'<svg width="{SIZE}" height="{SIZE}"', 1)
    page.set_content(f'<body style="margin:0;background:transparent">{svg}</body>')
    out = ASSETS / f"{name}.png"
    page.screenshot(path=str(out), omit_background=True)
    print(f"  saved {out.name}")
    return True


def main():
    if len(sys.argv) < 2 or sys.argv[1] in ("-h", "--help"):
        print(__doc__)
        sys.exit(0)

    args = [a.split(":", 1) if ":" in a else (a, a.lower()) for a in sys.argv[1:]]
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": SIZE, "height": SIZE})
        ok = sum(render_flag(page, code, name) for code, name in args)
        browser.close()
    print(f"\n{ok}/{len(args)} flag(s) saved to {ASSETS}")


if __name__ == "__main__":
    main()
