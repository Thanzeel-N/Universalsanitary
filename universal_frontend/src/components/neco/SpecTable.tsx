"use client";

import { useState } from "react";
import { ShieldCheck, Search, Filter } from "lucide-react";

const TABS = [
  { id: "ms_square", label: "DI Square Covers (MS Series)" },
  { id: "mr_rect", label: "DI Rectangular Covers (MR Series)" },
  { id: "gf_gratings", label: "DI Gratings with Frame (GF Series)" },
  { id: "g_gratings", label: "DI Only Gratings (G Series)" },
  { id: "ci_covers", label: "Cast Iron Covers & Gratings" },
  { id: "specialty", label: "Tank Covers & Specialty" },
  { id: "datasheet", label: "Technical Data Sheet" },
] as const;

type TabId = typeof TABS[number]["id"];

interface CatalogueItem {
  code: string;
  size: string;
  loadGrade: string;
  capacity: string;
  clearOpening: string;
  frameOuter: string;
  height: string;
  weight: string;
}

// ─── MS Series: Ductile Iron Square Cover With Frame ────────────────────────
const MS_SERIES: CatalogueItem[] = [
  { code: "MS1", size: "300 × 300 mm", loadGrade: "Grade A-15", capacity: "1.5 MT", clearOpening: "300 × 300 mm", frameOuter: "385 × 385 mm", height: "30 mm", weight: "8 kg" },
  { code: "MS2", size: "300 × 300 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "300 × 300 mm", frameOuter: "445 × 445 mm", height: "75 mm", weight: "33 kg" },
  { code: "MS3", size: "450 × 450 mm", loadGrade: "Grade A-15", capacity: "1.5 MT", clearOpening: "450 × 450 mm", frameOuter: "560 × 560 mm", height: "40 mm", weight: "22 kg" },
  { code: "MS4", size: "450 × 450 mm", loadGrade: "Grade B-125", capacity: "12.5 MT", clearOpening: "450 × 450 mm", frameOuter: "590 × 590 mm", height: "75 mm", weight: "45 kg" },
  { code: "MS5", size: "560 × 560 mm", loadGrade: "Grade C-250 (D/S)", capacity: "25.0 MT", clearOpening: "560 × 560 mm", frameOuter: "740 × 740 mm", height: "75 mm", weight: "90 kg" },
  { code: "MS6", size: "600 × 600 mm", loadGrade: "Grade A-15", capacity: "1.5 MT", clearOpening: "600 × 600 mm", frameOuter: "730 × 730 mm", height: "40 mm", weight: "40 kg" },
  { code: "MS7", size: "600 × 600 mm", loadGrade: "Grade B-125", capacity: "12.5 MT", clearOpening: "600 × 600 mm", frameOuter: "750 × 750 mm", height: "75 mm", weight: "65 kg" },
  { code: "MS8", size: "600 × 600 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "600 × 600 mm", frameOuter: "750 × 750 mm", height: "100 mm", weight: "90 kg" },
  { code: "MS9", size: "750 × 750 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "750 × 750 mm", frameOuter: "895 × 895 mm", height: "75 mm", weight: "125 kg" },
  { code: "MS10", size: "800 × 800 mm", loadGrade: "Grade B-125", capacity: "12.5 MT", clearOpening: "800 × 800 mm", frameOuter: "950 × 950 mm", height: "75 mm", weight: "115 kg" },
  { code: "MS11", size: "800 × 800 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "800 × 800 mm", frameOuter: "970 × 970 mm", height: "100 mm", weight: "140 kg" },
  { code: "MS12", size: "900 × 900 mm", loadGrade: "Grade B-125", capacity: "12.5 MT", clearOpening: "900 × 900 mm", frameOuter: "1050 × 1050 mm", height: "75 mm", weight: "125 kg" },
  { code: "MS13", size: "900 × 900 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "900 × 900 mm", frameOuter: "1070 × 1070 mm", height: "100 mm", weight: "170 kg" },
  { code: "MS14", size: "900 × 900 mm (450⌀)", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "900 × 900 mm", frameOuter: "1060 × 1060 mm", height: "100 mm", weight: "198 kg" },
  { code: "MS15", size: "300 × 300 mm", loadGrade: "Grade D-400", capacity: "40.0 MT", clearOpening: "300 × 300 mm", frameOuter: "460 × 460 mm", height: "100 mm", weight: "40 kg" },
  { code: "MS17", size: "600 × 600 mm", loadGrade: "Grade D-400", capacity: "40.0 MT", clearOpening: "600 × 600 mm", frameOuter: "775 × 775 mm", height: "100 mm", weight: "105 kg" },
  { code: "MS19", size: "900 × 900 mm", loadGrade: "Grade D-400", capacity: "40.0 MT", clearOpening: "900 × 900 mm", frameOuter: "1070 × 1070 mm", height: "100 mm", weight: "195 kg" },
  { code: "MS20", size: "300 × 300 mm", loadGrade: "Grade B-125", capacity: "12.5 MT", clearOpening: "300 × 300 mm", frameOuter: "445 × 445 mm", height: "75 mm", weight: "28 kg" },
  { code: "MS21", size: "450 × 450 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "450 × 450 mm", frameOuter: "590 × 590 mm", height: "75 mm", weight: "58 kg" },
  { code: "MS22", size: "750 × 750 mm", loadGrade: "Grade B-125", capacity: "12.5 MT", clearOpening: "750 × 750 mm", frameOuter: "895 × 895 mm", height: "75 mm", weight: "100 kg" },
];

// ─── MR Series: Ductile Iron Rectangular Cover With Frame ──────────────────
const MR_SERIES: CatalogueItem[] = [
  { code: "MR1", size: "450 × 600 mm", loadGrade: "Grade A-15", capacity: "1.5 MT", clearOpening: "450 × 600 mm", frameOuter: "580 × 730 mm", height: "40 mm", weight: "30 kg" },
  { code: "MR2", size: "450 × 600 mm", loadGrade: "Grade B-125", capacity: "12.5 MT", clearOpening: "450 × 600 mm", frameOuter: "675 × 825 mm", height: "75 mm", weight: "70 kg" },
  { code: "MR3", size: "450 × 600 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "450 × 600 mm", frameOuter: "675 × 825 mm", height: "100 mm", weight: "100 kg" },
  { code: "MR4", size: "450 × 900 mm", loadGrade: "Grade A-15", capacity: "1.5 MT", clearOpening: "450 × 900 mm", frameOuter: "585 × 1030 mm", height: "40 mm", weight: "50 kg" },
  { code: "MR5", size: "450 × 900 mm", loadGrade: "Grade B-125", capacity: "12.5 MT", clearOpening: "450 × 900 mm", frameOuter: "600 × 1055 mm", height: "75 mm", weight: "75 kg" },
  { code: "MR6", size: "450 × 900 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "450 × 900 mm", frameOuter: "615 × 1060 mm", height: "100 mm", weight: "125 kg" },
  { code: "MR7", size: "600 × 900 mm", loadGrade: "Grade A-15", capacity: "1.5 MT", clearOpening: "600 × 900 mm", frameOuter: "745 × 1040 mm", height: "40 mm", weight: "65 kg" },
  { code: "MR8", size: "600 × 900 mm", loadGrade: "Grade B-125", capacity: "12.5 MT", clearOpening: "600 × 900 mm", frameOuter: "755 × 1050 mm", height: "75 mm", weight: "105 kg" },
  { code: "MR9", size: "600 × 900 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "600 × 900 mm", frameOuter: "775 × 1070 mm", height: "100 mm", weight: "150 kg" },
  { code: "MR10", size: "450 × 900 mm", loadGrade: "Grade D-400", capacity: "40.0 MT", clearOpening: "450 × 900 mm", frameOuter: "615 × 1060 mm", height: "100 mm", weight: "160 kg" },
  { code: "MR11", size: "600 × 900 mm", loadGrade: "Grade D-400", capacity: "40.0 MT", clearOpening: "600 × 900 mm", frameOuter: "775 × 1070 mm", height: "100 mm", weight: "170 kg" },
];

// ─── GF Series: Ductile Iron Grating With Frame ───────────────────────────
const GF_SERIES: CatalogueItem[] = [
  { code: "GF1", size: "450 × 450 mm", loadGrade: "Grade A-15", capacity: "1.5 MT", clearOpening: "450 × 450 mm", frameOuter: "555 × 555 mm", height: "50 mm", weight: "32 kg" },
  { code: "GF2", size: "450 × 450 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "450 × 450 mm", frameOuter: "630 × 630 mm", height: "90 mm", weight: "56 kg" },
  { code: "GF3", size: "450 × 500 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "450 × 500 mm", frameOuter: "550 × 600 mm", height: "100 mm", weight: "58 kg" },
  { code: "GF4", size: "450 × 600 mm", loadGrade: "Grade A-15", capacity: "1.5 MT", clearOpening: "450 × 600 mm", frameOuter: "560 × 705 mm", height: "50 mm", weight: "38 kg" },
  { code: "GF5", size: "500 × 600 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "500 × 600 mm", frameOuter: "685 × 780 mm", height: "90 mm", weight: "80 kg" },
  { code: "GF6", size: "525 × 700 mm", loadGrade: "Grade B-125", capacity: "12.5 MT", clearOpening: "525 × 700 mm", frameOuter: "650 × 800 mm", height: "75 mm", weight: "70 kg" },
  { code: "GF7", size: "525 × 700 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "525 × 700 mm", frameOuter: "650 × 800 mm", height: "75 mm", weight: "90 kg" },
  { code: "GF8", size: "600 × 600 mm", loadGrade: "Grade B-125", capacity: "12.5 MT", clearOpening: "600 × 600 mm", frameOuter: "700 × 725 mm", height: "75 mm", weight: "70 kg" },
  { code: "GF9", size: "600 × 600 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "600 × 600 mm", frameOuter: "700 × 725 mm", height: "75 mm", weight: "90 kg" },
  { code: "GF10", size: "750 × 750 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "750 × 750 mm", frameOuter: "850 × 850 mm", height: "100 mm", weight: "130 kg" },
  { code: "GF11", size: "800 × 800 mm", loadGrade: "Grade B-125", capacity: "12.5 MT", clearOpening: "800 × 800 mm", frameOuter: "900 × 900 mm", height: "75 mm", weight: "135 kg" },
  { code: "GF12", size: "800 × 800 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "800 × 800 mm", frameOuter: "900 × 900 mm", height: "75 mm", weight: "180 kg" },
  { code: "GF13", size: "300 × 300 mm", loadGrade: "Grade A-15", capacity: "1.5 MT", clearOpening: "300 × 300 mm", frameOuter: "350 × 350 mm", height: "40 mm", weight: "12 kg" },
  { code: "GF14", size: "550 × 550 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "550 × 550 mm", frameOuter: "650 × 650 mm", height: "75 mm", weight: "85 kg" },
  { code: "GF15", size: "600 × 900 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "600 × 900 mm", frameOuter: "750 × 1050 mm", height: "100 mm", weight: "120 kg" },
  { code: "GF16", size: "900 × 900 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "900 × 900 mm", frameOuter: "1050 × 1050 mm", height: "100 mm", weight: "150 kg" },
  { code: "GF17", size: "750 × 750 mm", loadGrade: "Grade D-400", capacity: "40.0 MT", clearOpening: "750 × 750 mm", frameOuter: "930 × 930 mm", height: "100 mm", weight: "165 kg" },
];

// ─── G Series: Ductile Iron Only Gratings (Without Frame) ───────────────
const G_SERIES = [
  { code: "G1", size: "100 × 450 mm", loadGrade: "Grade B-125", capacity: "12.5 MT", clearOpening: "100 × 450 mm", frameOuter: "-", height: "25 mm", weight: "5 kg" },
  { code: "G2", size: "300 × 600 mm", loadGrade: "Grade A-15", capacity: "1.5 MT", clearOpening: "300 × 600 mm", frameOuter: "-", height: "40 mm", weight: "12 kg" },
  { code: "G3", size: "300 × 600 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "300 × 600 mm", frameOuter: "-", height: "40 mm", weight: "35 kg" },
  { code: "G4", size: "340 × 600 mm", loadGrade: "Grade A-15", capacity: "1.5 MT", clearOpening: "340 × 600 mm", frameOuter: "-", height: "40 mm", weight: "15 kg" },
  { code: "G5", size: "450 × 600 mm", loadGrade: "Grade A-15", capacity: "1.5 MT", clearOpening: "450 × 600 mm", frameOuter: "-", height: "40 mm", weight: "16 kg" },
  { code: "G6", size: "450 × 600 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "450 × 600 mm", frameOuter: "-", height: "40 mm", weight: "40 kg" },
  { code: "G7", size: "550 × 600 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "550 × 600 mm", frameOuter: "-", height: "40 mm", weight: "56 kg" },
  { code: "G8", size: "400 × 400 mm", loadGrade: "Grade A-15", capacity: "1.5 MT", clearOpening: "400 × 400 mm", frameOuter: "-", height: "40 mm", weight: "15 kg" },
  { code: "G9", size: "400 × 400 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "400 × 400 mm", frameOuter: "-", height: "50 mm", weight: "40 kg" },
  { code: "G10", size: "500 × 500 mm", loadGrade: "Grade A-15", capacity: "1.5 MT", clearOpening: "500 × 500 mm", frameOuter: "-", height: "50 mm", weight: "33 kg" },
  { code: "G11", size: "500 × 500 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "500 × 500 mm", frameOuter: "-", height: "50 mm", weight: "48 kg" },
  { code: "G12", size: "600 × 600 mm", loadGrade: "Grade A-15", capacity: "1.5 MT", clearOpening: "600 × 600 mm", frameOuter: "-", height: "40 mm", weight: "21 kg" },
  { code: "G13", size: "600 × 600 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "600 × 600 mm", frameOuter: "-", height: "40 mm", weight: "60 kg" },
  { code: "G14", size: "700 × 700 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "700 × 700 mm", frameOuter: "-", height: "50 mm", weight: "90 kg" },
  { code: "G15", size: "800 × 800 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "800 × 800 mm", frameOuter: "-", height: "50 mm", weight: "120 kg" },
  { code: "G16", size: "380 × 600 mm", loadGrade: "Grade B-125", capacity: "12.5 MT", clearOpening: "380 × 600 mm", frameOuter: "-", height: "25 mm", weight: "28 kg" },
  { code: "G17", size: "380 × 600 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "380 × 600 mm", frameOuter: "-", height: "25 mm", weight: "38 kg" },
  { code: "G18", size: "545 × 600 mm", loadGrade: "Grade D-400", capacity: "40.0 MT", clearOpening: "545 × 600 mm", frameOuter: "-", height: "40 mm", weight: "43 kg" },
  { code: "G19", size: "645 × 600 mm", loadGrade: "Grade D-400", capacity: "40.0 MT", clearOpening: "645 × 600 mm", frameOuter: "-", height: "40 mm", weight: "58 kg" },
  { code: "G20", size: "500 × 600 mm", loadGrade: "Grade C-250", capacity: "25.0 MT", clearOpening: "500 × 600 mm", frameOuter: "-", height: "40 mm", weight: "38 kg" },
  { code: "G21", size: "370 × 500 mm", loadGrade: "Grade D-400", capacity: "40.0 MT", clearOpening: "370 × 500 mm", frameOuter: "-", height: "40 mm", weight: "38 kg" },
  { code: "G22", size: "520 × 500 mm", loadGrade: "Grade D-400", capacity: "40.0 MT", clearOpening: "520 × 500 mm", frameOuter: "-", height: "40 mm", weight: "50 kg" },
  { code: "G23", size: "675 × 500 mm", loadGrade: "Grade D-400", capacity: "40.0 MT", clearOpening: "675 × 500 mm", frameOuter: "-", height: "40 mm", weight: "64 kg" },
  { code: "G24", size: "370 × 500 mm", loadGrade: "Grade F-900", capacity: "90.0 MT", clearOpening: "370 × 500 mm", frameOuter: "-", height: "65 mm", weight: "64 kg" },
  { code: "G25", size: "675 × 500 mm", loadGrade: "Grade F-900", capacity: "90.0 MT", clearOpening: "675 × 500 mm", frameOuter: "-", height: "65 mm", weight: "124 kg" },
];

// ─── Cast Iron Covers & Gratings (IS 210 FG 150) ──────────────────────────
const CI_ITEMS = [
  { item: "Manhole Cover Grating (CI)", size: "100 × 100 mm", duty: "Light Duty", weight: "0.5 kg", material: "Cast Iron IS 210 FG 150" },
  { item: "Manhole Cover Grating (CI)", size: "150 × 150 mm", duty: "Light Duty", weight: "0.5 kg", material: "Cast Iron IS 210 FG 150" },
  { item: "Manhole Cover Grating (CI)", size: "225 × 225 mm", duty: "Light Duty", weight: "1.5 kg", material: "Cast Iron IS 210 FG 150" },
  { item: "Manhole Cover Grating (CI)", size: "300 × 300 mm", duty: "Light Duty", weight: "3.0 kg", material: "Cast Iron IS 210 FG 150" },
  { item: "Manhole Cover Grating (CI)", size: "300 × 600 mm", duty: "Light Duty (LD)", weight: "25.0 kg", material: "Cast Iron IS 210 FG 150" },
  { item: "Manhole Cover Grating (CI)", size: "450 × 600 mm", duty: "Medium Duty (MD)", weight: "38 kg / 56 kg", material: "Cast Iron IS 210 FG 150" },
  { item: "Manhole Cover Grating (CI)", size: "550 × 600 mm", duty: "Medium Duty (MD)", weight: "38.0 kg", material: "Cast Iron IS 210 FG 150" },
  { item: "Manhole Cover Grating (CI)", size: "500 × 700 mm", duty: "Heavy Duty (HD)", weight: "43.0 kg", material: "Cast Iron IS 210 FG 150" },
  { item: "Manhole Cover Grating (CI)", size: "600 × 600 mm", duty: "Light Duty (LD-2.5)", weight: "80.0 kg", material: "Cast Iron IS 210 FG 150" },
  { item: "Manhole Cover Grating (CI)", size: "600 × 810 mm", duty: "Light Duty (LD-2.5)", weight: "70.0 kg", material: "Cast Iron IS 210 FG 150" },
  { item: "Manhole Cover Grating (CI)", size: "700 × 700 mm", duty: "Light Duty (LD-2.5)", weight: "60.0 kg", material: "Cast Iron IS 210 FG 150" },
  { item: "Gratings With Frame (CI)", size: "450 × 450 mm", duty: "Light Duty", weight: "50.0 kg", material: "Cast Iron IS 210 FG 150" },
  { item: "Gratings With Frame (CI)", size: "450 × 500 mm", duty: "Light Duty (LD-2.5)", weight: "90.0 kg", material: "Cast Iron IS 210 FG 150" },
  { item: "Gratings With Frame (CI)", size: "450 × 600 mm", duty: "Light Duty (LD-2.5)", weight: "100.0 kg", material: "Cast Iron IS 210 FG 150" },
  { item: "Gratings With Frame (CI)", size: "600 × 600 mm", duty: "Medium Duty (MD-10)", weight: "145.0 kg", material: "Cast Iron IS 210 FG 150" },
  { item: "Gratings With Frame (CI)", size: "600 × 900 mm", duty: "Heavy Duty (HD-20)", weight: "245.0 kg", material: "Cast Iron IS 210 FG 150" },
];

// ─── Specialty Products (Water Tank Covers, Couplings, Pipes) ────────────
const SPECIALTY_ITEMS = [
  { name: "Storage Tank Cover / Water Tank Cover (Neco)", size: "450 mm ⌀", weight: "14 kg", notes: "Ductile / Cast Iron circular cover for water tanks & sumps" },
  { name: "Storage Tank Cover / Water Tank Cover (Neco)", size: "525 mm ⌀", weight: "18 kg", notes: "Ductile / Cast Iron circular cover for water tanks & sumps" },
  { name: "Storage Tank Cover / Water Tank Cover (Neco)", size: "600 mm ⌀", weight: "21 kg", notes: "Ductile / Cast Iron circular cover for water tanks & sumps" },
  { name: "Stainless Steel Shielded Coupling (Neco)", size: "3 inches (75 mm)", weight: "Standard", notes: "SS 304 elastomeric coupling with EPDM rubber gasket" },
  { name: "Cast Iron Equal & Unequal Parallel Branch", size: "3 in / 4 in", weight: "Standard", notes: "Red Epoxy Coated soil & waste fittings" },
  { name: "Centrifugally Cast Iron Hubless Pipe & Fitting", size: "2 in - 6 in (50-150mm)", weight: "Class LA / IS 1536", notes: "Hubless CI pipe system per IS 1536 & IS 3989" },
];

// ─── Technical Data Sheet ─────────────────────────────────────────────────────
const DATASHEET_ITEMS = [
  { no: "1", title: "Manufacturer & Brand", value: "Jayaswal Neco Industries Limited (NECO Brand) — Nagpur, India (jayaswalneco.com)" },
  { no: "2", title: "Ductile Iron Material Standard", value: "Spheroidal Graphite (SG) Iron Grade SG 500/7 as per IS-1865 / ISO-1083 / GGG50" },
  { no: "3", title: "Cast Iron Material Standard", value: "Grey Cast Iron Grade FG 150 as per IS 210" },
  { no: "4", title: "Product Load Standard (DI)", value: "BS EN 124 (Class A15, B125, C250, D400, E600, F900)" },
  { no: "5", title: "Product Load Standard (CI)", value: "IS 1726 (Light Duty 2.5 MT, Medium Duty 10 MT, Heavy Duty 20 MT, Extra Heavy Duty 35 MT)" },
  { no: "6", title: "Tensile Strength (DI)", value: "500 N/mm² (Minimum guaranteed)" },
  { no: "7", title: "Elongation (DI)", value: "7% (Minimum guaranteed)" },
  { no: "8", title: "Hardness Range", value: "160 to 240 HBS (Brinell Hardness)" },
  { no: "9", title: "Anti-Theft Security", value: "Hinged captive access frame with tamper-proof locking arrangement" },
  { no: "10", title: "Seating & Surface Pattern", value: "Precision machined seating surface (non-rocking silent fit) + Anti-skid raised checker tread pattern" },
  { no: "11", title: "Coating Protection", value: "Bituminous black anti-corrosive paint as standard; Epoxy coating optional" },
  { no: "12", title: "Weight Tolerance", value: "±5% manufacturing weight tolerance per standard casting specs" },
];

export default function SpecTable({ darkTheme = true }: { darkTheme?: boolean }) {
  const [tab, setTab] = useState<TabId>("ms_square");
  const [search, setSearch] = useState("");
  const th = darkTheme;

  const filterItem = (text: string) => text.toLowerCase().includes(search.toLowerCase());

  return (
    <div>
      {/* Search Bar & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className={`font-oswald text-xl font-bold uppercase tracking-wider ${th ? "text-white" : "text-neutral-900"}`}>
            NECO Manhole Covers & Drainage Catalogue
          </h3>
          <p className="font-sans text-xs text-slate-400 mt-0.5">
            Verified specifications from Jayaswal Neco Industries Limited (jayaswalneco.com)
          </p>
        </div>

        <div className="relative min-w-[260px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search model, size, or grade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 text-xs rounded-full border font-sans outline-none transition-all ${
              th
                ? "bg-slate-900 border-slate-700 text-slate-200 focus:border-sky-500"
                : "bg-neutral-50 border-neutral-300 text-neutral-800 focus:border-primary"
            }`}
          />
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex flex-wrap gap-2 mb-8">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`font-sans text-xs uppercase tracking-wider px-4 py-2.5 rounded-full font-bold transition-all duration-300 ${
              tab === t.id
                ? th
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20 ring-2 ring-sky-400/40"
                  : "bg-primary text-white shadow-md"
                : th
                ? "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── MS Series Table ── */}
      {tab === "ms_square" && (
        <div className={`overflow-x-auto rounded-2xl shadow-xl ${th ? "border border-slate-800 bg-slate-900/90 text-slate-200" : "border border-neutral-200 bg-white text-neutral-700"}`}>
          <table className="w-full text-left font-sans text-xs sm:text-sm">
            <thead>
              <tr className={`uppercase tracking-widest text-[10px] border-b ${th ? "bg-slate-950/80 text-slate-400 border-slate-800" : "bg-neutral-50 text-neutral-400 border-neutral-200"}`}>
                <th className="py-3.5 px-4 font-bold text-sky-400">Model Code</th>
                <th className="py-3.5 px-4 font-bold">Clear Opening (OxO1)</th>
                <th className="py-3.5 px-4 font-bold">Frame Outer (FxF1)</th>
                <th className="py-3.5 px-4 font-bold">Height (H)</th>
                <th className="py-3.5 px-4 font-bold">Load Grade</th>
                <th className="py-3.5 px-4 font-bold">Capacity</th>
                <th className="py-3.5 px-4 font-bold">Weight</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${th ? "divide-slate-800/80" : "divide-neutral-100"}`}>
              {MS_SERIES.filter((r) => filterItem(`${r.code} ${r.size} ${r.loadGrade} ${r.clearOpening}`)).map((row) => (
                <tr key={row.code} className={`transition-colors ${th ? "hover:bg-slate-800/50" : "hover:bg-slate-50"}`}>
                  <td className={`py-3.5 px-4 font-bold font-mono text-sky-400 whitespace-nowrap`}>{row.code}</td>
                  <td className="py-3.5 px-4 font-medium whitespace-nowrap">{row.clearOpening}</td>
                  <td className={`py-3.5 px-4 whitespace-nowrap ${th ? "text-slate-400" : "text-neutral-500"}`}>{row.frameOuter}</td>
                  <td className={`py-3.5 px-4 whitespace-nowrap ${th ? "text-slate-400" : "text-neutral-500"}`}>{row.height}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded font-bold text-xs ${th ? "bg-sky-500/15 text-sky-300 border border-sky-500/30" : "bg-primary/10 text-primary border border-primary/20"}`}>
                      {row.loadGrade}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold whitespace-nowrap">{row.capacity}</td>
                  <td className={`py-3.5 px-4 font-bold whitespace-nowrap ${th ? "text-emerald-400" : "text-emerald-700"}`}>{row.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={`px-4 py-2.5 text-[11px] border-t ${th ? "border-slate-800 text-slate-500" : "border-neutral-100 text-neutral-400"}`}>
            MS Series: Ductile Iron Square Cover With Frame · Material: SG 500/7 (IS 1865) · Source: jayaswalneco.com catalog
          </p>
        </div>
      )}

      {/* ── MR Series Table ── */}
      {tab === "mr_rect" && (
        <div className={`overflow-x-auto rounded-2xl shadow-xl ${th ? "border border-slate-800 bg-slate-900/90 text-slate-200" : "border border-neutral-200 bg-white text-neutral-700"}`}>
          <table className="w-full text-left font-sans text-xs sm:text-sm">
            <thead>
              <tr className={`uppercase tracking-widest text-[10px] border-b ${th ? "bg-slate-950/80 text-slate-400 border-slate-800" : "bg-neutral-50 text-neutral-400 border-neutral-200"}`}>
                <th className="py-3.5 px-4 font-bold text-sky-400">Model Code</th>
                <th className="py-3.5 px-4 font-bold">Clear Opening (OxO1)</th>
                <th className="py-3.5 px-4 font-bold">Frame Outer (FxF1)</th>
                <th className="py-3.5 px-4 font-bold">Height (H)</th>
                <th className="py-3.5 px-4 font-bold">Load Grade</th>
                <th className="py-3.5 px-4 font-bold">Capacity</th>
                <th className="py-3.5 px-4 font-bold">Weight</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${th ? "divide-slate-800/80" : "divide-neutral-100"}`}>
              {MR_SERIES.filter((r) => filterItem(`${r.code} ${r.size} ${r.loadGrade} ${r.clearOpening}`)).map((row) => (
                <tr key={row.code} className={`transition-colors ${th ? "hover:bg-slate-800/50" : "hover:bg-slate-50"}`}>
                  <td className="py-3.5 px-4 font-bold font-mono text-sky-400 whitespace-nowrap">{row.code}</td>
                  <td className="py-3.5 px-4 font-medium whitespace-nowrap">{row.clearOpening}</td>
                  <td className={`py-3.5 px-4 whitespace-nowrap ${th ? "text-slate-400" : "text-neutral-500"}`}>{row.frameOuter}</td>
                  <td className={`py-3.5 px-4 whitespace-nowrap ${th ? "text-slate-400" : "text-neutral-500"}`}>{row.height}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded font-bold text-xs ${th ? "bg-sky-500/15 text-sky-300 border border-sky-500/30" : "bg-primary/10 text-primary border border-primary/20"}`}>
                      {row.loadGrade}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold whitespace-nowrap">{row.capacity}</td>
                  <td className={`py-3.5 px-4 font-bold whitespace-nowrap ${th ? "text-emerald-400" : "text-emerald-700"}`}>{row.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={`px-4 py-2.5 text-[11px] border-t ${th ? "border-slate-800 text-slate-500" : "border-neutral-100 text-neutral-400"}`}>
            MR Series: Ductile Iron Rectangular Cover With Frame · Material: SG 500/7 (IS 1865) · Source: jayaswalneco.com catalog
          </p>
        </div>
      )}

      {/* ── GF Series Table ── */}
      {tab === "gf_gratings" && (
        <div className={`overflow-x-auto rounded-2xl shadow-xl ${th ? "border border-slate-800 bg-slate-900/90 text-slate-200" : "border border-neutral-200 bg-white text-neutral-700"}`}>
          <table className="w-full text-left font-sans text-xs sm:text-sm">
            <thead>
              <tr className={`uppercase tracking-widest text-[10px] border-b ${th ? "bg-slate-950/80 text-slate-400 border-slate-800" : "bg-neutral-50 text-neutral-400 border-neutral-200"}`}>
                <th className="py-3.5 px-4 font-bold text-sky-400">Model Code</th>
                <th className="py-3.5 px-4 font-bold">Clear Opening (OxO1)</th>
                <th className="py-3.5 px-4 font-bold">Frame Outer (FxF1)</th>
                <th className="py-3.5 px-4 font-bold">Height (H)</th>
                <th className="py-3.5 px-4 font-bold">Load Grade</th>
                <th className="py-3.5 px-4 font-bold">Capacity</th>
                <th className="py-3.5 px-4 font-bold">Weight</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${th ? "divide-slate-800/80" : "divide-neutral-100"}`}>
              {GF_SERIES.filter((r) => filterItem(`${r.code} ${r.size} ${r.loadGrade} ${r.clearOpening}`)).map((row) => (
                <tr key={row.code} className={`transition-colors ${th ? "hover:bg-slate-800/50" : "hover:bg-slate-50"}`}>
                  <td className="py-3.5 px-4 font-bold font-mono text-sky-400 whitespace-nowrap">{row.code}</td>
                  <td className="py-3.5 px-4 font-medium whitespace-nowrap">{row.clearOpening}</td>
                  <td className={`py-3.5 px-4 whitespace-nowrap ${th ? "text-slate-400" : "text-neutral-500"}`}>{row.frameOuter}</td>
                  <td className={`py-3.5 px-4 whitespace-nowrap ${th ? "text-slate-400" : "text-neutral-500"}`}>{row.height}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded font-bold text-xs ${th ? "bg-sky-500/15 text-sky-300 border border-sky-500/30" : "bg-primary/10 text-primary border border-primary/20"}`}>
                      {row.loadGrade}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold whitespace-nowrap">{row.capacity}</td>
                  <td className={`py-3.5 px-4 font-bold whitespace-nowrap ${th ? "text-emerald-400" : "text-emerald-700"}`}>{row.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={`px-4 py-2.5 text-[11px] border-t ${th ? "border-slate-800 text-slate-500" : "border-neutral-100 text-neutral-400"}`}>
            GF Series: Ductile Iron Grating With Frame · Material: SG 500/7 (IS 1865) · Source: jayaswalneco.com catalog
          </p>
        </div>
      )}

      {/* ── G Series Table ── */}
      {tab === "g_gratings" && (
        <div className={`overflow-x-auto rounded-2xl shadow-xl ${th ? "border border-slate-800 bg-slate-900/90 text-slate-200" : "border border-neutral-200 bg-white text-neutral-700"}`}>
          <table className="w-full text-left font-sans text-xs sm:text-sm">
            <thead>
              <tr className={`uppercase tracking-widest text-[10px] border-b ${th ? "bg-slate-950/80 text-slate-400 border-slate-800" : "bg-neutral-50 text-neutral-400 border-neutral-200"}`}>
                <th className="py-3.5 px-4 font-bold text-sky-400">Model Code</th>
                <th className="py-3.5 px-4 font-bold">Grating Dimensions</th>
                <th className="py-3.5 px-4 font-bold">Height (H)</th>
                <th className="py-3.5 px-4 font-bold">Load Grade</th>
                <th className="py-3.5 px-4 font-bold">Capacity</th>
                <th className="py-3.5 px-4 font-bold">Weight</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${th ? "divide-slate-800/80" : "divide-neutral-100"}`}>
              {G_SERIES.filter((r) => filterItem(`${r.code} ${r.size} ${r.loadGrade}`)).map((row) => (
                <tr key={row.code} className={`transition-colors ${th ? "hover:bg-slate-800/50" : "hover:bg-slate-50"}`}>
                  <td className="py-3.5 px-4 font-bold font-mono text-sky-400 whitespace-nowrap">{row.code}</td>
                  <td className="py-3.5 px-4 font-medium whitespace-nowrap">{row.size}</td>
                  <td className={`py-3.5 px-4 whitespace-nowrap ${th ? "text-slate-400" : "text-neutral-500"}`}>{row.height}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded font-bold text-xs ${th ? "bg-sky-500/15 text-sky-300 border border-sky-500/30" : "bg-primary/10 text-primary border border-primary/20"}`}>
                      {row.loadGrade}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold whitespace-nowrap">{row.capacity}</td>
                  <td className={`py-3.5 px-4 font-bold whitespace-nowrap ${th ? "text-emerald-400" : "text-emerald-700"}`}>{row.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={`px-4 py-2.5 text-[11px] border-t ${th ? "border-slate-800 text-slate-500" : "border-neutral-100 text-neutral-400"}`}>
            G Series: Ductile Iron Only Gratings (Without Frame) · Material: SG 500/7 (IS 1865) · Source: jayaswalneco.com catalog
          </p>
        </div>
      )}

      {/* ── Cast Iron Table ── */}
      {tab === "ci_covers" && (
        <div className={`overflow-x-auto rounded-2xl shadow-xl ${th ? "border border-slate-800 bg-slate-900/90 text-slate-200" : "border border-neutral-200 bg-white text-neutral-700"}`}>
          <table className="w-full text-left font-sans text-xs sm:text-sm">
            <thead>
              <tr className={`uppercase tracking-widest text-[10px] border-b ${th ? "bg-slate-950/80 text-slate-400 border-slate-800" : "bg-neutral-50 text-neutral-400 border-neutral-200"}`}>
                <th className="py-3.5 px-4 font-bold text-amber-400">Item Name</th>
                <th className="py-3.5 px-4 font-bold">Dimensions (mm)</th>
                <th className="py-3.5 px-4 font-bold">Duty Rating (IS 1726)</th>
                <th className="py-3.5 px-4 font-bold">Material</th>
                <th className="py-3.5 px-4 font-bold">Weight</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${th ? "divide-slate-800/80" : "divide-neutral-100"}`}>
              {CI_ITEMS.filter((r) => filterItem(`${r.item} ${r.size} ${r.duty}`)).map((row, idx) => (
                <tr key={idx} className={`transition-colors ${th ? "hover:bg-slate-800/50" : "hover:bg-slate-50"}`}>
                  <td className="py-3.5 px-4 font-semibold whitespace-nowrap text-amber-300">{row.item}</td>
                  <td className="py-3.5 px-4 font-medium whitespace-nowrap">{row.size}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded font-bold text-xs ${th ? "bg-amber-500/15 text-amber-300 border border-amber-500/30" : "bg-amber-50 text-amber-800 border border-amber-200"}`}>
                      {row.duty}
                    </span>
                  </td>
                  <td className={`py-3.5 px-4 whitespace-nowrap ${th ? "text-slate-300" : "text-neutral-600"}`}>{row.material}</td>
                  <td className={`py-3.5 px-4 font-bold whitespace-nowrap ${th ? "text-emerald-400" : "text-emerald-700"}`}>{row.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={`px-4 py-2.5 text-[11px] border-t ${th ? "border-slate-800 text-slate-500" : "border-neutral-100 text-neutral-400"}`}>
            Cast Iron Products · Material: FG 150 as per IS 210 · Standards: IS 1726 · Source: jayaswalneco.com catalog
          </p>
        </div>
      )}

      {/* ── Specialty Products ── */}
      {tab === "specialty" && (
        <div className={`rounded-2xl shadow-xl overflow-hidden ${th ? "border border-slate-800 bg-slate-900/90 text-slate-200" : "border border-neutral-200 bg-white text-neutral-700"}`}>
          <div className={`p-4 border-b flex items-center gap-2 ${th ? "bg-slate-950/80 border-slate-800" : "bg-neutral-50 border-neutral-200"}`}>
            <ShieldCheck size={18} className="text-sky-400" />
            <span className="font-oswald text-sm font-bold uppercase tracking-wider text-sky-400">
              Storage Tank Covers, Couplings & Centrifugal Pipes
            </span>
          </div>
          <div className={`divide-y font-sans text-xs sm:text-sm ${th ? "divide-slate-800/80" : "divide-neutral-100"}`}>
            {SPECIALTY_ITEMS.filter((r) => filterItem(`${r.name} ${r.size} ${r.notes}`)).map((p, i) => (
              <div key={i} className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 p-4 transition-colors ${th ? "hover:bg-slate-800/40" : "hover:bg-slate-50"}`}>
                <div className="md:col-span-4 font-bold text-slate-200">{p.name}</div>
                <div className="md:col-span-3 font-semibold text-sky-400">{p.size}</div>
                <div className="md:col-span-2 font-bold text-emerald-400">{p.weight}</div>
                <div className={`md:col-span-3 text-xs ${th ? "text-slate-400" : "text-neutral-500"}`}>{p.notes}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Technical Data Sheet ── */}
      {tab === "datasheet" && (
        <div className={`rounded-2xl shadow-xl overflow-hidden ${th ? "border border-slate-800 bg-slate-900/90 text-slate-200" : "border border-neutral-200 bg-white text-neutral-700"}`}>
          <div className={`p-6 border-b flex flex-wrap justify-between items-center gap-4 ${th ? "bg-slate-950/80 border-slate-800" : "bg-neutral-50 border-neutral-200"}`}>
            <div>
              <div className="flex items-center gap-2 text-sky-400 font-oswald text-lg font-bold uppercase tracking-wider">
                <ShieldCheck size={20} />
                Technical Data Sheet — Jayaswal Neco Industries Limited
              </div>
              <p className="font-sans text-xs text-slate-400 mt-1">
                Official specifications & standards from jayaswalneco.com
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-sky-500/20 border border-sky-500/40 text-sky-300 text-xs font-bold uppercase tracking-widest rounded-full">
                EN 124 Compliant
              </span>
              <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest rounded-full">
                IS 1865 / IS 1726
              </span>
            </div>
          </div>

          <div className={`divide-y font-sans text-xs sm:text-sm ${th ? "divide-slate-800/80" : "divide-neutral-100"}`}>
            {DATASHEET_ITEMS.map((item) => (
              <div key={item.no} className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 p-4 sm:p-5 transition-colors ${th ? "hover:bg-slate-800/40" : "hover:bg-slate-50"}`}>
                <div className="md:col-span-1 font-bold text-sky-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-[10px]">
                    {item.no}
                  </span>
                </div>
                <div className={`md:col-span-4 font-bold uppercase tracking-wide text-xs ${th ? "text-slate-300" : "text-neutral-800"}`}>
                  {item.title}
                </div>
                <div className={`md:col-span-7 font-medium leading-relaxed ${th ? "text-slate-200" : "text-neutral-700"}`}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className={`mt-4 font-sans text-[11px] tracking-wider uppercase font-medium ${th ? "text-slate-500" : "text-neutral-400"}`}>
        * Jayaswal Neco Industries Ltd. manufactures custom clear openings, recessed covers, double-seal & hinged anti-theft designs per project drawing. Contact NECO for project-specific quotations.
      </p>
    </div>
  );
}


