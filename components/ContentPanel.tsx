"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Conflict } from "@/lib/conflicts";
import type { ConflictContent } from "@/lib/content";

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
  if (s <= 2) return { label: "Critica",  cls: "text-red-400    bg-red-950/50    border-red-800/60"    };
  if (s <= 4) return { label: "Alta",     cls: "text-orange-400 bg-orange-950/50 border-orange-800/60" };
  if (s <= 6) return { label: "Moderata", cls: "text-amber-300  bg-amber-950/50  border-amber-800/60"  };
  if (s <= 8) return { label: "Bassa",    cls: "text-lime-400   bg-lime-950/50   border-lime-800/60"   };
  return             { label: "Minima",   cls: "text-red-400    bg-red-950/50    border-red-800/60"   };
}

// ─── Radial chart ─────────────────────────────────────────────────────────────

function RadialChart({ criticita, stabilita, anni }: { criticita: number; stabilita: number; anni: number }) {
  const cx = 52, cy = 52;
  const rings = [
    { r: 46, fraction: criticita / 10,          color: "#f87171", track: "#2d1010" },
    { r: 34, fraction: (10 - stabilita) / 10,   color: "#fbbf24", track: "#2d1f08" },
    { r: 22, fraction: Math.min(anni / 35, 1),  color: "#38bdf8", track: "#081e2d" },
  ];
  return (
    <svg viewBox="0 0 104 104" className="w-[96px] h-[96px] shrink-0">
      {rings.map(({ r, fraction, color, track }) => (
        <g key={r}>
          <path d={trackPath(cx, cy, r)} fill="none" stroke={track} strokeWidth="5" strokeLinecap="round" />
          <path d={arcPath(cx, cy, r, fraction)} fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

// ─── Brief text extractor ─────────────────────────────────────────────────────

function brief(text: string, max = 190): string {
  const clean = text.replace(/\*\*/g, "").replace(/\*/g, "").replace(/^#+\s*/gm, "").trim();
  const first = clean.split(/\n\n+/)[0].trim();
  if (first.length <= max) return first;
  const cut = first.slice(0, max);
  return cut.replace(/\s+\S*$/, "") + "…";
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ContentPanel({ conflict, content, heroSrc, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const gruppoLabel = conflict.gruppo === "trasversale" ? "Sezione trasversale" : `Gruppo ${conflict.gruppo}`;
  const yearsActive = new Date().getFullYear() - conflict.anno;
  const stability = stabilityInfo(conflict.stabilita);

  const briefs = [
    { label: "Contesto",           text: content?.contestualizzazione ?? "" },
    { label: "Giornata tipo",      text: content?.giovani ?? "" },
    { label: "Situazione sanitaria", text: content?.sanita ?? "" },
  ];

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
          <div className="h-20 w-full bg-gradient-to-br from-red-950/40 via-zinc-900 to-zinc-950" />
        )}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-red-400 font-bold">
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
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
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
      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">

        {/* ── Report grafico ── */}
        <div className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 overflow-hidden">
          <div className="px-5 py-3 border-b border-zinc-800/50 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
              Report situazione
            </span>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg border ${stability.cls}`}>
              Stabilità {stability.label}
            </span>
          </div>
          <div className="px-5 py-5 flex items-start gap-5">
            <RadialChart criticita={conflict.criticita} stabilita={conflict.stabilita} anni={yearsActive} />
            <div className="flex-1 flex flex-col gap-3 text-xs pt-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-1 rounded-full bg-red-400 shrink-0" />
                <span className="text-zinc-500">Criticità bambini</span>
                <span className="ml-auto font-bold tabular-nums" style={{ color: "#f87171" }}>
                  {conflict.criticita * 10}<span className="text-zinc-600 font-normal">%</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-1 rounded-full bg-amber-400 shrink-0" />
                <span className="text-zinc-500">Instabilità paese</span>
                <span className="ml-auto font-bold tabular-nums" style={{ color: "#fbbf24" }}>
                  {(10 - conflict.stabilita) * 10}<span className="text-zinc-600 font-normal">%</span>
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
                    color: conflict.criticita >= 9 ? "#f87171" : conflict.criticita >= 7 ? "#fbbf24" : "#a1a1aa",
                  }}
                >
                  {conflict.criticita >= 9 ? "Critico" : conflict.criticita >= 7 ? "Elevato" : "Moderato"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Brief summaries ── */}
        <div className="flex flex-col gap-3">
          {briefs.map(({ label, text }) => text ? (
            <div key={label} className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-zinc-500 mb-1.5">{label}</p>
              <p className="text-sm text-zinc-300 leading-relaxed">{brief(text)}</p>
            </div>
          ) : null)}
        </div>

        {/* ── CTA ── */}
        <Link
          href={`/conflitto/${conflict.slug}`}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-950/40 border border-red-900/50 text-red-400 text-sm font-semibold hover:bg-red-950/70 hover:border-red-800 transition-colors"
        >
          Leggi la scheda completa
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>

      </div>
    </div>
  );
}
