# Static deployment; no external dependencies or paid APIs.
from pathlib import Path
import shutil, struct, zlib
out=Path("dist")
out.mkdir(exist_ok=True)
for name in ("index.html","manifest.webmanifest","sw.js"):
    shutil.copyfile(name,out/name)
# Generate the green app mark in both required PWA sizes.
def chunk(tag, data):
    return struct.pack(">I",len(data))+tag+data+struct.pack(">I",zlib.crc32(tag+data)&0xffffffff)
def icon(n):
    rows=[]
    for y in range(n):
        row=bytearray([0])
        for x in range(n):
            u,v=(x+.5)/n,(y+.5)/n
            dx,dy=abs(u-.5),abs(v-.5)
            rounded=(max(dx-.28,0)**2+max(dy-.28,0)**2)<=.15**2
            star=(dx/.22)**.65+(dy/.22)**.65<1
            color=(21,23,25) if not rounded or star else (198,255,114)
            row.extend(color)
        rows.append(bytes(row))
    data=b"\x89PNG\r\n\x1a\n"+chunk(b"IHDR",struct.pack(">IIBBBBB",n,n,8,2,0,0,0))+chunk(b"IDAT",zlib.compress(b"".join(rows)))+chunk(b"IEND",b"")
    (out/f"icon-{n}.png").write_bytes(data)
for n in (192,512): icon(n)
shutil.copytree("v2",out/"v2",dirs_exist_ok=True,ignore=shutil.ignore_patterns("tests.mjs","QA.md"))
print("Viral Studio Pro development: legacy and modular V2 assets ready")
