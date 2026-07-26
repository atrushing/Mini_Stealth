# TriangleLab TBG-Lite

Support for the TriangleLab TBG-Lite extruder (Right-hand version) on the
Mini Stealth toolhead. Fit-verified on a Voron V0.2 with a Dragonfly BMO
hotend and a KNOMI V2 display.

The TBG-Lite is Sherpa-style but larger: 43.5mm wide x 48.9mm tall body,
LDO-36STH17 round pancake motor (same flange as LGX-Lite), a 3-screw
mounting triangle unique to this extruder, and a full right-side door that
swings open (top-down, to the right) on a tension thumbscrew.

## What's here

| File | Status |
|---|---|
| `TBG_Lite_Mounting_Adaptor_Plate_Right.stl` | **Fit-verified** on hardware |
| `TBG_Lite_Mounting_Adaptor_Plate_Left.stl` | Untested — see Left-hand note |
| `Shrouds/3010 Hotend Fan/Standard/[a]_MiniStealth_Shroud_TbgLite_Knomi2.stl` | **Fit-verified** on hardware |

## Reused stock parts (print from LGX_Lite / Common_Parts)

- Core: `Extruders/LGX_Lite/Cores/` for your hotend (verified with
  `MiniStealth_Core_LgxLite_Dragonfly_BMO`)
- Motor bridge: `LGX_Lite_Motor_Bridge_*` — mounts on the motor flange, and
  the TBG-Lite uses the same LDO 36STH round-motor bolt pattern
- Cable door: `LGX_Lite_Cable_Door`
- Do NOT use the LGX tension selector arm — the TBG-Lite has its own
  thumbscrew tensioner
- X-carriage / XY joint uppers / gantry parts from `Common_Parts/` as for
  any Mini Stealth install

## Mounting plate

- 3x **M3x8 BHCS** from below through the plate into the TBG-Lite base
  (the extruder's own inserts). Two screws pass through 3mm plate sections,
  one through the 5mm rib — if the rib-zone screw feels short on thread
  engagement, use M3x10 there.
- **Orientation matters and is self-enforcing**: the FLAT face of the plate
  goes against the extruder base; the stepped/ribbed face goes down toward
  the core. The rib + ear bosses are the core contact patches; the recessed
  regions form ~2mm wire channels beneath the plate. If you flip it, one of
  the three screws clamps across an air gap and bows the plate.
- Mount pattern (for reference / remixes), relative to the filament bore,
  in plate coordinates: A(+10.45, +2.00), B(-8.00, -4.50), C(-8.00, +4.50),
  M3 clearance Ø3.2.

## Shroud (how it differs from the LGX shroud, for regeneration in source)

The provided STL was produced from `[a]_MiniStealth_Shroud_LgxLite_Knomi2`
with two modifications; the numbers below allow a clean regeneration in the
source .blend, which is the better long-term artifact:

1. **Hood raised 15.7mm**: single "waist" cut on the plain band between the
   Knomi bezel bottom and the logo vents (y ~49.5mm below the hood rim in
   the stock STL frame); everything hood-side of the cut (crown, walls,
   Knomi pod) translated up 15.7mm rigidly, walls lofted across the gap.
   (15.7 = TBG body height over LGX (10.7) + adaptor plate thickness (5.0).)
2. **Door-side wall opened**: the side wall on the extruder's door side
   (opposite the motor) removed from the waist line to the rim, full depth
   behind the front face, stopping 0.6mm short of the Knomi bezel. The
   TBG-Lite's entire right side swings open for loading/service and the
   thumbscrew needs finger access — this side of the hood must stay open.

The provided STL is a voxel-remeshed watertight solid (single manifold
shell) — it slices deterministically but is heavier (~17MB) than the other
STLs in this repo. Regeneration from source would produce a lighter file.

Standard (no Knomi) and Knomi1 variants follow the same two modifications
on their respective base shrouds and can be added on request.

## Left-hand TBG-Lite

The Left plate mirrors the mount triangle (B/C line at 8.05mm per the
Left-hand CAD) and is included for completeness, but a Left-hand build also
mirrors the motor and door sides, which needs a mirrored shroud — and the
core's front mounting-pilot pattern is not symmetric, so a simple mirror
does not mate. Left-hand support needs work in the source assembly; the
plate alone is not sufficient. Untested.

## Fit notes from the verified build

- Body seats snug in the raised hood with the plate installed; filament
  path aligns with the hotend once fully seated.
- TBG front face sits ~5.4mm further forward than the LGX-Lite — the raised
  hood accommodates this; no shroud-depth modification was needed.
- KNOMI V2 pod position is stock (rides up with the hood).
