import MapView from "@/components/MapView";
import { conflicts } from "@/lib/conflicts";
import { loadConflictContent, getConflictImages } from "@/lib/content";
import type { ConflictContent } from "@/lib/content";

export default function Home() {
  const contents: Record<string, ConflictContent | null> = {};
  const heroes: Record<string, string | null> = {};
  const galleries: Record<string, string[]> = {};

  for (const c of conflicts) {
    contents[c.slug] = loadConflictContent(c.slug);
    const { hero, gallery } = getConflictImages(c.slug);
    heroes[c.slug] = hero;
    galleries[c.slug] = gallery;
  }

  return <MapView conflicts={conflicts} contents={contents} heroes={heroes} galleries={galleries} />;
}
