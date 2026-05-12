import Link from "next/link";
import { conflicts } from "@/lib/conflicts";

type Gruppo = 1 | 2 | 3 | "trasversale";

const gruppoTitolo: Record<Gruppo, string> = {
  1: "Gruppo 1",
  2: "Gruppo 2",
  3: "Gruppo 3",
  trasversale: "Sezione trasversale",
};

export const metadata = {
  title: "Crediti — Eserciti finanziati, infanzie dimenticate",
};

export default function CreditiPage() {
  const byGruppo: Record<Gruppo, typeof conflicts> = {
    1: [],
    2: [],
    3: [],
    trasversale: [],
  };

  for (const c of conflicts) {
    byGruppo[c.gruppo].push(c);
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Link
        href="/"
        className="text-sm text-zinc-500 hover:text-red-400 transition-colors inline-flex items-center gap-1.5 mb-8"
      >
        ← Torna alla mappa
      </Link>

      <header className="mb-12 pb-8 border-b border-zinc-800">
        <h1 className="text-4xl font-bold text-zinc-100 mb-3 tracking-tight">
          Crediti
        </h1>
        <p className="text-zinc-500">
          Classe 2ª Liceo Scientifico · Collegio San Giuseppe · A.S. 2025/2026
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-xl font-bold text-zinc-100 mb-4">
          Come leggere il lavoro
        </h2>
        <p className="text-zinc-400 leading-relaxed text-justify">
          La ricerca è divisa in tre gruppi geografici. Ogni scheda paese è
          firmata dallo studente (o dagli studenti) che l'ha redatta: la
          responsabilità del contenuto è di chi firma. La sezione trasversale
          sul Messico è curata dai tre capigruppo.
        </p>
      </section>

      {(Object.keys(gruppoTitolo) as Gruppo[]).map((g) => (
        <section key={String(g)} className="mb-10">
          <h2 className="text-lg font-bold text-zinc-100 mb-4 pb-2 border-b border-zinc-800">
            {gruppoTitolo[g]}
          </h2>
          <ul className="space-y-3">
            {byGruppo[g].map((c) => (
              <li key={c.slug} className="flex items-baseline justify-between gap-4">
                <Link
                  href={`/conflitto/${c.slug}`}
                  className="text-zinc-200 font-medium hover:text-red-400 transition-colors"
                >
                  {c.nome}
                </Link>
                <span className="text-sm text-zinc-500 text-right">
                  {c.autori.join(", ")}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
