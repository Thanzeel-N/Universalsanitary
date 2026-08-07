"use client";

import { useState } from "react";
import { CheckCircle2, ShieldCheck, Scale, Flame, Activity } from "lucide-react";

const TABS = [
  { id: "circular", label: "Circular Covers" },
  { id: "square", label: "Square & Rectangular" },
  { id: "gratings", label: "Gratings & Channels" },
  { id: "datasheet", label: "Technical Data Sheet (EN 124-2)" },
] as const;

type TabId = typeof TABS[number]["id"];

interface Row {
  model: string;
  opening: string;
  depth: string;
  load: string;
  tonnage: string;
  material: string;
  standard: string;
}

const DATA: Record<"circular" | "square" | "gratings", Row[]> = {
  circular: [
    { model: "NECO-CIR-500-A15", opening: "500 mm ⌀", depth: "50 mm", load: "Class A15", tonnage: "15 kN (1.5t)", material: "Grey Iron CI Grade 20", standard: "EN 124-2 / IS 1726" },
    { model: "NECO-CIR-500-B125", opening: "500 mm ⌀", depth: "75 mm", load: "Class B125", tonnage: "125 kN (12.5t)", material: "Ductile Iron SG500/7", standard: "EN 124-2 / IS 1865" },
    { model: "NECO-CIR-560-C250", opening: "560 mm ⌀", depth: "85 mm", load: "Class C250", tonnage: "250 kN (25.0t)", material: "Ductile Iron SG500/7", standard: "EN 124-2 / IS 1865" },
    { model: "NECO-CIR-600-D400", opening: "600 mm ⌀", depth: "100 mm", load: "Class D400", tonnage: "400 kN (40.0t)", material: "Ductile Iron SG500/7", standard: "EN 124-2 / ISO 1083" },
    { model: "NECO-CIR-600-E600", opening: "600 mm ⌀", depth: "125 mm", load: "Class E600", tonnage: "600 kN (60.0t)", material: "Ductile Iron SG500/7", standard: "EN 124-2 / ISO 1083" },
    { model: "NECO-CIR-600-F900", opening: "600 mm ⌀", depth: "150 mm", load: "Class F900", tonnage: "900 kN (90.0t)", material: "Ductile Iron SG500/7", standard: "EN 124-2 / ISO 1083" },
  ],
  square: [
    { model: "NECO-SQ-450-A15", opening: "450 × 450 mm", depth: "50 mm", load: "Class A15", tonnage: "15 kN (1.5t)", material: "Grey Iron CI Grade 20", standard: "EN 124-2 / IS 1726" },
    { model: "NECO-SQ-600-B125", opening: "600 × 600 mm", depth: "75 mm", load: "Class B125", tonnage: "125 kN (12.5t)", material: "Ductile Iron SG500/7", standard: "EN 124-2 / IS 1865" },
    { model: "NECO-SQ-600-D400", opening: "600 × 600 mm", depth: "100 mm", load: "Class D400", tonnage: "400 kN (40.0t)", material: "Ductile Iron SG500/7", standard: "EN 124-2 / ISO 1083" },
    { model: "NECO-RCT-900-D400", opening: "900 × 600 mm", depth: "125 mm", load: "Class D400", tonnage: "400 kN (40.0t)", material: "Ductile Iron SG500/7", standard: "EN 124-2 / ISO 1083" },
    { model: "NECO-REC-600-C250", opening: "600 × 600 mm (Recessed)", depth: "100 mm", load: "Class C250", tonnage: "250 kN (25.0t)", material: "Ductile Iron SG500/7", standard: "EN 124-2 / IS 1865" },
    { model: "NECO-RCT-1200-E600", opening: "1200 × 750 mm", depth: "150 mm", load: "Class E600", tonnage: "600 kN (60.0t)", material: "Ductile Iron SG500/7", standard: "EN 124-2 / ISO 1083" },
  ],
  gratings: [
    { model: "NECO-GRT-300-B125", opening: "300 × 300 mm", depth: "50 mm", load: "Class B125", tonnage: "125 kN (12.5t)", material: "Ductile Iron SG500/7", standard: "EN 124-2 / IS 1865" },
    { model: "NECO-GRT-500-D400", opening: "500 × 500 mm", depth: "100 mm", load: "Class D400", tonnage: "400 kN (40.0t)", material: "Ductile Iron SG500/7", standard: "EN 124-2 / ISO 1083" },
    { model: "NECO-GULLY-450-D400", opening: "450 × 450 mm Road Gully", depth: "125 mm", load: "Class D400", tonnage: "400 kN (40.0t)", material: "Ductile Iron SG500/7", standard: "EN 124-2 / ISO 1083" },
    { model: "NECO-GULLY-450-E600", opening: "450 × 450 mm Gully", depth: "150 mm", load: "Class E600", tonnage: "600 kN (60.0t)", material: "Ductile Iron SG500/7", standard: "EN 124-2 / ISO 1083" },
    { model: "NECO-TREE-1000", opening: "1000 × 1000 mm Tree Grating", depth: "40 mm", load: "Class A15", tonnage: "15 kN (1.5t)", material: "Ductile / Grey Iron", standard: "IS 1726 / EN 124" },
    { model: "NECO-CHAN-500-D400", opening: "500 mm Width Channel", depth: "100 mm", load: "Class D400", tonnage: "400 kN (40.0t)", material: "Ductile Iron SG500/7", standard: "EN 124-2 / ISO 1083" },
  ],
};

const DATASHEET_ITEMS = [
  { no: "1", title: "Product Standard", value: "EN 124-2 (IS-1726 / IS-1865 / ISO-1083)" },
  { no: "2", title: "Intended Uses", value: "Covering of inspection chambers, gully tops, manholes on sewage lines, storm water drains, and areas subjected to pedestrian & vehicular traffic with total safety." },
  { no: "3", title: "Product Brand", value: "NECO Brand Ductile Iron Manhole Cover, Gratings and Frames (Jayaswal Neco Industries Ltd.)" },
  { no: "4", title: "Product Types & Shapes", value: "1) Square Cover w/ Frame  2) Circular Cover w/ Square Frame  3) Circular Cover w/ Circular Frame  4) Rectangular Cover w/ Frame  5) Square Recessed Cover  6) Rectangular Recessed Cover  7) Circular Recessed Cover  8) Square Grating w/ Frame  9) Rectangular Grating w/ Frame  10) Only Grating  11) Continuous Gratings & Channels" },
  { no: "5", title: "Load Bearing Capacity", value: "Class A-15 (15 kN) · Class B-125 (125 kN) · Class C-250 (250 kN) · Class D-400 (400 kN) · Class E-600 (600 kN) · Class F-900 (900 kN)" },
  { no: "6", title: "Material Grade", value: "Ductile Iron, Grade SG500/7 (As per IS-1865, ISO-1083) / Grey Iron CI Grade 20" },
  { no: "7", title: "Tensile Strength", value: "500 N/mm² (Minimum)" },
  { no: "8", title: "Elongation Percentage", value: "7% (Minimum)" },
  { no: "9", title: "Brinell Hardness (HBS)", value: "160 to 240 HBS" },
  { no: "10", title: "Skid Resistance", value: "Raised Pattern (Elegant anti-skid checker design)" },
  { no: "11", title: "Reaction to Fire", value: "Classified as Class A1 (Non-combustible, zero fire spread)" },
];

export default function SpecTable({ darkTheme = true }: { darkTheme?: boolean }) {
  const [tab, setTab] = useState<TabId>("circular");

  return (
    <div>
      {/* Tab Switcher */}
      <div className="flex flex-wrap gap-2.5 mb-8">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`font-sans text-xs uppercase tracking-wider px-5 py-2.5 rounded-full font-bold transition-all duration-300 ${
              tab === t.id
                ? darkTheme ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20 ring-2 ring-sky-400/40" : "bg-primary text-white shadow-md"
                : darkTheme ? "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "datasheet" ? (
        /* Technical Data Sheet Cards/Table */
        <div className={`rounded-2xl shadow-xl overflow-hidden ${
          darkTheme ? "border border-slate-800 bg-slate-900/90 text-slate-200" : "border border-neutral-200 bg-white text-neutral-700"
        }`}>
          <div className={`p-6 border-b flex flex-wrap justify-between items-center gap-4 ${
            darkTheme ? "bg-slate-950/80 border-slate-800" : "bg-neutral-50 border-neutral-200"
          }`}>
            <div>
              <div className="flex items-center gap-2 text-sky-400 font-oswald text-lg font-bold uppercase tracking-wider">
                <ShieldCheck size={20} />
                Technical Data Sheet of Ductile Iron Manhole Covers, Frames & Gratings
              </div>
              <p className="font-sans text-xs text-slate-400 mt-1">Official Specification as per EN 124-2 / Jayaswal Neco Industries Ltd.</p>
            </div>
            <span className="px-3 py-1 bg-sky-500/20 border border-sky-500/40 text-sky-300 text-xs font-bold uppercase tracking-widest rounded-full">
              EN 124-2 Compliant
            </span>
          </div>

          <div className="divide-y divide-slate-800/80 font-sans text-xs sm:text-sm">
            {DATASHEET_ITEMS.map((item) => (
              <div key={item.no} className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 p-4 sm:p-5 transition-colors ${
                darkTheme ? "hover:bg-slate-800/40" : "hover:bg-slate-50"
              }`}>
                <div className="md:col-span-1 font-bold text-sky-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-[10px]">
                    {item.no}
                  </span>
                </div>
                <div className={`md:col-span-4 font-bold uppercase tracking-wide text-xs ${
                  darkTheme ? "text-slate-300" : "text-neutral-800"
                }`}>
                  {item.title}
                </div>
                <div className={`md:col-span-7 font-medium leading-relaxed ${
                  darkTheme ? "text-slate-200" : "text-neutral-700"
                }`}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Specification Data Table */
        <div className={`overflow-x-auto rounded-2xl shadow-xl ${
          darkTheme ? "border border-slate-800 bg-slate-900/90 text-slate-200" : "border border-neutral-200 bg-white text-neutral-700"
        }`}>
          <table className="w-full text-left font-sans text-xs sm:text-sm">
            <thead>
              <tr className={`uppercase tracking-widest text-[10px] border-b ${
                darkTheme ? "bg-slate-950/80 text-slate-400 border-slate-800" : "bg-neutral-50 text-neutral-400 border-neutral-200"
              }`}>
                <th className="py-4 px-5 font-bold text-sky-400">Model</th>
                <th className="py-4 px-5 font-bold">Clear Opening / Type</th>
                <th className="py-4 px-5 font-bold">Frame Depth</th>
                <th className="py-4 px-5 font-bold">Load Class (EN 124-2)</th>
                <th className="py-4 px-5 font-bold">Material Grade</th>
                <th className="py-4 px-5 font-bold">Standard</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkTheme ? "divide-slate-800/80" : "divide-neutral-100"}`}>
              {DATA[tab as "circular" | "square" | "gratings"].map((row) => (
                <tr key={row.model} className={`transition-colors ${darkTheme ? "hover:bg-slate-800/50" : "hover:bg-slate-50"}`}>
                  <td className={`py-4 px-5 font-bold whitespace-nowrap ${darkTheme ? "text-white" : "text-neutral-900"}`}>{row.model}</td>
                  <td className="py-4 px-5 whitespace-nowrap font-medium">{row.opening}</td>
                  <td className={`py-4 px-5 whitespace-nowrap ${darkTheme ? "text-slate-400" : "text-neutral-500"}`}>{row.depth}</td>
                  <td className="py-4 px-5 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-bold text-xs ${
                      darkTheme ? "bg-sky-500/15 border border-sky-500/30 text-sky-300" : "bg-primary/10 border border-primary/20 text-primary"
                    }`}>
                      {row.load}
                      <span className="text-[10px] opacity-75 font-normal">({row.tonnage})</span>
                    </span>
                  </td>
                  <td className={`py-4 px-5 whitespace-nowrap ${darkTheme ? "text-slate-300" : "text-neutral-600"}`}>{row.material}</td>
                  <td className={`py-4 px-5 whitespace-nowrap ${darkTheme ? "text-slate-400" : "text-neutral-400"}`}>{row.standard}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className={`mt-4 font-sans text-[11px] tracking-wider uppercase font-medium ${
        darkTheme ? "text-slate-500" : "text-neutral-400"
      }`}>
        * Jayaswal Neco Industries Ltd. manufactures custom clear openings, recessed covers, double-seal designs & hinged anti-theft access frames per project drawing.
      </p>
    </div>
  );
}

