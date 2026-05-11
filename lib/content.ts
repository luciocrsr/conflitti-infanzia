import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "conflitti");
const IMAGE_EXTS = /\.(jpg|jpeg|webp|png)$/i;

export type ConflictContent = {
  slug: string;
  contestualizzazione: string;
  giovani: string;
  sanita: string;
};

export type ConflictImages = {
  hero: string | null;
  gallery: string[];
};

export function getConflictImages(slug: string): ConflictImages {
  const dir = path.join(process.cwd(), "public", "images", slug);
  if (!fs.existsSync(dir)) return { hero: null, gallery: [] };

  const files = fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXTS.test(f))
    .sort();

  const heroFile = files.find((f) => f.startsWith("hero")) ?? files[0] ?? null;
  const hero = heroFile ? `/images/${slug}/${heroFile}` : null;
  const gallery = files
    .filter((f) => f !== heroFile)
    .map((f) => `/images/${slug}/${f}`);

  return { hero, gallery };
}

/**
 * Legge un file markdown in content/conflitti/{slug}.md e restituisce le tre
 * sezioni separate. Il formato atteso usa heading di secondo livello:
 *
 *   ## Contestualizzazione
 *   ...testo...
 *
 *   ## Giornata tipo
 *   ...testo...
 *
 *   ## Situazione sanitaria
 *   ...testo...
 */
export function loadConflictContent(slug: string): ConflictContent | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);

  const sections = splitSections(content);

  return {
    slug,
    contestualizzazione: sections["contestualizzazione"] ?? "",
    giovani: sections["giornata tipo"] ?? "",
    sanita: sections["situazione sanitaria"] ?? "",
  };
}

function splitSections(markdown: string): Record<string, string> {
  const lines = markdown.split("\n");
  const sections: Record<string, string> = {};
  let currentKey: string | null = null;
  let buffer: string[] = [];

  const commit = () => {
    if (currentKey !== null) {
      sections[currentKey] = buffer.join("\n").trim();
    }
  };

  for (const line of lines) {
    const match = /^##\s+(.+?)\s*$/.exec(line);
    if (match) {
      commit();
      currentKey = normalizeHeading(match[1]);
      buffer = [];
    } else if (currentKey !== null) {
      buffer.push(line);
    }
  }
  commit();

  return sections;
}

function normalizeHeading(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[\/\\]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/giovani\s*\/?\s*bambini/, "giovani")
    .replace(/bambini\s*\/?\s*giovani/, "giovani")
    .replace(/^giornata tipo.*/, "giornata tipo")
    .trim();
}
