from __future__ import annotations

import argparse
import hashlib
import json
from collections import Counter
from pathlib import Path

from PIL import Image
from pypdf import PdfReader


PROJECT_PAGES: dict[str, list[int]] = {
    "vision-flow-group-headquarters": [11],
    "soneri-residencias": [15],
    "infinity-99": [16],
    "e16-mixed-use-arcade": [20],
    "shafaq-hadi-plaza": [32, 33],
    "taj-residencia-neoclassical-villa": [70, 73],
    "trag-mianwali-villa": [71, 72],
    "i14-classical-villa": [74],
    "i15-mediterranean-villa": [75],
    "taj-residencia-corner-villa": [76],
    "taj-residencia-neoclassical-villa-two": [77],
    "rehbar-neoclassical-villa": [78],
    "gulberg-greens-neoclassical-villa": [79],
    "taj-residencia-mediterranean-villa": [80],
    "taj-residencia-calligraphy-house": [82],
    "taj-residencia-contemporary-house": [86],
    "i14-3-contemporary-residence": [87],
    "taj-residencia-35x70-residence": [88],
    "taj-residencia-50x90-residence": [89],
    "multi-gardens-b17-residence": [90],
    "rehbar-40x60-contemporary-villa": [105],
    "i15-corner-villa": [116],
    "taj-residencia-30x50-neoclassical-villa": [117],
    "taj-residencia-25x50-contemporary-home": [118],
    "i14-3-neoclassical-corner-villa": [120],
    "naval-anchorage-luxury-villa": [121, 125],
    "taj-residencia-minimalist-villa": [123],
    "taj-residencia-contemporary-corner-villa": [126],
    "taj-residencia-contemporary-villa-two": [127],
    "rehbar-25x50-contemporary-villa": [128],
}


def normalized_hash(image: Image.Image) -> str:
    normalized = image.convert("RGB").resize((96, 64))
    return hashlib.sha256(normalized.tobytes()).hexdigest()


def difference_hash(image: Image.Image) -> int:
    gray = image.convert("L").resize((17, 16))
    pixels = list(gray.get_flattened_data())
    bits = 0
    for y in range(16):
        row = y * 17
        for x in range(16):
            bits = (bits << 1) | int(pixels[row + x] > pixels[row + x + 1])
    return bits


def is_near_duplicate(image: Image.Image, seen: list[tuple[int, float]]) -> bool:
    fingerprint = difference_hash(image)
    aspect = image.width / image.height
    for previous, previous_aspect in seen:
        if abs(aspect - previous_aspect) <= 0.04 and (fingerprint ^ previous).bit_count() <= 12:
            return True
    seen.append((fingerprint, aspect))
    return False


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("--public", type=Path, default=Path("public/geo-arc"))
    parser.add_argument("--manifest", type=Path, default=Path("src/data/geo-arc-galleries.json"))
    args = parser.parse_args()

    reader = PdfReader(str(args.pdf))
    candidates: dict[str, list[Image.Image]] = {slug: [] for slug in PROJECT_PAGES}
    frequencies: Counter[str] = Counter()

    for slug, page_numbers in PROJECT_PAGES.items():
        for page_number in page_numbers:
            for embedded in reader.pages[page_number - 1].images:
                image = embedded.image.convert("RGB")
                if image.width < 400 or image.height < 250:
                    continue
                key = normalized_hash(image)
                frequencies[key] += 1
                candidates[slug].append(image.copy())

    manifest: dict[str, list[str]] = {}
    report: dict[str, int] = {}
    args.public.mkdir(parents=True, exist_ok=True)

    for slug, images in candidates.items():
        cover_path = args.public / f"{slug}.webp"
        if not cover_path.exists():
            raise FileNotFoundError(f"Missing cover image: {cover_path}")

        output_dir = args.public / slug
        output_dir.mkdir(parents=True, exist_ok=True)
        for previous_file in output_dir.glob("*.webp"):
            previous_file.unlink()
        gallery = [f"/geo-arc/{slug}.webp"]
        cover = Image.open(cover_path).convert("RGB")
        seen = [(difference_hash(cover), cover.width / cover.height)]

        saved = 0
        for image in images:
            if frequencies[normalized_hash(image)] >= 5:
                continue
            if is_near_duplicate(image, seen):
                continue
            saved += 1
            filename = f"{saved:02d}.webp"
            image.save(output_dir / filename, "WEBP", quality=88, method=6)
            gallery.append(f"/geo-arc/{slug}/{filename}")

        manifest[slug] = gallery
        report[slug] = len(gallery)

    args.manifest.parent.mkdir(parents=True, exist_ok=True)
    args.manifest.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"Extracted {sum(report.values())} gallery images for {len(report)} projects.")
    for slug, count in report.items():
        print(f"{slug}: {count}")


if __name__ == "__main__":
    main()
