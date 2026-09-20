#!/usr/bin/env python3
"""
Scans img/<gallery>/ and writes data/frames.js.

Reads true pixel dimensions from the JPEG SOF marker and camera data from the
EXIF block. Captions come from captions.json, which you edit by hand — the
script never overwrites them.

No dependencies. Run from the repo root:

    python3 build.py

Galleries are the folder names inside img/. Order is set by GALLERY_ORDER
below; anything not listed is appended alphabetically.
"""

import json
import os
import struct
import sys

IMG_DIR = "img"
OUT_FILE = os.path.join("data", "frames.js")
CAPTIONS_FILE = "captions.json"
EXTS = (".jpg", ".jpeg")

# Nav order. Folder names in img/ that aren't listed get appended after these.
GALLERY_ORDER = ["2026", "2025", "archive"]

# Human labels for the nav. Missing keys fall back to the folder name.
GALLERY_LABELS = {"archive": "Archive"}


# ----------------------------------------------------------------- dimensions

def jpeg_size(path):
    """(width, height) from the JPEG SOF marker. Stdlib only."""
    with open(path, "rb") as f:
        if f.read(2) != b"\xff\xd8":
            return None
        while True:
            byte = f.read(1)
            while byte and byte != b"\xff":
                byte = f.read(1)
            marker = f.read(1)
            while marker == b"\xff":
                marker = f.read(1)
            if not marker:
                return None
            code = marker[0]
            if code in (0xD8, 0xD9) or 0xD0 <= code <= 0xD7:
                continue
            length = int.from_bytes(f.read(2), "big")
            if 0xC0 <= code <= 0xCF and code not in (0xC4, 0xC8, 0xCC):
                f.read(1)
                height = int.from_bytes(f.read(2), "big")
                width = int.from_bytes(f.read(2), "big")
                return width, height
            f.seek(length - 2, 1)


# ----------------------------------------------------------------------- exif

TYPE_SIZE = {1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 6: 1, 7: 1, 8: 2, 9: 4, 10: 8,
             11: 4, 12: 8}

# IFD0 tags
TAG_MAKE = 0x010F
TAG_MODEL = 0x0110
TAG_ORIENTATION = 0x0112
TAG_ARTIST = 0x013B
TAG_COPYRIGHT = 0x8298
TAG_EXIF_IFD = 0x8769

# ExifIFD tags
TAG_EXPOSURE = 0x829A
TAG_FNUMBER = 0x829D
TAG_ISO = 0x8827
TAG_DATETIME = 0x9003
TAG_FOCAL = 0x920A
TAG_LENS = 0xA434
TAG_COLORSPACE = 0xA001


def _read_ifd(buf, tiff, offset, en):
    """Return {tag: (type, count, raw_value_bytes)} for one IFD."""
    entries = {}
    pos = tiff + offset
    if pos + 2 > len(buf):
        return entries
    count = struct.unpack(en + "H", buf[pos:pos + 2])[0]
    for i in range(count):
        e = pos + 2 + i * 12
        if e + 12 > len(buf):
            break
        tag, typ, cnt = struct.unpack(en + "HHI", buf[e:e + 8])
        size = TYPE_SIZE.get(typ, 0) * cnt
        if size > 4:
            (voff,) = struct.unpack(en + "I", buf[e + 8:e + 12])
            raw = buf[tiff + voff:tiff + voff + size]
        else:
            raw = buf[e + 8:e + 8 + size]
        entries[tag] = (typ, cnt, raw)
    return entries


def _ascii(entry):
    if not entry:
        return None
    return entry[2].split(b"\x00")[0].decode("utf-8", "replace").strip() or None


def _short(entry, en):
    if not entry or len(entry[2]) < 2:
        return None
    return struct.unpack(en + "H", entry[2][:2])[0]


def _rational(entry, en):
    if not entry or len(entry[2]) < 8:
        return None
    num, den = struct.unpack(en + "II", entry[2][:8])
    if den == 0:
        return None
    return num / den


def read_exif(path):
    """Camera fields as a dict. Missing tags are simply absent."""
    with open(path, "rb") as f:
        buf = f.read(256 * 1024)

    i = buf.find(b"Exif\x00\x00")
    if i < 0:
        return {}
    tiff = i + 6
    if buf[tiff:tiff + 2] not in (b"II", b"MM"):
        return {}
    en = "<" if buf[tiff:tiff + 2] == b"II" else ">"
    (first,) = struct.unpack(en + "I", buf[tiff + 4:tiff + 8])

    ifd0 = _read_ifd(buf, tiff, first, en)
    sub = {}
    if TAG_EXIF_IFD in ifd0:
        (eoff,) = struct.unpack(en + "I", ifd0[TAG_EXIF_IFD][2][:4])
        sub = _read_ifd(buf, tiff, eoff, en)

    out = {}

    make = _ascii(ifd0.get(TAG_MAKE))
    model = _ascii(ifd0.get(TAG_MODEL))
    if make:
        # Cameras write the make in caps ("SONY", "NIKON CORPORATION").
        # Title-case it so the caption reads "Sony ILCE-7M4".
        make = make.split()[0]
        if make.isupper():
            make = make.capitalize()
    if model:
        # Don't repeat the make when the model already contains it.
        if make and not model.upper().startswith(make.upper()):
            out["camera"] = "%s %s" % (make, model)
        else:
            out["camera"] = model
    elif make:
        out["camera"] = make

    lens = _ascii(sub.get(TAG_LENS))
    if lens:
        out["lens"] = lens

    fnum = _rational(sub.get(TAG_FNUMBER), en)
    if fnum:
        out["aperture"] = ("f/%.1f" % fnum).replace(".0", "")

    exp = _rational(sub.get(TAG_EXPOSURE), en)
    if exp:
        out["shutter"] = "%ds" % round(exp) if exp >= 1 else "1/%d" % round(1 / exp)

    focal = _rational(sub.get(TAG_FOCAL), en)
    if focal:
        out["focal"] = ("%.0fmm" % focal)

    iso = _short(sub.get(TAG_ISO), en)
    if iso:
        out["iso"] = "ISO %d" % iso

    shot = _ascii(sub.get(TAG_DATETIME))
    if shot and len(shot) >= 10:
        y, m, d = shot[:10].split(":")
        out["date"] = "%s-%s-%s" % (y, m, d)

    orient = _short(ifd0.get(TAG_ORIENTATION), en)
    if orient and orient != 1:
        out["orientation"] = orient

    cs = _short(sub.get(TAG_COLORSPACE), en)
    if cs is not None:
        out["srgb"] = (cs == 1)

    artist = _ascii(ifd0.get(TAG_ARTIST))
    if artist:
        out["artist"] = artist

    return out


# ------------------------------------------------------------------- captions

def load_captions():
    if not os.path.isfile(CAPTIONS_FILE):
        return {}
    try:
        with open(CAPTIONS_FILE) as f:
            return json.load(f)
    except json.JSONDecodeError as exc:
        sys.exit("%s is not valid JSON: %s" % (CAPTIONS_FILE, exc))


def save_captions(captions):
    """Rewrite captions.json so new photos appear as empty entries to fill in."""
    with open(CAPTIONS_FILE, "w") as f:
        json.dump(captions, f, indent=2, sort_keys=True)
        f.write("\n")


# ----------------------------------------------------------------------- main

def main():
    if not os.path.isdir(IMG_DIR):
        sys.exit("No %s/ folder. Create it with one subfolder per gallery." % IMG_DIR)

    found = [d for d in os.listdir(IMG_DIR)
             if os.path.isdir(os.path.join(IMG_DIR, d)) and not d.startswith(".")]
    galleries = [g for g in GALLERY_ORDER if g in found]
    galleries += sorted(g for g in found if g not in GALLERY_ORDER)

    if not galleries:
        sys.exit("No gallery folders inside %s/." % IMG_DIR)

    captions = load_captions()
    flat_warnings = []
    data = []
    total = 0

    for gallery in galleries:
        folder = os.path.join(IMG_DIR, gallery)
        names = sorted(f for f in os.listdir(folder)
                       if f.lower().endswith(EXTS) and not f.startswith("."))
        frames = []

        for name in names:
            path = os.path.join(folder, name)
            size = jpeg_size(path)
            if not size:
                flat_warnings.append("%s: not a readable JPEG, skipped" % path)
                continue
            width, height = size
            key = "%s/%s" % (gallery, name)

            exif = read_exif(path)

            # Portrait shots that rely on an orientation flag need the ratio flipped.
            if exif.get("orientation") in (5, 6, 7, 8):
                width, height = height, width

            if exif.get("srgb") is False:
                flat_warnings.append(
                    "%s: colour space is not sRGB, will look flat in browsers" % key)
            exif.pop("srgb", None)
            exif.pop("orientation", None)

            mb = os.path.getsize(path) / 1024 / 1024
            if mb > 5:
                flat_warnings.append("%s: %.0f MB, export smaller for the web" % (key, mb))

            captions.setdefault(key, "")

            frame = {
                "src": "img/%s" % key,
                "w": width,
                "h": height,
                "ratio": round(width / height, 4),
                "caption": captions[key],
            }
            frame.update(exif)
            frames.append(frame)

        total += len(frames)
        data.append({
            "id": gallery,
            "label": GALLERY_LABELS.get(gallery, gallery),
            "frames": frames,
        })

    os.makedirs(os.path.dirname(OUT_FILE), exist_ok=True)
    with open(OUT_FILE, "w") as f:
        f.write("// Generated by build.py. Do not edit by hand —\n")
        f.write("// edit captions.json and re-run the script instead.\n")
        f.write("window.STUDIO_DATA = ")
        json.dump(data, f, indent=2)
        f.write(";\n")

    save_captions(captions)

    for gallery in data:
        print("%-10s %d frames" % (gallery["id"], len(gallery["frames"])))
    print("-> %s (%d frames total)" % (OUT_FILE, total))

    missing = [k for k, v in captions.items() if not v]
    if missing:
        print("\n%d photo(s) have no caption yet. Fill them in %s:"
              % (len(missing), CAPTIONS_FILE), file=sys.stderr)
        for k in missing[:10]:
            print("  %s" % k, file=sys.stderr)

    if flat_warnings:
        print("", file=sys.stderr)
        for w in flat_warnings:
            print("warning: %s" % w, file=sys.stderr)


if __name__ == "__main__":
    main()
