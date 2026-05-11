// Metadata dei 16 conflitti coperti dal progetto scolastico.

export type Conflict = {
  slug: string;
  nome: string;
  autori: string[];
  gruppo: 1 | 2 | 3 | "trasversale";
  isoNumeric: string[];
  /** [longitude, latitude] approximate center for map zoom */
  center: [number, number];
  /** Year the current phase of conflict started/escalated */
  anno: number;
  /** 1–10: impatto sui bambini (10 = massima criticità) */
  criticita: number;
  /** 1–10: stabilità del paese (10 = molto stabile, 1 = totalmente instabile) */
  stabilita: number;
};

export const conflicts: Conflict[] = [
  {
    slug: "ucraina-russia",
    nome: "Ucraina / Russia",
    autori: ["Corsaro", "Bauducco"],
    gruppo: 1,
    isoNumeric: ["804", "643"],
    center: [31, 49],
    anno: 2022,
    criticita: 9,
    stabilita: 3,
  },
  {
    slug: "colombia",
    nome: "Colombia",
    autori: ["Casalini"],
    gruppo: 1,
    isoNumeric: ["170"],
    center: [-74, 4],
    anno: 1964,
    criticita: 7,
    stabilita: 5,
  },
  {
    slug: "palestina-israele",
    nome: "Palestina / Israele",
    autori: ["D'Abramo", "Urlovas", "Fino", "Mazzuco"],
    gruppo: 1,
    isoNumeric: ["275", "376"],
    center: [35, 31.5],
    anno: 2023,
    criticita: 10,
    stabilita: 1,
  },
  {
    slug: "iran",
    nome: "Iran",
    autori: ["D'Abramo", "Urlovas", "Fino", "Mazzuco"],
    gruppo: 1,
    isoNumeric: ["364"],
    center: [53, 32],
    anno: 2022,
    criticita: 6,
    stabilita: 4,
  },
  {
    slug: "sudan",
    nome: "Sudan",
    autori: ["Raviola", "Cenci"],
    gruppo: 2,
    isoNumeric: ["729"],
    center: [30, 15],
    anno: 2023,
    criticita: 10,
    stabilita: 2,
  },
  {
    slug: "yemen",
    nome: "Yemen",
    autori: ["Grosso", "Pischiutta"],
    gruppo: 2,
    isoNumeric: ["887"],
    center: [48, 15.5],
    anno: 2014,
    criticita: 10,
    stabilita: 2,
  },
  {
    slug: "myanmar",
    nome: "Myanmar",
    autori: ["Magro", "Di Stefano"],
    gruppo: 2,
    isoNumeric: ["104"],
    center: [96, 19],
    anno: 2021,
    criticita: 8,
    stabilita: 2,
  },
  {
    slug: "burkina-faso",
    nome: "Burkina Faso",
    autori: ["Riccaldone"],
    gruppo: 3,
    isoNumeric: ["854"],
    center: [-1.5, 12],
    anno: 2015,
    criticita: 8,
    stabilita: 3,
  },
  {
    slug: "mali",
    nome: "Mali",
    autori: ["Tomaino"],
    gruppo: 3,
    isoNumeric: ["466"],
    center: [-2, 17],
    anno: 2012,
    criticita: 7,
    stabilita: 3,
  },
  {
    slug: "niger",
    nome: "Niger",
    autori: ["Tomaino"],
    gruppo: 3,
    isoNumeric: ["562"],
    center: [8, 16],
    anno: 2015,
    criticita: 7,
    stabilita: 3,
  },
  {
    slug: "somalia",
    nome: "Somalia",
    autori: ["Gai"],
    gruppo: 3,
    isoNumeric: ["706"],
    center: [46, 5],
    anno: 1991,
    criticita: 9,
    stabilita: 2,
  },
  {
    slug: "rdc",
    nome: "Repubblica Democratica del Congo",
    autori: ["Fonbergen"],
    gruppo: 3,
    isoNumeric: ["180"],
    center: [24, -3],
    anno: 1996,
    criticita: 9,
    stabilita: 2,
  },
  {
    slug: "etiopia",
    nome: "Etiopia",
    autori: ["Fonbergen"],
    gruppo: 3,
    isoNumeric: ["231"],
    center: [40, 9],
    anno: 2020,
    criticita: 8,
    stabilita: 4,
  },
  {
    slug: "haiti",
    nome: "Haiti",
    autori: ["Olivieri"],
    gruppo: 3,
    isoNumeric: ["332"],
    center: [-72, 19],
    anno: 2004,
    criticita: 8,
    stabilita: 2,
  },
  {
    slug: "afghanistan",
    nome: "Afghanistan",
    autori: ["Balistrieri"],
    gruppo: 3,
    isoNumeric: ["004"],
    center: [67, 33],
    anno: 2001,
    criticita: 8,
    stabilita: 3,
  },
  {
    slug: "messico",
    nome: "Messico",
    autori: ["Corsaro", "Raviola", "Riccaldone"],
    gruppo: "trasversale",
    isoNumeric: ["484"],
    center: [-102, 23],
    anno: 2006,
    criticita: 7,
    stabilita: 5,
  },
];

// Mappa ISO numerico -> slug del conflitto, per la cartina.
export const isoToSlug: Record<string, string> = Object.fromEntries(
  conflicts.flatMap((c) => c.isoNumeric.map((iso) => [iso, c.slug])),
);

export function getConflict(slug: string): Conflict | undefined {
  return conflicts.find((c) => c.slug === slug);
}
