"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Conflict } from "@/lib/conflicts";
import type { ConflictContent } from "@/lib/content";

// ─── Types ────────────────────────────────────────────────────────────────────

type Section = "contestualizzazione" | "giovani" | "sanita";

type SectionDef = {
  key: Section;
  label: string;
  fullLabel: string;
  accent: string;
  accentDim: string;
  accentBorder: string;
  icon: React.ReactNode;
};

type Props = {
  conflict: Conflict;
  content: ConflictContent | null;
  heroSrc: string | null;
  gallery: string[];
  onClose: () => void;
};

// ─── SVG arc helpers ──────────────────────────────────────────────────────────

function arcPath(cx: number, cy: number, r: number, fraction: number): string {
  if (fraction <= 0) return "";
  const clipped = Math.min(fraction, 0.9999);
  const toRad = (d: number) => (d * Math.PI) / 180;
  const start = 210;
  const end = start + clipped * 270;
  const x1 = (cx + r * Math.cos(toRad(start))).toFixed(2);
  const y1 = (cy + r * Math.sin(toRad(start))).toFixed(2);
  const x2 = (cx + r * Math.cos(toRad(end))).toFixed(2);
  const y2 = (cy + r * Math.sin(toRad(end))).toFixed(2);
  const large = clipped * 270 > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

function trackPath(cx: number, cy: number, r: number): string {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const x1 = (cx + r * Math.cos(toRad(210))).toFixed(2);
  const y1 = (cy + r * Math.sin(toRad(210))).toFixed(2);
  const x2 = (cx + r * Math.cos(toRad(480))).toFixed(2);
  const y2 = (cy + r * Math.sin(toRad(480))).toFixed(2);
  return `M ${x1} ${y1} A ${r} ${r} 0 1 1 ${x2} ${y2}`;
}

// ─── Stability label ──────────────────────────────────────────────────────────

function stabilityInfo(s: number) {
  if (s <= 2) return { label: "Critica",    cls: "text-red-400    bg-red-950/50    border-red-800/60"    };
  if (s <= 4) return { label: "Alta",       cls: "text-orange-400 bg-orange-950/50 border-orange-800/60" };
  if (s <= 6) return { label: "Moderata",   cls: "text-amber-300  bg-amber-950/50  border-amber-800/60"  };
  if (s <= 8) return { label: "Bassa",      cls: "text-lime-400   bg-lime-950/50   border-lime-800/60"   };
  return             { label: "Minima",     cls: "text-emerald-400 bg-emerald-950/50 border-emerald-800/60" };
}

// ─── Radial chart ─────────────────────────────────────────────────────────────

function RadialChart({ criticita, stabilita, anni }: { criticita: number; stabilita: number; anni: number }) {
  const cx = 52, cy = 52;
  const rings = [
    { r: 46, fraction: criticita / 10,                    color: "#f87171", track: "#2d1010" },
    { r: 34, fraction: (10 - stabilita) / 10,             color: "#fbbf24", track: "#2d1f08" },
    { r: 22, fraction: Math.min(anni / 35, 1),            color: "#38bdf8", track: "#081e2d" },
  ];
  return (
    <svg viewBox="0 0 104 104" className="w-[96px] h-[96px] shrink-0">
      {rings.map(({ r, fraction, color, track }) => (
        <g key={r}>
          <path d={trackPath(cx, cy, r)} fill="none" stroke={track}  strokeWidth="5" strokeLinecap="round" />
          <path d={arcPath(cx, cy, r, fraction)} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

// ─── Section tiles definition ─────────────────────────────────────────────────

const SECTIONS: SectionDef[] = [
  {
    key: "contestualizzazione",
    label: "Contesto",
    fullLabel: "Contestualizzazione",
    accent: "#34d399",
    accentDim: "rgba(52,211,153,0.07)",
    accentBorder: "rgba(52,211,153,0.35)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    key: "giovani",
    label: "Giornata",
    fullLabel: "Giornata tipo",
    accent: "#fbbf24",
    accentDim: "rgba(251,191,36,0.07)",
    accentBorder: "rgba(251,191,36,0.35)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-7 h-7">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1"    x2="12" y2="3"    />
        <line x1="12" y1="21"   x2="12" y2="23"   />
        <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"  />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1"    y1="12"    x2="3"    y2="12"    />
        <line x1="21"   y1="12"    x2="23"   y2="12"    />
        <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36" />
        <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"  />
      </svg>
    ),
  },
  {
    key: "sanita",
    label: "Salute",
    fullLabel: "Situazione sanitaria",
    accent: "#38bdf8",
    accentDim: "rgba(56,189,248,0.07)",
    accentBorder: "rgba(56,189,248,0.35)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export default function ContentPanel({ conflict, content, heroSrc, gallery, onClose }: Props) {
  const [openSection, setOpenSection] = useState<Section | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const gruppoLabel = conflict.gruppo === "trasversale" ? "Sezione trasversale" : `Gruppo ${conflict.gruppo}`;
  const yearsActive = new Date().getFullYear() - conflict.anno;

  const sectionText: Record<Section, string> = {
    contestualizzazione: content?.contestualizzazione ?? "",
    giovani: content?.giovani ?? "",
    sanita: content?.sanita ?? "",
  };

  const stability = stabilityInfo(conflict.stabilita);
  const activeDef = SECTIONS.find((s) => s.key === openSection) ?? null;

  return (
    <div className="h-full flex flex-col bg-zinc-950 animate-slide-in overflow-hidden">

      {/* ── Hero ── */}
      <div className="shrink-0 relative">
        {heroSrc ? (
          <div className="relative h-44 w-full">
            <Image src={heroSrc} alt={conflict.nome} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
          </div>
        ) : (
          <div className="h-20 w-full bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-zinc-950" />
        )}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-bold">
                {gruppoLabel}
              </span>
              <h2 className="text-2xl font-bold text-zinc-100 tracking-tight leading-tight">
                {conflict.nome}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="ml-3 mt-1 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900/80 border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 transition-colors shrink-0 cursor-pointer"
              aria-label="Chiudi"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Metadata ── */}
      <div className="shrink-0 px-6 py-3 border-b border-zinc-800/60 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
        <span className="flex items-center gap-1.5 text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Dal <span className="text-zinc-200 font-medium ml-1">{conflict.anno}</span>
        </span>
        <span className="text-zinc-700">·</span>
        <span className="text-zinc-400">
          <span className="text-zinc-200 font-medium">{yearsActive}</span> anni
        </span>
        <span className="text-zinc-700">·</span>
        <span className="text-zinc-500">{conflict.autori.join(", ")}</span>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto">

        {/* ── Mini report ── */}
        <div className="mx-5 mt-5 mb-4 rounded-2xl border border-zinc-800/50 bg-zinc-900/40 overflow-hidden">
          <div className="px-5 py-3 border-b border-zinc-800/50 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
              Report situazione
            </span>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg border ${stability.cls}`}>
              Stabilità {stability.label}
            </span>
          </div>

          <div className="px-5 py-5 flex items-start gap-5">
            <RadialChart
              criticita={conflict.criticita}
              stabilita={conflict.stabilita}
              anni={yearsActive}
            />
            <div className="flex-1 flex flex-col gap-3 text-xs pt-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-1 rounded-full bg-red-400 shrink-0" />
                <span className="text-zinc-500">Criticità bambini</span>
                <span className="ml-auto font-bold tabular-nums" style={{ color: "#f87171" }}>
                  {conflict.criticita}<span className="text-zinc-600 font-normal">/10</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-1 rounded-full bg-amber-400 shrink-0" />
                <span className="text-zinc-500">Instabilità paese</span>
                <span className="ml-auto font-bold tabular-nums" style={{ color: "#fbbf24" }}>
                  {10 - conflict.stabilita}<span className="text-zinc-600 font-normal">/10</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-1 rounded-full bg-sky-400 shrink-0" />
                <span className="text-zinc-500">Longevità conflitto</span>
                <span className="ml-auto font-bold tabular-nums text-sky-400">
                  {yearsActive} <span className="text-zinc-600 font-normal">anni</span>
                </span>
              </div>
              <div className="mt-1 pt-3 border-t border-zinc-800/60 flex items-center gap-2">
                <span className="text-zinc-500">Rischio umanitario</span>
                <span
                  className="ml-auto text-[11px] font-semibold"
                  style={{
                    color: conflict.criticita >= 9 ? "#f87171"
                         : conflict.criticita >= 7 ? "#fbbf24"
                         : "#a1a1aa",
                  }}
                >
                  {conflict.criticita >= 9 ? "Critico"
                   : conflict.criticita >= 7 ? "Elevato"
                   : "Moderato"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section tiles */}
        <div className="px-5 pb-4 grid grid-cols-3 gap-3">
          {SECTIONS.map((s) => {
            const isOpen = openSection === s.key;
            return (
              <button
                key={s.key}
                onClick={() => setOpenSection(isOpen ? null : s.key)}
                className="rounded-2xl border flex flex-col items-center justify-center gap-2.5 py-5 px-2 cursor-pointer transition-all duration-200 hover:scale-[1.04] active:scale-[0.98]"
                style={{
                  background: isOpen ? s.accentDim : "rgba(24,24,27,0.9)",
                  borderColor: isOpen ? s.accentBorder : "rgba(63,63,70,0.6)",
                  boxShadow: isOpen ? `0 0 20px 0 ${s.accentDim}` : "none",
                }}
              >
                {/* Icon wrapper */}
                <span
                  className="w-12 h-12 flex items-center justify-center rounded-xl transition-colors"
                  style={{
                    background: isOpen ? `${s.accentDim}` : "rgba(39,39,42,0.8)",
                    color: isOpen ? s.accent : "#71717a",
                  }}
                >
                  {s.icon}
                </span>
                <span
                  className="text-[11px] font-semibold tracking-wide leading-tight text-center"
                  style={{ color: isOpen ? s.accent : "#a1a1aa" }}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Expanded section content */}
        {openSection && activeDef && (
          <div
            className="mx-5 mb-5 rounded-xl border overflow-hidden"
            style={{ borderColor: activeDef.accentBorder }}
          >
            {/* Section header */}
            <div
              className="px-5 py-3 border-b flex items-center gap-2.5"
              style={{ borderColor: activeDef.accentBorder, background: activeDef.accentDim }}
            >
              <span style={{ color: activeDef.accent }}>{activeDef.icon}</span>
              <span className="text-sm font-semibold" style={{ color: activeDef.accent }}>
                {activeDef.fullLabel}
              </span>
            </div>
            {/* Section body */}
            <div className="px-5 py-4 bg-zinc-950/60">
              {sectionText[openSection] ? (
                <>
                  <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {sectionText[openSection]}
                  </p>
                  {gallery.length > 0 && (
                    <div className={`mt-4 grid gap-2 ${gallery.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                      {gallery.map((src, i) => (
                        <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-zinc-800">
                          <Image
                            src={src}
                            alt={`${conflict.nome} — ${i + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-zinc-600 italic text-sm">
                  [Da compilare — {conflict.autori.join(", ")}]
                </p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
