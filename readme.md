## Mini Stealth - A Scaled Down Stealthburner

![Size Comparison](/Mini_Stealth_Stealthburner_Size_Comparison.png)

This is the Version 2 release of the Mini Stealth toolhead. It is about 5/8 the size of the official Stealthburner and weighs considerably less. It uses a pair of 4010 blowers for part cooling and a 3010 fan for the hotend. The blowers use glued in [air guides](https://www.teamfdm.com/forums/topic/1886-vorpal-180-a-printed-printer/?do=findComment&comment=13431&_rid=1756) to increase airflow by [about 20%](https://www.teamfdm.com/forums/topic/1886-vorpal-180-a-printed-printer/?do=findComment&comment=13566&_rid=1756) compared to the Mini Stealth v1. This toolhead was entirely designed in 󰂫 Blender and I only have mesh files available.

The new design mounts the extruder and hotend to a *[core piece](https://www.teamfdm.com/forums/topic/1886-vorpal-180-a-printed-printer/?do=findComment&comment=15428&_rid=1756)* and mounts the blowers, hotend fan and LEDs into the *shroud* that slides onto the core. This makes assembly and maintenance much easier and the extruder can be fully removed while the core remains installed on the printer. There are four main extruder groups supported by the Mini Stealth.

| [Orbiter 1.5](https://www.teamfdm.com/files/file/606-mini-stealth-orbiter-15/ "Supported here") | [Orbiter 2.0](https://www.teamfdm.com/files/file/612-mini-stealth-orbiter-20/ "Supported here") | [Sherpa Mini](https://www.teamfdm.com/files/file/657-mini-stealth-mini-sherpa/ "Supported here") | [LGX Lite](https://www.teamfdm.com/files/file/616-mini-stealth-lgx-lite/ "Supported here") |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
|                                                                                | + filament sensor                                                              | Sherpa Micro ¹                                                                  | VzHextrudort                                                              |
|                                                                                | Galileo SA                                                                     | ProtoXtruder                                                                    | Hummingbird                                                               |

¹ <small>The Sherpa Micro has a different mounting hole pattern and has its own set of *core pieces*</small>

There are currently 17 different hotends supported by this toolhead.

| Dropeffect XG                 | Creality Spider Pro       | Bambu Lab X1             |
|:-----------------------------:|:-------------------------:|:------------------------:|
| Slice Mosquito                | Nitram VolcoMosq          | Revo Voron               |
| Phaetus Rapido                | Phaetus Rapido UHF        | Phaetus Dragon UHF       |
| Triangle Labs T-Vocano Dragon | Triangle Labs CHCB-V V6DM | Triangle Labs Dragon ACE |
| Phaetus Dragon ST/HF          | Triangle Labs TCHC TD6S   | Phaetus Dragonfly BMS7   |
| Phaetus Dragonfly BMS6        | Phaetus Dragonfly BMO     |                          |

Here is an example of how the core and shroud are assembled. There are pockets for 3x6mm magnets but I have found that they aren't really needed as the slot has a nice friction fit with the layer lines giving extra grip. Also, if the magnets aren't seated completly flush, they will prevent the shroud from seating in the correct location.

![Mini Stealth Split](/Mini_Stealth_v2.0_Split.png)

Looking closely you can see three M3 shim washers (DIN988) stacked under each of the M3x40 BHC screws securing the core to the [DAB x-carriage](https://www.teamfdm.com/files/file/760-mini-stealth-dab-beta-release/). Some component combinations will require these shims, such as with the MGN9 mod on a V0.1/2 in order to avoid crushing the linear carriage when installing. It is best practice to do a dry-run and measure clearances before final installation.

The .stl files in the Common_Parts folder should be compatible across the entire range of Mini Stealth versions. This includes all of the x-carriage options (DAB as well) and supplemental parts such as LED mounts and diffuser.

I still need to work up new assembly instructions for this v2 toolhead. For supporting these designs, I am most active over on [TeamFDM.com](https://www.teamfdm.com/profile/1756-atrushing/content/?type=downloads_file&change_section=1) and will be happy to [answer questions](https://www.teamfdm.com/forums/topic/3433-mini-stealth-v2-is-available) there. The Mini Stealth files available on TeamFDM are of the version 1 release, while the current v2 files are all here.

If you would like to [support](https://paypal.me/atrushing) the development of these mods I would be very grateful.
