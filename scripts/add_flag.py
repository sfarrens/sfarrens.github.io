#!/usr/bin/env python3
"""Download a country flag and apply the site's elliptical mask.

Usage:
    python3 add_flag.py <iso2_code> [<iso2_code> ...]

Examples:
    python3 add_flag.py dk
    python3 add_flag.py dk us de jp
"""

import io
import sys
import urllib.request
from pathlib import Path

import numpy as np
from PIL import Image

ASSETS = Path(__file__).parent.parent / "assets" / "images"
TEMPLATE = ASSETS / "france.png"
FLAGPEDIA = "https://flagpedia.net/data/flags/w320/{code}.png"


def load_mask():
    return np.array(Image.open(TEMPLATE))[:, :, 3]


def download_flag(code: str, mask: np.ndarray):
    url = FLAGPEDIA.format(code=code.lower())
    try:
        with urllib.request.urlopen(url, timeout=10) as r:
            img = Image.open(io.BytesIO(r.read())).convert("RGBA")
    except Exception as e:
        print(f"  ERROR fetching '{code}': {e}", file=sys.stderr)
        return False

    arr = np.array(img.resize((240, 240), Image.LANCZOS))
    arr[:, :, 3] = mask

    out = ASSETS / f"{code.lower()}.png"
    Image.fromarray(arr).save(out)
    print(f"  saved {out.name}")
    return True


def main():
    if len(sys.argv) < 2 or sys.argv[1] in ("-h", "--help"):
        print(__doc__)
        sys.exit(0)

    mask = load_mask()
    codes = sys.argv[1:]
    ok = sum(download_flag(code, mask) for code in codes)
    print(f"\n{ok}/{len(codes)} flag(s) saved to {ASSETS}")


if __name__ == "__main__":
    main()
