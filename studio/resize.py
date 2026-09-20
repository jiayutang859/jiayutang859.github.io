#!/usr/bin/env python3
"""
Turns camera-resolution exports into web-sized ones.

Originals are MOVED to _originals/<gallery>/ (gitignored, stays on your Mac).
A resized copy is written back into img/<gallery>/ under the same filename, so
build.py and every existing link keep working. Nothing is ever deleted.

    python3 resize.py            # process anything not already done
    python3 resize.py --check    # report only, change nothing

Requires Pillow:  pip3 install Pillow
"""

import os
import shutil
import sys

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow is not installed. Run:  pip3 install Pillow")

IMG_DIR = "img"
ORIG_DIR = "_originals"
EXTS = (".jpg", ".jpeg")

LONG_EDGE = 2400   # px on the longest side
QUALITY = 80       # JPEG quality
MAX_MB = 1.8       # a 2400px q80 frame lands well under this


def needs_work(path):
    """A file needs processing if it's oversized in pixels OR in bytes.

    Checking bytes alone misses a heavily-compressed 4800px export; checking
    pixels alone misses a 2400px file saved at quality 100.
    """
    if os.path.getsize(path) > MAX_MB * 1024 * 1024:
        return True
    try:
        with Image.open(path) as im:
            return max(im.size) > LONG_EDGE
    except Exception:
        return False


def human(n):
    return "%.1f MB" % (n / 1024 / 1024)


def process(src_path, dest_path):
    """Resize src_path into dest_path. Returns (before, after) byte sizes."""
    before = os.path.getsize(src_path)

    with Image.open(src_path) as im:
        exif = im.info.get("exif")
        icc = im.info.get("icc_profile")

        # Honour the orientation flag now, so the saved file needs no flag.
        im = ImageOps.exif_transpose(im)

        if im.mode not in ("RGB", "L"):
            im = im.convert("RGB")

        w, h = im.size
        if max(w, h) > LONG_EDGE:
            scale = LONG_EDGE / max(w, h)
            im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)

        save_args = {
            "format": "JPEG",
            "quality": QUALITY,
            "optimize": True,
            "progressive": True,
            "subsampling": "4:2:0",
        }
        if exif:
            save_args["exif"] = exif
        if icc:
            save_args["icc_profile"] = icc

        im.save(dest_path, **save_args)

    return before, os.path.getsize(dest_path)


def main():
    check_only = "--check" in sys.argv

    if not os.path.isdir(IMG_DIR):
        sys.exit("No %s/ folder here. Run this from the repo root." % IMG_DIR)

    galleries = sorted(d for d in os.listdir(IMG_DIR)
                       if os.path.isdir(os.path.join(IMG_DIR, d))
                       and not d.startswith("."))

    total_before = total_after = 0
    done = skipped = 0

    for gallery in galleries:
        folder = os.path.join(IMG_DIR, gallery)
        keep = os.path.join(ORIG_DIR, gallery)
        names = sorted(f for f in os.listdir(folder)
                       if f.lower().endswith(EXTS) and not f.startswith("."))

        for name in names:
            path = os.path.join(folder, name)
            size = os.path.getsize(path)

            if not needs_work(path):
                skipped += 1
                continue

            if check_only:
                print("would resize  %s/%s  (%s)" % (gallery, name, human(size)))
                total_before += size
                done += 1
                continue

            os.makedirs(keep, exist_ok=True)
            stored = os.path.join(keep, name)
            if os.path.exists(stored):
                # Already have an original under this name; don't clobber it.
                print("skip (original already stored): %s/%s" % (gallery, name),
                      file=sys.stderr)
                skipped += 1
                continue

            shutil.move(path, stored)
            try:
                before, after = process(stored, path)
            except Exception as exc:
                shutil.move(stored, path)   # put it back, leave nothing broken
                print("FAILED %s/%s: %s" % (gallery, name, exc), file=sys.stderr)
                continue

            total_before += before
            total_after += after
            done += 1
            print("%-34s %9s -> %8s" % ("%s/%s" % (gallery, name),
                                        human(before), human(after)))

    print("")
    if check_only:
        print("%d file(s) would be resized, %d already web-sized (%s to process)"
              % (done, skipped, human(total_before)))
        return

    if done:
        print("Resized %d file(s): %s -> %s" % (done, human(total_before), human(total_after)))
        print("Originals moved to %s/ (gitignored)." % ORIG_DIR)
        print("Now run:  python3 build.py")
    else:
        print("Nothing to do — all %d file(s) are already web-sized." % skipped)


if __name__ == "__main__":
    main()
