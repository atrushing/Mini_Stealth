// ============================================================
//  Mini Stealth Configurator – script.js
// ============================================================

// ---------- CONFIG: define sections & their options ----------
// Each section: { id, label, options: [{id, label, ...}] }
// Dependencies: a section is shown only when its `requires` are met.

const SECTIONS = {
  printer:  { id: "printer",  label: "Printer",       options: [
    { id: "printer1", label: "Voron V0.1" },
    { id: "printer2", label: "Voron V0.2" },
    { id: "printer3", label: "Voron V2.4" },
    { id: "printer4", label: "Voron Trident" },
    { id: "printer5", label: "Voron Switchwire" },
    { id: "printer6", label: "Voron Legacy" },
    { id: "printer7", label: "PforAnts Micron" },
    { id: "printer8", label: "Sovol SV06" },
    { id: "printer9", label: "Prusa MK3" },
    { id: "printer10", label: "Tiny M" },
    { id: "printer11", label: "Ender-3" },
  ]},
  linear:   { id: "linear",   label: "Linear Rails",  options: [
    { id: "linear1", label: "MGN7" },
    { id: "linear2", label: "MGN9" },
  ]},
  xstop:    { id: "xstop",    label: "X Endstop",     options: [
    { id: "xstop1", label: "yes" },
    { id: "xstop2", label: "no" },
  ]},
  extruder: { id: "extruder", label: "Extruder",      options: [
    { id: "extruder1", label: "Orbiter 1.5",    group: "orb15" },
    { id: "extruder2", label: "Orbiter 2.0",    group: "orb20" },
    { id: "extruder3", label: "Orbiter 2.0 with Filament Sensor",    group: "orb20" },
    { id: "extruder4", label: "Galileo 2 SA",        group: "orb20" },
    { id: "extruder5", label: "WristWatch BMG",        group: "orb20" },
    { id: "extruder6", label: "GWristWatch G2SA",        group: "orb20" },
    { id: "extruder7", label: "WristWatch Orb2.0",        group: "orb20" },
    { id: "extruder8", label: "LGX Lite",       group: "lgxLite" },
    { id: "extruder9", label: "Hummingbird",    group: "lgxLite" },
    { id: "extruder10", label: "VzHEX",          group: "lgxLite" },
    { id: "extruder11", label: "Creality K1",          group: "lgxLite" },
    { id: "extruder12", label: "Mini Sherpa",    group: "mini" },
    { id: "extruder13", label: "HGX Lite",    group: "mini" },
    { id: "extruder14", label: "ProtoXtruder",   group: "mini" },
    { id: "extruder15", label: "Micro Sherpa",   group: "micro" },
    { id: "extruder16", label: "Micro Sherpa Mirrored",   group: "microMir" },
  ]},
  hotend:   { id: "hotend",   core: "Hotend",        options: [
    { id: "hotend1", core: "Revo" },
    { id: "hotend2", core: "Dragon" },
    { id: "hotend3", core: "Rapido", uhf: 1 },
    { id: "hotend4", core: "BMO" },
    { id: "hotend5", core: "BMS6" },
    { id: "hotend6", core: "BMS7" },
    { id: "hotend7", core: "Rapido" },
    { id: "hotend8", core: "Rapido", uhf: 1 },
    { id: "hotend9", core: "Mosq" },
    { id: "hotend10", core: "Mosq", uhf: 1 },
    { id: "hotend11", core: "Mosq", uhf: 1 },
    { id: "hotend12", core: "Dragon" },
    { id: "hotend13", core: "Rapido" },
    { id: "hotend14", core: "Rapido" },
    { id: "hotend15", core: "TD6S" },
    { id: "hotend16", core: "TD6S" },
    { id: "hotend17", core: "ACE" },
    { id: "hotend18", core: "Dragon" },
    { id: "hotend19", core: "Rapido", uhf: 1 },
    { id: "hotend20", core: "XG" },
    { id: "hotend21", core: "Bambu" },
    { id: "hotend22", core: "K1", uhf: 1 },
    { id: "hotend23", core: "Spider" },
    { id: "hotend24", core: "V6", uhf: 1 },
    { id: "hotend25", core: "ACE", uhf: 2,},
  ]},
  probe:    { id: "probe",    label: "Probe", options: [
    // Grouped by probe-group container (probes01–04)
    { id: "probe0",  label: "None",               group: "probes01" },
    { id: "probe1",  label: "ZeroClick",          group: "probes01" },
    { id: "probe2",  label: "Differential IR",    group: "probes01" },
    { id: "probe3",  label: "None",               group: "probes02" },
    { id: "probe4",  label: "Omron",              group: "probes02" },
    { id: "probe5",  label: "Klicky",             group: "probes02" },
    { id: "probe6",  label: "BL-Touch",           group: "probes02" },
    { id: "probe7",  label: "MicroProbe",         group: "probes02" },
    { id: "probe8",  label: "Euclid",             group: "probes02" },
    { id: "probe9",  label: "Beacon3D",           group: "probes02" },
    { id: "probe10", label: "PINDA",              group: "probes02" },
    { id: "probe11", label: "Differential IR",    group: "probes02" },
    { id: "probe12", label: "None",               group: "probes03" },
    { id: "probe13", label: "Omron",              group: "probes03" },
    { id: "probe14", label: "Klicky",             group: "probes03" },
    { id: "probe15", label: "BL-Touch",           group: "probes03" },
    { id: "probe16", label: "MicroProbe",         group: "probes03" },
    { id: "probe17", label: "Euclid",             group: "probes03" },
    { id: "probe18", label: "Beacon3D",           group: "probes03" },
    { id: "probe19", label: "PINDA",              group: "probes03" },
    { id: "probe20", label: "Differential IR",    group: "probes03" },
    { id: "probe21", label: "Mini Stealth DAB",   group: "probes03" },
    { id: "probe22", label: "None",               group: "probes04" },
    { id: "probe23", label: "Micron Compatible",  group: "probes04" },
    { id: "probe24", label: "Beacon3D",           group: "probes04" },
    { id: "probe25", label: "Boop beta4 Wired",   group: "probes04" },
    { id: "probe26", label: "Boop beta4 PCB",     group: "probes04" },
  ]},
  umbilical:{ id: "umbilical",label: "Umbilical PCB",     options: [
    { id: "umbilical0", label: "No" },
    { id: "umbilical1", label: "Yes" },
  ]},
  chain:    { id: "chain",    label: "Cable Chain",   options: [
    { id: "chain0", label: "None" },
    { id: "chain1", label: "2 Hole" },
    { id: "chain2", label: "3 Hole" },
  ]},
  strain:   { id: "strain",   label: "Strain Relief", options: [
    { id: "strain0", label: "High" },
    { id: "strain1", label: "Low" },
  ]},
  display:  { id: "display",  label: "Display",       options: [
    { id: "display0", label: "None" },
    { id: "display1", label: "Knomi" },
    { id: "display2", label: "Knomi2" },
    { id: "display3", label: "Mellow Fly Halo" },
  ]},
  status:   { id: "status",   label: "Status LED",    options: [
    { id: "status1", label: "NeoPixel" },
    { id: "status2", label: "Rainbow Barf" },
  ]},
};

// ---------- DEPENDENCY RULES ----------
// Which probe-group is visible for a given (printer, extruder-group)?
// Returns "probes01" | "probes02" | "probes03" | "probes04"
function probeGroupFor(printer, extruderGroup) {
  // Printers 4–6 (V3 SE/OB/AE) use probes02 with orb/lgx, probes04 with mini/micro
  if (printer >= 4 && printer <= 6) {
    if (extruderGroup === "mini" || extruderGroup === "micro") return "probes04";
    return "probes02";
  }
  // Printers 1–3 (X2, X2C, KE)
  if (extruderGroup === "orb15" || extruderGroup === "orb20") return "probes01";
  if (extruderGroup === "lgxLite") return "probes03";
  if (extruderGroup === "mini")    return "probes02";
  if (extruderGroup === "micro")   return "probes04";
  return "probes03"; // default
}

// Which sections are auto-completed (no user choice needed)?
// e.g. X2C has no linear rail option → section auto-checked
function autoSections(printer) {
  const auto = {};
  if (printer === 2) auto.linear = 1;   // X2C ships with MGN12
  if (printer === 3) auto.xstop  = 1;   // KE has hall effect built-in
  return auto;
}

// ---------- STATE ----------
const state = {
  printer: 0, linear: 0, xstop: 0, extruder: 0,
  hotend: 0, probe: 0, umbilical: 0, chain: 0,
  strain: 0, display: 0, status: 0,
  UHF: 0, hotGroup: "mini",
};

const sectionDone = {};
for (const k in SECTIONS) sectionDone[k] = 0;

// ---------- HELPERS ----------
function $(id) { return document.getElementById(id); }

function show(id)   { const el = $(id); if (el) el.classList.remove("hidden"); }
function hide(id)   { const el = $(id); if (el) el.classList.add("hidden"); }
function select(id) { const el = $(id); if (el) el.classList.add("selected"); }
function deselect(id){ const el = $(id); if (el) el.classList.remove("selected"); }

function deselectAll(sectionKey) {
  for (const opt of SECTIONS[sectionKey].options) {
    deselect(opt.id);
  }
}

// ---------- CORE: render / update ----------
function update() {
  const { printer, extruder, hotend, umbilical, chain } = state;

  // --- Linear rails: only for printers 1 & 2 ---
  const showLinear = (printer === 1 || printer === 2);
  showLinear ? show("linearRails1") : hide("linearRails1");
  showLinear ? show("linearRails2") : hide("linearRails2");
  if (!showLinear) { state.linear = 0; sectionDone.linear = autoSections(printer).linear || 0; }

  // --- X endstop: only for printer 1 & 2 ---
  const showXstop = (printer === 1 || printer === 2);
  showXstop ? show("xstop") : hide("xstop");
  if (!showXstop) { state.xstop = 0; sectionDone.xstop = autoSections(printer).xstop || 0; }

  // --- Probe group visibility ---
  const pg = probeGroupFor(printer, state.hotGroup);
  for (const g of ["probes01","probes02","probes03","probes04"]) {
    g === pg ? show(g) : hide(g);
  }
  if (!pg) { state.probe = 0; sectionDone.probe = 0; }

  // --- Cable chain & strain relief: depend on umbilical + printer ---
  const showChain = (umbilical === 0) && printer >= 4 && printer <= 6;
  showChain ? show("cblChain") : hide("cblChain");
  if (!showChain) { state.chain = 0; sectionDone.chain = 0; }

  const showStrain = (umbilical === 0) || (chain === 0);
  showStrain ? show("strain") : hide("strain");
  if (!showStrain) { state.strain = 0; sectionDone.strain = 1; }

  // --- Hotend group container (orb15 / orb20 / lgxLite / mini / micro) ---
  for (const g of ["orb15","orb20","lgxLite","mini","micro"]) {
    g === state.hotGroup ? show(g) : hide(g);
  }

  // --- Core file display ---
  if (hotend && state.hotGroup) {
    const coreIdx = SECTIONS.hotend.options[hotend - 1]?.core;
    if (coreIdx !== undefined) {
      const fname = coreList[state.hotGroup]["core" + coreIdx];
      for (const el of ["microCore","miniCore","orb15Core","orb20Core","lgxLiteCore"]) {
        const e = $(el); if (e) e.innerText = fname;
      }
    }
  }

  // --- Validation ---
  validate();
}

function validate() {
  let count = 0;
  for (const k in sectionDone) { if (sectionDone[k]) count++; }

  const total = Object.keys(SECTIONS).length;
  let msg = `Selected: `;
  msg += `P${state.printer} L${state.linear} X${state.xstop} E${state.extruder} `;
  msg += `H${state.hotend} Pr${state.probe} U${state.umbilical} `;
  msg += `C${state.chain} S${state.strain} D${state.display} St${state.status}`;
  msg += `  (${count}/${total} sections done)`;

  if (count === total) msg += "  ✓ Complete!";

  const text = $("text");
  if (text) text.innerText = msg;
}

// ---------- EVENT BINDING (generic) ----------
function bindSection(sectionKey, onPick) {
  for (let i = 0; i < SECTIONS[sectionKey].options.length; i++) {
    const opt = SECTIONS[sectionKey].options[i];
    const el = $(opt.id);
    if (!el) continue;
    el.onclick = () => {
      deselectAll(sectionKey);
      select(opt.id);
      state[sectionKey] = i + 1;
      sectionDone[sectionKey] = 1;
      if (opt.uhf) state.UHF = opt.uhf;
      if (opt.group) state.hotGroup = opt.group;
      if (onPick) onPick(opt, i);
      update();
    };
  }
}

// Bind all sections
bindSection("printer", (opt) => {
  // Reset downstream when printer changes
  state.linear = 0; state.xstop = 0; state.extruder = 0;
  state.hotend = 0; state.probe = 0; state.umbilical = 0;
  state.chain = 0; state.strain = 0;
  for (const k of ["linear","xstop","extruder","hotend","probe","umbilical","chain","strain"]) {
    sectionDone[k] = 0;
  }
  deselectAll("linear"); deselectAll("xstop"); deselectAll("extruder");
  deselectAll("hotend"); deselectAll("probe");
  deselectAll("umbilical"); deselectAll("chain"); deselectAll("strain");
  // Apply auto-sections
  const auto = autoSections(state.printer);
  if (auto.linear) sectionDone.linear = 1;
  if (auto.xstop)  sectionDone.xstop  = 1;
});

bindSection("linear");
bindSection("xstop");
bindSection("extruder", (opt) => {
  // Reset hotend & probe when extruder changes
  state.hotend = 0; state.probe = 0;
  sectionDone.hotend = 0; sectionDone.probe = 0;
  deselectAll("hotend"); deselectAll("probe");
  state.UHF = 0;
});
bindSection("hotend");
bindSection("probe");
bindSection("umbilical", (opt) => {
  state.chain = 0; state.strain = 0;
  sectionDone.chain = 0; sectionDone.strain = 0;
  deselectAll("chain"); deselectAll("strain");
});
bindSection("chain", (opt) => {
  state.strain = 0; sectionDone.strain = 0;
  deselectAll("strain");
});
bindSection("strain");
bindSection("display");
bindSection("status");

// ---------- DATA: core file names (generated) ----------
const EXTRUDER_NAMES = {
  micro:   "Micro_Sherpa",
  mini:    "Mini_Sherpa",
  orb15:   "Orbiter_1.5",
  orb20:   "Orbiter_2.0",
  lgxLite: "LGX_Lite",
};
const HOTEND_NAMES = [
  "Dropeffect_XG","Spider_Pro","BambuLab","Mosquito","Mosquito","Revo_Voron",
  "Rapido","Rapido","Dragon_ST-HF","Rapido","Dragonfly","Dragonfly_BMS-6",
  "Dragonfly_BMS-7","Rapido","Dragon_Ace","Rapido","TCHC-TD6S"
];

// Build coreList from the pattern: _MiniStealth_Core_{extruder}_{hotend}.stl
const coreList = {};
for (const [group, extName] of Object.entries(EXTRUDER_NAMES)) {
  coreList[group] = {};
  for (let i = 0; i <= 11; i++) {
    // Map core index to hotend name (same mapping as original)
    const hotendMap = [0,1,2,3,3,4,5,7,8,9,10,11];
    coreList[group]["core" + i] =
      "[b]_MiniStealth_Core_" + extName + "_" + HOTEND_NAMES[hotendMap[i]] + ".stl";
  }
}

// ---------- INIT ----------
const header = $("header");
if (header) header.innerText = "Select your printer and then work your way down the page.";

// Initial state: hide everything that depends on printer selection
hide("linearRails1"); hide("linearRails2"); hide("xstop");
hide("probes01"); hide("probes02"); hide("probes04");
show("probes03");
hide("cblChain"); hide("strain");
hide("orb15"); hide("orb20"); hide("lgxLite"); hide("micro");
show("mini");

validate();
