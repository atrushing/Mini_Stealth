// ============================================================
//  Mini Stealth Configurator – script.js
// ============================================================

// ---------- FILE PATTERNS (placeholder – swap for real paths) ----------
const F = {
    v0: (rail, xstop, ver) => `Common_Parts/V0_x-carriages/${rail}${xstop ? "_Xstop" : ""}.stl`,
    v0_joint: (ver) => `Common_Parts/V0_x-carriages/XY_Joint_${ver === 1 ? "L" : "R"}.stl`,
    v0_spacer: () => `Common_Parts/V0_x-carriages/Gantry_NoDrop_Nut_Spacer.stl`,
    v24: (style) => style === "rigid"
        ? `Common_Parts/MGN12H_Front_Rigid/V24_Rigid_Carriage.stl`
        : `Common_Parts/V2.4/V24_Standard_Carriage.stl`,
    v24_dab: () => `Common_Parts/V2.4/V24_DAB_Carriage.stl`,
    switchwire: (style) => style === "dab"
        ? `Common_Parts/Switchwire/SW_DAB_Carriage.stl`
        : `Common_Parts/Switchwire/SW_Standard_Carriage.stl`,
    legacy: () => `Common_Parts/Legacy/Legacy_Carriage.stl`,
    micron: (style) => `Common_Parts/Micron/Micron_${style}_Carriage.stl`,
    sovol: () => `Common_Parts/Sovol/Sovol_Carriage.stl`,
    prusa: () => `Common_Parts/Prusa/Prusa_Carriage.stl`,
    tinym: () => `Common_Parts/TinyM/TinyM_Carriage.stl`,
    e3: (rail) => `Common_Parts/Ender3/E3_${rail}_Carriage.stl`,
    generic: (rail) => `Common_Parts/Generic/${rail}_Rigid_Carriage.stl`,
    core: (code, hotend, rigid) => rigid
        ? `Extruders/${code}/Cores/Alternate_Rigid/MiniStealth_Core_${code}_${hotend}_Rigid.stl`
        : `Extruders/${code}/Cores/MiniStealth_Core_${code}_${hotend}.stl`,
    adapter: (name, v2) => `Extruders/${name}/${name}_Mounting_Adapter_Plate${v2 ? "_v2" : ""}.stl`,
    shroud: (code, flavor, tier, probeVar) =>
        `Extruders/${code}/Shrouds/${flavor}${tier !== "Std" ? "_" + tier : ""}_${probeVar}.stl`,
    mellowfly_pcb: (code) => `Extruders/${code}/Shrouds/MellowFly_PCB_Holder.stl`,
    fan: (code, size) => `Extruders/${code}/Fans/${size}_Fan_Duct.stl`,
    bridge: (code, type) => `Extruders/${code}/Bridge/${type}.stl`,
    chain: (code, holes) => `Extruders/${code}/Bridge/CableChain_${holes}Hole.stl`,
    led: (type) => `Common_Parts/${type}.stl`,
    blower: () => `Common_Parts/Blower_guide_x2.stl`,
    glue: () => `Common_Parts/Blower_guide_gluing_tool_M3x20.stl`,
    diffuser: () => `Common_Parts/Status_LED_logo_diffuser.stl`,
    probeRetainer: () => `Common_Parts/probe_retainer_bracket_10.5mm.stl`,
};

// ---------- DATA ----------

const PRINTERS = [
    { id: 1,  label: "Voron V0.1",       key: "v0",         rigid: false },
    { id: 2,  label: "Voron V0.2",       key: "v0",         rigid: false },
    { id: 3,  label: "Voron V2.4",       key: "v24",        rigid: false },
    { id: 4,  label: "Voron Trident",    key: "v24",        rigid: false },
    { id: 5,  label: "Voron Switchwire", key: "switchwire", rigid: false },
    { id: 6,  label: "Voron Legacy",     key: "legacy",     rigid: true  },
    { id: 7,  label: "PforAnts Micron",  key: "micron",     rigid: false },
    { id: 8,  label: "Sovol SV06",       key: "sovol",      rigid: true  },
    { id: 9,  label: "Prusa MK3",        key: "prusa",      rigid: true  },
    { id: 10, label: "Tiny M",           key: "tinym",      rigid: true  },
    { id: 11, label: "Ender-3",          key: "e3",         rigid: false },
    { id: 12, label: "Generic (Rigid)",  key: "generic",    rigid: true  },
];

const CARRIAGE_OPTIONS = {
    v0:         [{ id: "mgn7", label: "MGN7" }, { id: "mgn9", label: "MGN9" }],
    v24:        [{ id: "standard", label: "Standard" }, { id: "rigid", label: "Rigid" }, { id: "dab", label: "DAB" }],
    switchwire: [{ id: "standard", label: "Standard" }, { id: "dab", label: "DAB" }],
        legacy:     [{ id: "default", label: "Standard" }],
        micron:     [{ id: "standard", label: "Standard" }, { id: "beacon", label: "Beacon3D" }, { id: "boop", label: "Boop beta4" }],
        sovol:      [{ id: "default", label: "Standard" }],
        prusa:      [{ id: "default", label: "Standard" }],
        tinym:      [{ id: "default", label: "Standard" }],
        e3:         [
            { id: "std", label: "Standard" },
            { id: "mgn9h_f", label: "MGN9H Front" },
            { id: "mgn9h_t", label: "MGN9H Top" },
            { id: "mgn12h_f", label: "MGN12H Front" },
            { id: "mgn12h_t", label: "MGN12H Top" },
        ],
        generic:    [
            { id: "mgn9c", label: "MGN9C" },
            { id: "mgn9h", label: "MGN9H" },
            { id: "mgn12c", label: "MGN12C" },
            { id: "mgn12h", label: "MGN12H" },
        ],
};

const V0_XSTOP = [{ id: "xstop", label: "With X-Stop" }, { id: "noxstop", label: "No X-Stop" }];

const EXTRUDERS = [
    { id: 1,  label: "Orbiter 1.5", code: "Orb1.5", folder: "Orbiter_1.5",  family: "Orb1.5" },
    { id: 2,  label: "Orbiter 2.0", code: "Orb2.0", folder: "Orbiter2.0",  family: "Orb2.0" },
    { id: 3,  label: "Orbiter 2.0 w/ Filament Sensor", code: "Orb2.0", folder: "Orbiter_2.0_Filament_Sensor",  family: "Orb2.0" },
    { id: 4, label: "Galileo 2 SA", code: "GalileoSA", folder: "Galileo2_SA", family: "Orb2.0" },
    { id: 5,  label: "WristWatch BMG", code: "Orb2.0", folder: "WristWatch_BMG",  family: "Orb2.0" },
    { id: 6,  label: "WristWatch G2SA", code: "Orb2.0", folder: "WristWatch_G2SA",  family: "Orb2.0" },
    { id: 7,  label: "WristWatch Orb2.0", code: "Orb2.0", folder: "WristWatch_ORB2x",  family: "Orb2.0" },
    { id: 8,  label: "LGX Lite", code: "LgxLite", family: "LgxLite", folder: "LGX_Lite", adapter: "LgxLite" },
    { id: 9,  label: "Hummingbird", code: "LgxLite", family: "LgxLite", folder: "Hummingbird", adapter: "Hummingbird" },
    { id: 10, label: "VzHEX", code: "LgxLite", folder: "Vz-HextrudORT_CNC", family: "LgxLite", adapter: "VzHEX" },
    { id: 11, label: "Creality K1", code: "LgxLite", folder: "Creality K1", family: "LgxLite", adapter: "CrealityK1", adapterV2: true },
    { id: 12, label: "Sherpa Mini", code: "SherpaMini", folder: "Sherpa_Mini", family: "SherpaMini" },
    { id: 13, label: "HGX Lite", code: "SherpaMini", folder: "HGX_Lite", family: "SherpaMini" },
    { id: 14, label: "ProtoXtruder", code: "SherpaMini", folder: "ProtoXtruder", family: "SherpaMini" },
    { id: 15, label: "Sherpa Micro", code: "SherpaMicro", folder: "Sherpa_Micro", family: "SherpaMicro" },
    { id: 16, label: "Sherpa Micro Mirrored", code: "SherpaMicro_Mirrored", folder: "Sherpa_Micro_Mirrored", family: "SherpaMicro_Mirrored" },
];

const HOTENDS = [
    { id: 1,  label: "Revo Voron",                 core: "Revo",   tier: "Std" },
    { id: 2,  label: "Phaetus Dragon ST/HF",       core: "Dragon", tier: "Std" },
    { id: 3,  label: "Phaetus Dragon UHF",         core: "Rapido", tier: "UHF" },
    { id: 4,  label: "Phaetus Dragonfly BMO",      core: "BMO",    tier: "Std" },
    { id: 5,  label: "Phaetus Dragonfly BMS6",     core: "BMS6",   tier: "Std" },
    { id: 6,  label: "Phaetus Dragonfly BMS7",     core: "BMS7",   tier: "Std" },
    { id: 7,  label: "Phaetus Rapido",             core: "Rapido", tier: "Std" },
    { id: 8,  label: "Phaetus Rapido UHF",         core: "Rapido", tier: "UHF" },
    { id: 9,  label: "Slice Mosquito",             core: "Mosq",   tier: "Std" },
    { id: 10, label: "Nitram VolcoMosq",           core: "Mosq",   tier: "UHF" },
    { id: 11, label: "Mellow NF Crazy Volcano",    core: "Mosq",   tier: "UHF" },
    { id: 12, label: "Triangle Labs TZ V6",        core: "Dragon", tier: "Std" },
    { id: 13, label: "T-Volcano Dragon",           core: "Rapido", tier: "Std" },
    { id: 14, label: "CHCB-V V6DM",                core: "Rapido", tier: "Std" },
    { id: 15, label: "TCHC TD6S",                  core: "TD6S",   tier: "Std" },
    { id: 16, label: "Ancufy CHC-V6",              core: "TD6S",   tier: "Std" },
    { id: 17, label: "Triangle Labs Dragon ACE",   core: "ACE",    tier: "Std" },
    { id: 18, label: "DropEffect neXtG",           core: "Dragon", tier: "Std" },
    { id: 19, label: "DropEffect neXtG UHF",       core: "Rapido", tier: "UHF" },
    { id: 20, label: "DropEffect XG",              core: "XG",     tier: "Std" },
    { id: 21, label: "Bambu Lab X1",               core: "Bambu",  tier: "Std" },
    { id: 22, label: "Creality K1",                core: "K1",     tier: "UHF" },
    { id: 23, label: "Creality Spider Pro",        core: "Spider", tier: "Std" },
    { id: 24, label: "E3D V6 compatible",          core: "V6",     tier: "UHF" },
    { id: 25, label: "Goliath",                    core: "ACE",    tier: "Goliath" },
];

const SHROUDS = [
    { id: "standard",  label: "Standard",       flavor: "Standard" },
    { id: "croptop",   label: "CropTop",        flavor: "CropTop" },
    { id: "knomi",     label: "Knomi",          flavor: "Knomi" },
    { id: "knomi2",    label: "Knomi2",         flavor: "Knomi2" },
    { id: "mellowfly", label: "MellowFly Halo", flavor: "Knomi2", pcb: true },
];

const FANS = [
    { id: "3010", label: "3010" },
    { id: "2510", label: "2510" },
];

const PROBE_OPTIONS = {
    v0:         [{ id: "none", label: "None" }, { id: "zeroclick", label: "ZeroClick" }, { id: "pl", label: "ProbeLeft" }, { id: "pr", label: "ProbeRight" }],
    v24:        [{ id: "none", label: "None" }, { id: "pl", label: "ProbeLeft" }, { id: "pr", label: "ProbeRight" },
        { id: "omron", label: "Omron" }, { id: "eddy", label: "BTT Eddy" }, { id: "klicky", label: "Klicky" },
        { id: "pinda", label: "PINDA" }, { id: "micro", label: "MicroProbe" }, { id: "beacon", label: "Beacon3D" },
        { id: "carto", label: "Cartographer" }, { id: "euclid", label: "Euclid" }, { id: "diffir", label: "Differential IR" }, { id: "bltouch", label: "BL-Touch" }],
    switchwire: [{ id: "none", label: "None" }, { id: "pl", label: "ProbeLeft" }, { id: "pr", label: "ProbeRight" },
        { id: "omron", label: "Omron" }, { id: "eddy", label: "BTT Eddy" }, { id: "klicky", label: "Klicky" },
        { id: "pinda", label: "PINDA" }, { id: "micro", label: "MicroProbe" }, { id: "beacon", label: "Beacon3D" },
        { id: "carto", label: "Cartographer" }, { id: "euclid", label: "Euclid" }, { id: "diffir", label: "Differential IR" }, { id: "bltouch", label: "BL-Touch" }],
    legacy:     [{ id: "none", label: "None" }, { id: "pl", label: "ProbeLeft" }, { id: "pr", label: "ProbeRight" },
        { id: "omron", label: "Omron" }, { id: "klicky", label: "Klicky" }, { id: "eddy", label: "BTT Eddy" }],
    micron:     [{ id: "none", label: "None" }, { id: "pl", label: "ProbeLeft" }, { id: "pr", label: "ProbeRight" }],
    sovol:      [{ id: "none", label: "None" }, { id: "pinda", label: "PINDA" }],
    prusa:      [{ id: "none", label: "None" }, { id: "pinda", label: "PINDA" }],
    tinym:      [{ id: "none", label: "None" }],
    e3:         [{ id: "none", label: "None" }, { id: "pl", label: "ProbeLeft" }, { id: "pr", label: "ProbeRight" }],
    generic:    [{ id: "none", label: "None" }, { id: "pl", label: "ProbeLeft" }, { id: "pr", label: "ProbeRight" },
        { id: "omron", label: "Omron" }, { id: "eddy", label: "BTT Eddy" }, { id: "klicky", label: "Klicky" },
        { id: "pinda", label: "PINDA" }, { id: "micro", label: "MicroProbe" }, { id: "beacon", label: "Beacon3D" },
        { id: "carto", label: "Cartographer" }, { id: "euclid", label: "Euclid" }, { id: "diffir", label: "Differential IR" }, { id: "bltouch", label: "BL-Touch" }],
};

const E3_PROBE_BY_RAIL = {
    std:       ["none", "pl", "pr"],
    mgn9h_f:   ["none", "pl", "pr", "beacon", "micro"],
    mgn9h_t:   ["none", "pl", "pr"],
    mgn12h_f:  ["none", "pl", "pr", "beacon", "micro"],
    mgn12h_t:  ["none", "pl", "pr"],
};

const PROBE_BRACKETS = [
    { id: "micro",    label: "MicroProbe" },
    { id: "bltouch",  label: "BL-Touch" },
    { id: "eddy",     label: "BTT Eddy" },
    { id: "crtouch",  label: "CR-Touch" },
    { id: "diffir",   label: "Differential IR" },
    { id: "pinda",    label: "PINDA" },
];

// ---------- PROBE COMPATIBILITY CHARTS ----------
const probeCompatMgn9Rigid = {
    Std:     { omron: 1, eddy: 0, klicky: 1, pinda: 1, micro: 1, beacon: 1, carto: 1, euclid: 1, diffir: 1, bltouch: 0 },
    UHF:     { omron: 1, eddy: 0, klicky: 1, pinda: 1, micro: 1, beacon: 1, carto: 1, euclid: 1, diffir: 1, bltouch: 0 },
    Goliath: { omron: 1, eddy: 1, klicky: 1, pinda: 1, micro: 1, beacon: 1, carto: 1, euclid: 1, diffir: 1, bltouch: 1 },
};
const probeCompatMgn12Rigid = {
    Std:     { omron: 1, eddy: 0, klicky: 1, pinda: 1, micro: 1, beacon: 1, carto: 1, euclid: 1, diffir: 1, bltouch: 0 },
    UHF:     { omron: 1, eddy: 0, klicky: 1, pinda: 1, micro: 1, beacon: 1, carto: 1, euclid: 1, diffir: 1, bltouch: 0 },
    Goliath: { omron: 1, eddy: 1, klicky: 1, pinda: 1, micro: 1, beacon: 1, carto: 1, euclid: 1, diffir: 1, bltouch: 1 },
};
const probeCompatV24 = {
    Std:     { omron: 1, eddy: 1, klicky: 1, pinda: 1, micro: 1, beacon: 1, carto: 1, euclid: 1, diffir: 1, bltouch: 1 },
    UHF:     { omron: 1, eddy: 1, klicky: 1, pinda: 1, micro: 1, beacon: 1, carto: 1, euclid: 1, diffir: 1, bltouch: 1 },
    Goliath: { omron: 1, eddy: 1, klicky: 1, pinda: 1, micro: 1, beacon: 1, carto: 1, euclid: 1, diffir: 1, bltouch: 1 },
};
const probeCompatSwitchwire = {
    Std:     { omron: 1, eddy: 1, klicky: 1, pinda: 1, micro: 1, beacon: 1, carto: 1, euclid: 1, diffir: 1, bltouch: 1 },
    UHF:     { omron: 1, eddy: 1, klicky: 1, pinda: 1, micro: 1, beacon: 1, carto: 1, euclid: 1, diffir: 1, bltouch: 1 },
    Goliath: { omron: 1, eddy: 0, klicky: 0, pinda: 0, micro: 0, beacon: 0, carto: 0, euclid: 0, diffir: 0, bltouch: 0 },
};

function getCompatChart(pk, style) {
    if (pk === "generic") {
        if (style === "mgn9c" || style === "mgn9h") return probeCompatMgn9Rigid;
        if (style === "mgn12c" || style === "mgn12h") return probeCompatMgn12Rigid;
    }
    if (pk === "v24") {
        if (style === "rigid") return probeCompatMgn12Rigid;
        return probeCompatV24;
    }
    if (pk === "switchwire") return probeCompatSwitchwire;
    return null;
}

const BRIDGES = [
    { id: "umbilical", label: "Umbilical PCB" },
    { id: "chain",     label: "Cable Chain" },
    { id: "high",      label: "High Strain Relief" },
    { id: "low",       label: "Low Strain Relief" },
];
const CHAIN_HOLES = [
    { id: "2h", label: "2-Hole" },
    { id: "3h", label: "3-Hole" },
];
const CHAIN_PRINTERS = ["v24", "switchwire"];

const LEDS = [
    { id: "status", label: "NeoPixel" },
    { id: "barf",   label: "Rainbow Barf" },
];

// ---------- STATE ----------
const S = {
    printer: 0, carriage: 0, v0xstop: 0, dabXstop: 0,
    extruder: 0, hotend: 0,
    shroud: 0, fan: 0,
    probe: 0, probeBracket: 0,
    bridge: 0, chainHoles: 0,
    led: 0,
};

// ---------- HELPERS ----------
function $(id) { return document.getElementById(id); }
function show(id) { const el = $(id); if (el) el.classList.remove("hidden"); }
function hide(id) { const el = $(id); if (el) el.classList.add("hidden"); }

function renderOptions(containerId, items, selectedIdx, onPick, disabledFn) {
    const c = $(containerId);
    c.innerHTML = "";
    items.forEach((item, i) => {
        const d = document.createElement("div");
        d.className = "opt" + (i + 1 === selectedIdx ? " selected" : "")
        + (disabledFn && disabledFn(item) ? " disabled" : "");
        d.textContent = item.label;
        d.dataset.preview = item.preview || "";
        d.onclick = () => { if (!d.classList.contains("disabled")) onPick(i + 1, item); };
        c.appendChild(d);
    });
}

// ---------- DERIVED VALUES ----------
function printerKey()   { return S.printer ? PRINTERS[S.printer - 1].key : null; }
function printerRigid() { return S.printer ? PRINTERS[S.printer - 1].rigid : false; }
function carriageStyle() {
    if (!S.carriage) return null;
    const opts = CARRIAGE_OPTIONS[printerKey()];
    return opts ? opts[S.carriage - 1].id : null;
}
function isRigid() {
    if (printerRigid()) return true;
    const style = carriageStyle();
    return style === "rigid" || style === "dab";
}
function extruderData() { return S.extruder ? EXTRUDERS[S.extruder - 1] : null; }
function hotendData()   { return S.hotend ? HOTENDS[S.hotend - 1] : null; }
function tier()         { return hotendData() ? hotendData().tier : null; }

// ---------- SECTION VISIBILITY & LOGIC ----------
function update() {
    const pk = printerKey();
    const style = carriageStyle();
    const ext = extruderData();
    const hot = hotendData();
    const t = tier();

    // --- Printer (always visible) ---
    renderOptions("opt-printer", PRINTERS, S.printer, (idx) => {
        S.printer = idx;
        S.carriage = 0; S.v0xstop = 0;
        S.probe = 0; S.probeBracket = 0;
        S.bridge = 0; S.chainHoles = 0;
        S.dabZstop = 0;
        update();
    });

    // --- X-Carriage ---
    if (pk) {
        const opts = CARRIAGE_OPTIONS[pk] || [];
        if (opts.length === 1) {
            // Single option: auto-select, hide section
            S.carriage = 1;
            hide("sec-carriage");
        } else {
            show("sec-carriage");
            renderOptions("opt-carriage", opts, S.carriage, (idx) => {
                S.carriage = idx;
                S.v0xstop = 0;
                S.probe = 0; S.probeBracket = 0;
                S.dabZstop = 0;
                update();
            });

            // V0 x-stop sub-row
            if (pk === "v0" && S.carriage) {
                let row = $("v0-xstop-row");
                if (!row) {
                    row = document.createElement("div");
                    row.id = "v0-xstop-row";
                    row.className = "options";
                    row.style.marginTop = ".5rem";
                    $("sec-carriage").appendChild(row);
                }
                row.innerHTML = "";
                V0_XSTOP.forEach((item, i) => {
                    const d = document.createElement("div");
                    d.className = "opt" + (S.v0xstop === i + 1 ? " selected" : "");
                    d.textContent = item.label;
                    d.onclick = () => { S.v0xstop = i + 1; update(); };
                    row.appendChild(d);
                });
            } else {
                const row = $("v0-xstop-row");
                if (row) row.remove();
            }
        }
    } else {
        hide("sec-carriage");
    }

    // DAB Z-stop sub-row (V2.4/Trident only)
    if (pk === "v24" && style === "dab") {
        let row = $("dab-xstop-row");
        if (!row) {
            row = document.createElement("div");
            row.id = "dab-xstop-row";
            row.className = "options";
            row.style.marginTop = ".5rem";
            $("sec-carriage").appendChild(row);
        }
        row.innerHTML = "";
        const DAB_XSTOP = [
            { id: "xstop",    label: "X-endstop on X-Carriage" },
            { id: "gantry",   label: "X-endstop on Gantry" },
            { id: "none",     label: "None" },
        ];
        DAB_XSTOP.forEach((item, i) => {
            const d = document.createElement("div");
            d.className = "opt" + (S.dabXstop === i + 1 ? " selected" : "");
            d.textContent = item.label;
            d.onclick = () => { S.dabXstop = i + 1; update(); };
            row.appendChild(d);
        });
    } else {
        const row = $("dab-xstop-row");
        if (row) row.remove();
    }

    // --- Hotend (always visible) ---
    renderOptions("opt-hotend", HOTENDS, S.hotend, (idx) => {
        S.hotend = idx;
        S.shroud = 0; S.fan = 0;
        update();
    });

    // --- Probe ---
    if (pk && S.carriage && style !== "dab") {
        show("sec-probe");
        const probeOpts = getProbeOptions(pk, style);
        const chart = getCompatChart(pk, style);
        renderOptions("opt-probe", probeOpts, S.probe, (idx) => {
            S.probe = idx;
            S.probeBracket = 0;
            update();
        }, (item) => {
            if (chart && t && item.id !== "none" && item.id !== "pl" && item.id !== "pr" && item.id !== "zeroclick") {
                const compat = chart[t];
                return compat ? !compat[item.id] : false;
            }
            return false;
        });

        // Probe bracket sub-selection
        const probeItem = probeOpts[S.probe - 1];
        if (probeItem && (probeItem.id === "pl" || probeItem.id === "pr")) {
            show("sec-probebracket");
            renderOptions("opt-probebracket", PROBE_BRACKETS, S.probeBracket, (idx) => {
                S.probeBracket = idx;
                update();
            });
        } else {
            hide("sec-probebracket");
        }
    } else {
        hide("sec-probe");
        hide("sec-probebracket");
    }

    // --- Extruder (always visible) ---
    renderOptions("opt-extruder", EXTRUDERS, S.extruder, (idx) => {
        S.extruder = idx;
        update();
    });

    // --- Motor Bridge ---
    if (ext) {
        show("sec-bridge");
        const bridgeOpts = BRIDGES.filter(b => {
            if (b.id === "chain" && !CHAIN_PRINTERS.includes(pk)) return false;
            return true;
        });
        renderOptions("opt-bridge", bridgeOpts, S.bridge, (idx) => {
            S.bridge = idx;
            S.chainHoles = 0;
            update();
        });

        const bridgeItem = bridgeOpts[S.bridge - 1];
        if (bridgeItem && bridgeItem.id === "chain") {
            show("opt-chainholes");
            renderOptions("opt-chainholes", CHAIN_HOLES, S.chainHoles, (idx) => {
                S.chainHoles = idx;
                update();
            });
        } else {
            hide("opt-chainholes");
        }
    } else {
        hide("sec-bridge");
    }

    // --- Shroud ---
    if (hot) {
        show("sec-shroud");
        const shroudOpts = SHROUDS.filter(s => {
            if (t === "Goliath") return s.id === "croptop";
            return true;
        });
        renderOptions("opt-shroud", shroudOpts, S.shroud, (idx) => {
            S.shroud = idx;
            S.fan = 0;
            update();
        });

        // --- Fan ---
        if (S.shroud) {
            show("sec-fan");
            const fanOpts = t === "Goliath" ? FANS.filter(f => f.id === "2510") : FANS;
            renderOptions("opt-fan", fanOpts, S.fan, (idx) => { S.fan = idx; update(); });
        } else {
            hide("sec-fan");
        }
    } else {
        hide("sec-shroud");
        hide("sec-fan");
    }

    // --- LED ---
    if (S.shroud) {
        show("sec-led");
        renderOptions("opt-led", LEDS, S.led, (idx) => { S.led = idx; update(); });
    } else {
        hide("sec-led");
    }

    // --- File list ---
    buildFileList();
}

function getProbeOptions(pk, style) {
    // DAB is the probe itself — no other options
    //if (style === "dab") return [{ id: "none", label: "None" }];

    let base = PROBE_OPTIONS[pk] || [{ id: "none", label: "None" }];
    if (pk === "e3" && style && E3_PROBE_BY_RAIL[style]) {
        const allowed = E3_PROBE_BY_RAIL[style];
        base = base.filter(p => allowed.includes(p.id));
    }
    return base;
}

// ---------- FILE LIST ----------
function buildFileList() {
    const el = $("filelist");
    if (!S.printer || !S.extruder || !S.hotend || !S.shroud) {
        el.classList.add("hidden");
        return;
    }

    const pk = printerKey();
    const style = carriageStyle();
    const ext = extruderData();
    const hot = hotendData();
    const t = tier();
    const rigid = isRigid();

    const probeOpts = getProbeOptions(pk, style);
    const probeItem = probeOpts[S.probe - 1];

    const files = [];
    const add = (cat, fname) => files.push({ cat, file: fname });

    // ─── X-Carriage ───
    if (pk === "v0") {
        const rail = S.carriage === 1 ? "MGN7" : "MGN9";
        const xstop = S.v0xstop === 1;
        add("X-Carriage", F.v0(rail, xstop));
        add("X-Carriage", F.v0_joint(1));
        add("X-Carriage", F.v0_joint(2));
        add("X-Carriage", F.v0_spacer());
    } else if (pk === "v24" || pk === "switchwire" || pk === "generic") {
        if (style === "dab") {
            // DAB files
            if (pk === "v24") {
                add("X-Carriage", "Mini_Stealth_DAB/DAB_Mini_Stealth_v0.8.stl");
                if (S.dabZstop === 1) {
                    add("X-Carriage", "Mini_Stealth_DAB/DAB_Stealthburner_Z_Stop_boss.stl");
                } else if (S.dabZstop === 2) {
                    add("X-Carriage", "Mini_Stealth_DAB/DAB_Stealthburner_Z_Stop_boss_X_Stop.stl");
                } else if (S.dabZstop === 3) {
                    add("X-Carriage", "Mini_Stealth_DAB/DAB_Stealthburner_Z_Stop_boss_GantryPod_X_Stop.stl");
                }
            } else if (pk === "switchwire") {
                add("X-Carriage", "Mini_Stealth_DAB/DAB_Stealthburner_Switchwire_back.stl");
                add("X-Carriage", "Mini_Stealth_DAB/DAB_Stealthburner_Switchwire_front.stl");
            }
        } else {
            // Standard / Rigid x-carriage
            const probeName = probeItem && probeItem.id !== "none" && probeItem.id !== "pl" && probeItem.id !== "pr"
            ? probeItem.label.replace(/[^A-Za-z0-9]/g, "_")
            : "No_Probe";
            let folder, rail;
            if (pk === "v24" && style === "rigid") {
                folder = "Generic_x-carriages";
                rail = "MGN12";
            } else if (pk === "v24") {
                folder = "V2.4_x-carriages";
                rail = "MGN12";
            } else if (pk === "switchwire") {
                folder = "Switchwire_x-carriages";
                rail = "MGN12";
            } else {
                folder = "Generic_x-carriages";
                rail = (style === "mgn9c" || style === "mgn9h") ? "MGN9" : "MGN12";
            }
            add("X-Carriage", `Common_Parts/${folder}/${t}/x_carriage_frames_${probeName}_${t}_${rail}.stl`);
        }
    } else if (pk === "legacy") {
        add("X-Carriage", F.legacy());
    } else if (pk === "micron") {
        add("X-Carriage", F.micron(style || "standard"));
    } else if (pk === "sovol") {
        add("X-Carriage", F.sovol());
    } else if (pk === "prusa") {
        add("X-Carriage", F.prusa());
    } else if (pk === "tinym") {
        add("X-Carriage", F.tinym());
    } else if (pk === "e3") {
        add("X-Carriage", F.e3(style || "std"));
    }

    // Probe retainer (grouped with X-Carriage, not for rigid)
    if (probeItem && !rigid && ["omron", "klicky", "eddy"].includes(probeItem.id)) {
        add("X-Carriage", "Common_Parts/probe_retainer_bracket_10.5mm.stl");
    }

    // ─── Core ───
    if (ext && hot) {
        add("Core", F.core(ext.code, hot.core, rigid));
        if (ext.adapter) {
            add("Core", F.adapter(ext.adapter, ext.adapterV2));
        }
    }

    // ─── Shroud ───
    if (S.shroud && hot) {
        const shroudOpts = SHROUDS.filter(s => {
            if (t === "Goliath") return s.id === "croptop";
            return true;
        });
        const shroudItem = shroudOpts[S.shroud - 1];
        if (shroudItem) {
            const fanSize = S.fan === 1 ? "3010" : "2510";
            const probeVar = probeItem
            ? (probeItem.id === "pl" ? "ProbeLeft" : probeItem.id === "pr" ? "ProbeRight" : probeItem.id === "zeroclick" ? "ZeroClick" : "Standard")
            : "Standard";

            // Shroud file
            let shroudFile;
            if (shroudItem.flavor === "CropTop") {
                shroudFile = `Extruders/${ext.folder}/Shrouds/CropTop/${fanSize} Hotend Fan/[a]_MiniStealth_Shroud_${ext.code}_${probeVar}_CropTop_${t}.stl`;
            } else if (t === "Goliath") {
                shroudFile = `Extruders/${ext.folder}/Shrouds/Goliath/[a]_MiniStealth_Shroud_${ext.code}_CropTop_Goliath.stl`;
            } else {
                shroudFile = `Extruders/${ext.folder}/Shrouds/${fanSize} Hotend Fan/${shroudItem.flavor}/[a]_MiniStealth_Shroud_${ext.code}_${shroudItem.flavor}_${probeVar}.stl`;
            }
            add("Shroud", shroudFile);

            // MellowFly PCB holder
            if (shroudItem.pcb) {
                add("Shroud", F.mellowfly_pcb(ext.code));
            }

            // Cable door (not CropTop)
            if (shroudItem.flavor !== "CropTop") {
                if (shroudItem.pcb) {
                    add("Shroud", `Extruders/${ext.folder}/${ext.code}_Cable_Door_MellowFly.stl`);
                } else {
                    add("Shroud", `Extruders/${ext.folder}/${ext.code}_Cable_Door.stl`);
                }
            }

            // Side-mount probe bracket
            if (S.probeBracket) {
                const bracket = PROBE_BRACKETS[S.probeBracket - 1];
                if (bracket) {
                    add("Shroud", `Common_Parts/Side_Mount_V0_${bracket.id}_bracket.stl`);
                }
            }
        }
    }

    // ─── Fan ───
    if (S.fan && S.shroud) {
        const fanSize = S.fan === 1 ? "3010" : "2510";
        add("Fan", F.fan(ext.code, fanSize));
    }

    // ─── Motor Bridge ───
    if (S.bridge && ext) {
        const bridgeOpts = BRIDGES.filter(b => {
            if (b.id === "chain" && !CHAIN_PRINTERS.includes(pk)) return false;
            return true;
        });
        const bridgeItem = bridgeOpts[S.bridge - 1];
        if (bridgeItem) {
            if (bridgeItem.id === "chain") {
                const holes = S.chainHoles === 1 ? "2hole" : "3hole";
                add("Bridge", `Extruders/${ext.folder}/${ext.code}_Motor_Bridge_CableChain_mount.stl`);
                add("Bridge", `Extruders/${ext.folder}/${ext.code}_CableChain_${holes}_mount.stl`);
            } else if (bridgeItem.id === "umbilical") {
                add("Bridge", `Extruders/${ext.folder}/${ext.code}_Motor_Bridge_UmbilicalPCB_Mount.stl`);
                add("Bridge", `Extruders/${ext.folder}/${ext.code}_UmbilicalPCB_Mount.stl`);
            } else {
                add("Bridge", F.bridge(ext.code, bridgeItem.id === "high" ? "High_Relief" : "Low_Relief"));
            }
        }
    }

    // ─── LED ───
    if (S.led) {
        const led = LEDS[S.led - 1];
        if (led) add("LED", F.led(led.id === "status" ? "Status_LED_Carrier" : "RainbowBarf_Carrier"));
    }

    // ─── Default Peripherals ───
    add("Peripherals", F.blower());
    add("Peripherals", F.glue());
    add("Peripherals", F.diffuser());

    // ─── Render ───
    let html = "<h3>📋 File List (" + files.length + " files)</h3>";
    let lastCat = "";
    files.forEach(f => {
        if (f.cat !== lastCat) {
            html += `<span class="cat">── ${f.cat} ──</span>\n`;
            lastCat = f.cat;
        }
        html += f.file + "\n";
    });

    // Probe compatibility warning
    const chart = getCompatChart(pk, style);
    if (chart && t && probeItem) {
        const compat = chart[t];
        if (compat && compat[probeItem.id] === 0) {
            html += `\n<span style="color:#e94560">⚠️  ${probeItem.label} is not compatible with ${t} hotends on this x-carriage — verify clearance</span>\n`;
        }
    }

    el.classList.remove("hidden");
    el.innerHTML = html;
}

// ---------- PREVIEW PANEL ----------
function bindPreviews() {
    document.querySelectorAll("#sections").forEach(container => {
        container.addEventListener("mouseover", (e) => {
            const opt = e.target.closest(".opt");
            if (opt && opt.dataset.preview) {
                const img = $("preview-img");
                const lbl = $("preview-label");
                img.src = opt.dataset.preview;
                img.style.display = "block";
                lbl.textContent = opt.textContent.trim();
            }
        });
    });
}

// ---------- INIT ----------
function init() {
    bindPreviews();
    update();
}

init();
