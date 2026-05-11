"use client";

import { useState, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { conflicts, isoToSlug } from "@/lib/conflicts";

const GEO_URL = "/countries-110m.json";

const COLORS = {
  ocean: "#09090b",
  land: "#1c1c1f",
  landStroke: "#27272a",
  active: "#166534",
  activeHover: "#15803d",
  activeStroke: "#14532d",
  selected: "#4ade80",
  selectedStroke: "#16a34a",
};

type Props = {
  onSelect: (slug: string) => void;
  selectedSlug: string | null;
  center: [number, number];
  zoom: number;
};

export default function WorldMap({ onSelect, selectedSlug, center, zoom }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div className="w-full h-full" onMouseMove={handleMouseMove}>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 160 }}
        className="w-full h-full"
        style={{ background: COLORS.ocean }}
      >
        <ZoomableGroup
          center={center}
          zoom={zoom}
          maxZoom={8}
          minZoom={1}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const iso = String(geo.id).padStart(3, "0");
                const slug = isoToSlug[iso];
                const isActive = Boolean(slug);
                const isHovered = isActive && hovered === slug;
                const isSelected = isActive && selectedSlug === slug;

                const fill = isSelected
                  ? COLORS.selected
                  : isActive
                    ? isHovered
                      ? COLORS.activeHover
                      : COLORS.active
                    : COLORS.land;

                const stroke = isSelected
                  ? COLORS.selectedStroke
                  : isActive
                    ? COLORS.activeStroke
                    : COLORS.landStroke;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      if (slug) onSelect(slug);
                    }}
                    style={{
                      default: {
                        fill,
                        stroke,
                        strokeWidth: isSelected ? 1 : isActive ? 0.6 : 0.3,
                        outline: "none",
                      },
                      hover: {
                        fill: isActive ? COLORS.activeHover : COLORS.land,
                        stroke,
                        strokeWidth: isActive ? 0.8 : 0.3,
                        outline: "none",
                        cursor: isActive ? "pointer" : "default",
                      },
                      pressed: {
                        fill: isActive ? COLORS.activeHover : COLORS.land,
                        outline: "none",
                      },
                    }}
                    onMouseEnter={() => {
                      if (slug) setHovered(slug);
                    }}
                    onMouseLeave={() => setHovered(null)}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Cursor tooltip - hide when panel is open */}
      {hovered && !selectedSlug && (
        <div
          className="absolute z-10 pointer-events-none"
          style={{ left: mouse.x + 16, top: mouse.y - 10 }}
        >
          <div className="bg-zinc-900/95 backdrop-blur-sm border border-zinc-700 px-4 py-2.5 rounded-lg shadow-2xl">
            <p className="text-sm font-semibold text-zinc-100">
              {conflicts.find((c) => c.slug === hovered)?.nome}
            </p>
            <p className="text-[11px] text-emerald-400 mt-0.5">
              Clicca per esplorare →
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
