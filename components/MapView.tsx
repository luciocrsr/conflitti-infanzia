"use client";

import { useState, useCallback } from "react";
import WorldMap from "./WorldMap";
import ContentPanel from "./ContentPanel";
import type { Conflict } from "@/lib/conflicts";
import type { ConflictContent } from "@/lib/content";

const DEFAULT_CENTER: [number, number] = [0, 10];
const DEFAULT_ZOOM = 1;
const SELECTED_ZOOM = 4;

type Props = {
  conflicts: Conflict[];
  contents: Record<string, ConflictContent | null>;
  heroes: Record<string, string | null>;
  galleries: Record<string, string[]>;
};

export default function MapView({ conflicts, contents, heroes, galleries }: Props) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);

  const handleSelect = useCallback(
    (slug: string) => {
      if (selectedSlug === slug) return;

      const conflict = conflicts.find((c) => c.slug === slug);
      if (!conflict) return;

      setSelectedSlug(slug);
      setMapCenter(conflict.center);
      setMapZoom(SELECTED_ZOOM);
    },
    [conflicts, selectedSlug]
  );

  const handleClose = useCallback(() => {
    setSelectedSlug(null);
    setMapCenter(DEFAULT_CENTER);
    setMapZoom(DEFAULT_ZOOM);
  }, []);

  const selectedConflict = selectedSlug
    ? conflicts.find((c) => c.slug === selectedSlug) ?? null
    : null;

  const isOpen = selectedConflict !== null;

  return (
    <div className="relative w-full h-[calc(100vh-72px)] overflow-hidden flex">
      {/* Map side */}
      <div
        className="relative h-full transition-all duration-700 ease-out"
        style={{ width: isOpen ? "42%" : "100%" }}
      >
        <WorldMap
          onSelect={handleSelect}
          selectedSlug={selectedSlug}
          center={mapCenter}
          zoom={mapZoom}
        />

        {/* Title overlay */}
        <div
          className={`absolute top-8 left-0 right-0 z-10 text-center pointer-events-none transition-opacity duration-500 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-100 drop-shadow-lg">
            Conflitti nel mondo
          </h1>
          <p className="mt-3 text-xl sm:text-2xl text-zinc-400 max-w-xl mx-auto drop-shadow">
            Eserciti finanziati, infanzie dimenticate
          </p>
        </div>

        {isOpen && selectedConflict && (
          <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
            <p className="text-lg font-bold text-zinc-100 drop-shadow-lg">
              {selectedConflict.nome}
            </p>
          </div>
        )}

        <div
          className={`absolute bottom-4 left-0 right-0 z-10 text-center pointer-events-none transition-opacity duration-500 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="text-xs text-zinc-600">
            Rotella per zoomare · Trascina per spostare
          </p>
        </div>
      </div>

      {/* Preview panel */}
      {isOpen && selectedConflict && (
        <div className="h-full border-l border-zinc-800" style={{ width: "58%" }}>
          <ContentPanel
            key={selectedConflict.slug}
            conflict={selectedConflict}
            content={contents[selectedConflict.slug] ?? null}
            heroSrc={heroes[selectedConflict.slug] ?? null}
            gallery={galleries[selectedConflict.slug] ?? []}
            onClose={handleClose}
          />
        </div>
      )}
    </div>
  );
}
