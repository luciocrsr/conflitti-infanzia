import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { conflicts, getConflict } from "@/lib/conflicts";
import { loadConflictContent, getConflictImages } from "@/lib/content";

function renderText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i} className="text-zinc-100 font-semibold">{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*"))
      return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}

export function generateStaticParams() {
  return conflicts.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const conflict = getConflict(slug);
  if (!conflict) return {};
  return { title: `${conflict.nome} — Eserciti finanziati, infanzie dimenticate` };
}

export default async function ConflictPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const conflict = getConflict(slug);
  if (!conflict) notFound();

  const content = loadConflictContent(slug);
  const { hero, gallery } = getConflictImages(slug);

  const gruppoLabel =
    conflict.gruppo === "trasversale"
      ? "Sezione trasversale"
      : `Gruppo ${conflict.gruppo}`;

  const yearsActive = new Date().getFullYear() - conflict.anno;

  const sections = [
    { key: "contestualizzazione", title: "Contestualizzazione", text: content?.contestualizzazione },
    { key: "giovani", title: "Giornata tipo dei giovani e bambini", text: content?.giovani },
    { key: "sanita", title: "Situazione sanitaria", text: content?.sanita },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero */}
      <div className="relative w-full h-[55vh] min-h-[320px]">
        {hero ? (
          <Image
            src={hero}
            alt={conflict.nome}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/60 via-zinc-900 to-zinc-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

        {/* Back link */}
        <Link
          href="/"
          className="absolute top-6 left-6 text-sm text-zinc-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 bg-zinc-950/60 backdrop-blur px-3 py-1.5 rounded-full border border-zinc-800/60"
        >
          ← Torna alla mappa
        </Link>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-10 max-w-5xl mx-auto">
          <span className="inline-block text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-bold mb-3">
            {gruppoLabel}
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold text-zinc-100 tracking-tight mb-4" style={{ fontFamily: "var(--font-newsreader)" }}>
            {conflict.nome}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
            <span>
              Dal{" "}
              <span className="text-zinc-200 font-semibold">{conflict.anno}</span>
              {" "}·{" "}
              <span className="text-zinc-200 font-semibold">{yearsActive}</span> anni di conflitto
            </span>
            <span className="text-zinc-700">|</span>
            <span>A cura di: <span className="text-zinc-300">{conflict.autori.join(", ")}</span></span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Sections — images interspersed after each section */}
        {sections.map(({ key, title, text }, idx) => (
          <section key={key} className="mb-16">
            <h2 className="text-2xl font-bold text-zinc-100 mb-6 pb-4 border-b border-zinc-800/60 flex items-center gap-3">
              <span className="w-1 h-6 bg-red-500 rounded-full shrink-0" />
              {title}
            </h2>

            {text ? (
              <div className="text-zinc-300 leading-[1.85] text-[15.5px] whitespace-pre-wrap">
                {renderText(text)}
              </div>
            ) : (
              <p className="text-zinc-600 italic">
                [Da compilare — {conflict.autori.join(", ")}]
              </p>
            )}

            {text && (
              <p className="mt-6 text-sm text-zinc-600 italic text-right">
                — {conflict.autori.join(", ")}
              </p>
            )}

            {/* Image for this section (gallery[0] after first section, gallery[1] after second, etc.) */}
            {gallery[idx] && (
              <div className="mt-10 relative w-full rounded-xl overflow-hidden bg-zinc-800">
                <Image
                  src={gallery[idx]}
                  alt={`${conflict.nome} — ${title}`}
                  width={1200}
                  height={700}
                  className="w-full object-cover max-h-[480px]"
                />
                <p className="text-[11px] text-zinc-600 text-right mt-1.5 pr-1">
                  Fonte: Wikimedia Commons / CC
                </p>
              </div>
            )}

            {/* If more images than sections, show remaining ones as 2-col grid after last section */}
            {idx === sections.length - 1 && gallery.length > sections.length && (
              <div className={`mt-10 grid gap-3 ${gallery.slice(sections.length).length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                {gallery.slice(sections.length).map((src, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-800">
                    <Image
                      src={src}
                      alt={`${conflict.nome} — immagine extra ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* Footer nav */}
        <div className="pt-8 border-t border-zinc-800 flex justify-between items-center">
          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
          >
            ← Torna alla mappa
          </Link>
          <Link
            href="/crediti"
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Crediti →
          </Link>
        </div>
      </div>
    </div>
  );
}
