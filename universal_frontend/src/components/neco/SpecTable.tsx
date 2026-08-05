"use client";

import { useState } from "react";

const TABS = [
  { id: "circular", label: "Circular Covers" },
  { id: "square", label: "Square & Rectangular" },
  { id: "gratings", label: "Gratings & Gullies" },
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

const DATA: Record<TabId, Row[]> = {
  circular: [
    { model: "NECO-CIR-500-LD", opening: "500 mm ⌀", depth: "50 mm", load: "LD (A15)", tonnage: "1.5t", material: "Grey Iron CI 20", standard: "IS 1726 / EN 124" },
    { model: "NECO-CIR-500-MD", opening: "500 mm ⌀", depth: "75 mm", load: "MD (B125)", tonnage: "5.0t", material: "Ductile Iron GGG50", standard: "IS 1726 / EN 124" },
    { model: "NECO-CIR-600-HD", opening: "600 mm ⌀", depth: "100 mm", load: "HD (D400)", tonnage: "25.0t", material: "Ductile Iron GGG50", standard: "IS 1726 / EN 124" },
    { model: "NECO-CIR-600-EHD", opening: "600 mm ⌀", depth: "150 mm", load: "EHD (F900)", tonnage: "40.0t", material: "Ductile Iron GGG50", standard: "IS 1726 / EN 124" },
  ],
  square: [
    { model: "NECO-SQ-450-LD", opening: "450 × 450 mm", depth: "50 mm", load: "LD (A15)", tonnage: "1.5t", material: "Grey Iron CI 20", standard: "IS 1726 / IS 5354" },
    { model: "NECO-SQ-600-MD", opening: "600 × 600 mm", depth: "75 mm", load: "MD (B125)", tonnage: "5.0t", material: "Ductile Iron GGG50", standard: "IS 1726 / EN 124" },
    { model: "NECO-SQ-600-HD", opening: "600 × 600 mm", depth: "100 mm", load: "HD (D400)", tonnage: "25.0t", material: "Ductile Iron GGG50", standard: "IS 1726 / EN 124" },
    { model: "NECO-RCT-900-HD", opening: "900 × 600 mm", depth: "125 mm", load: "HD (D400)", tonnage: "25.0t", material: "Ductile Iron GGG50", standard: "IS 1726 / EN 124" },
  ],
  gratings: [
    { model: "NECO-GRT-300-MD", opening: "300 × 300 mm", depth: "50 mm", load: "MD (B125)", tonnage: "5.0t", material: "Ductile Iron GGG50", standard: "IS 1726 / EN 124" },
    { model: "NECO-GRT-500-HD", opening: "500 × 500 mm", depth: "100 mm", load: "HD (D400)", tonnage: "25.0t", material: "Ductile Iron GGG50", standard: "IS 1726 / EN 124" },
    { model: "NECO-GULLY-450-EHD", opening: "450 × 450 mm", depth: "125 mm", load: "EHD (E600)", tonnage: "40.0t", material: "Ductile Iron GGG50", standard: "IS 1726 / EN 124" },
  ],
};

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
            className={`font-sans text-xs uppercase tracking-wider px-6 py-2.5 rounded-full font-bold transition-all duration-300 ${
              tab === t.id
                ? darkTheme ? "bg-primary text-white shadow-lg" : "bg-primary text-white shadow-md"
                : darkTheme ? "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Specification Data Table */}
      <div className={`overflow-x-auto rounded-2xl shadow-xl ${
        darkTheme ? "border border-slate-800 bg-slate-900/90 text-slate-200" : "border border-neutral-200 bg-white text-neutral-700"
      }`}>
        <table className="w-full text-left font-sans text-xs sm:text-sm">
          <thead>
            <tr className={`uppercase tracking-widest text-[10px] border-b ${
              darkTheme ? "bg-slate-950/80 text-slate-400 border-slate-800" : "bg-neutral-50 text-neutral-400 border-neutral-200"
            }`}>
              <th className="py-4 px-5 font-bold text-sky-400">Model</th>
              <th className="py-4 px-5 font-bold">Clear Opening</th>
              <th className="py-4 px-5 font-bold">Frame Depth</th>
              <th className="py-4 px-5 font-bold">Load Class</th>
              <th className="py-4 px-5 font-bold">Material Grade</th>
              <th className="py-4 px-5 font-bold">Standard</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${darkTheme ? "divide-slate-800/80" : "divide-neutral-100"}`}>
            {DATA[tab].map((row) => (
              <tr key={row.model} className={`transition-colors ${darkTheme ? "hover:bg-slate-800/50" : "hover:bg-slate-50"}`}>
                <td className={`py-4 px-5 font-bold whitespace-nowrap ${darkTheme ? "text-white" : "text-neutral-900"}`}>{row.model}</td>
                <td className="py-4 px-5 whitespace-nowrap">{row.opening}</td>
                <td className={`py-4 px-5 whitespace-nowrap ${darkTheme ? "text-slate-400" : "text-neutral-500"}`}>{row.depth}</td>
                <td className="py-4 px-5 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-bold text-xs ${
                    darkTheme ? "bg-sky-500/15 border border-sky-500/30 text-sky-400" : "bg-primary/10 border border-primary/20 text-primary"
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

      <p className={`mt-4 font-sans text-[11px] tracking-wider uppercase font-medium ${
        darkTheme ? "text-slate-500" : "text-neutral-400"
      }`}>
        * Custom sizes, double-seal designs, lockable lids & hinged access frames available upon request.
      </p>
    </div>
  );
}
