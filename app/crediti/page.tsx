import Link from "next/link";
import { conflicts } from "@/lib/conflicts";

export const metadata = {
  title: "Crediti — Eserciti finanziati, infanzie dimenticate",
};

const fullNames: Record<string, string[]> = {
  "ucraina-russia":    ["Lucio Corsaro", "Luca Bauducco"],
  "colombia":          ["Gregorio Casalini"],
  "palestina-israele": ["Alessandro D'Abramo", "Ramunas Urlovas", "Ludovica Fino Mazzucco"],
  "iran":              ["Alessandro D'Abramo", "Ramunas Urlovas", "Ludovica Fino Mazzucco"],
  "sudan":             ["Alessandro Nicolò Raviola", "Andrea Cenci"],
  "yemen":             ["Cesare Grosso", "Allegra Pischiutta"],
  "myanmar":           ["Pietro Magro", "Camillo Di Stefano"],
  "burkina-faso":      ["Alessandro Riccaldone"],
  "mali":              ["Jacopo Tomaino"],
  "niger":             ["Jacopo Tomaino"],
  "somalia":           ["Umberto Gai"],
  "rdc":               ["Alex von Berger"],
  "etiopia":           ["Alex von Berger"],
  "haiti":             ["Edoardo Olivieri"],
  "afghanistan":       ["Andrea Balistrieri"],
  "messico":           ["Lucio Corsaro", "Alessandro Nicolò Raviola", "Alessandro Riccaldone"],
  "cuba":              ["Lucio Corsaro"],
};

const fonti = [
  { nome: "UNICEF", url: "https://www.unicef.org" },
  { nome: "UNHCR", url: "https://www.unhcr.org" },
  { nome: "Human Rights Watch", url: "https://www.hrw.org" },
  { nome: "World Food Programme", url: "https://www.wfp.org" },
  { nome: "ONU News", url: "https://news.un.org/it" },
  { nome: "Médecins Sans Frontières", url: "https://www.msf.org" },
  { nome: "Save the Children", url: "https://www.savethechildren.org" },
  { nome: "Amnesty International", url: "https://www.amnesty.org" },
  { nome: "OCHA – UN Office for the Coordination of Humanitarian Affairs", url: "https://www.unocha.org" },
  { nome: "ReliefWeb", url: "https://reliefweb.int" },
];

export default function CreditiPage() {
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

      {/* Racconto del lavoro */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-zinc-100 mb-5">Il lavoro</h2>
        <div className="space-y-4 text-zinc-400 leading-relaxed">
          <p>
            Questo progetto è nato da una domanda: cosa succede ai bambini nelle guerre che i telegiornali smettono di nominare dopo qualche settimana? Sedici paesi, sedici risposte diverse. Ogni studente ha scelto o ricevuto un conflitto e ha condotto una ricerca indipendente, partendo dai rapporti delle principali organizzazioni umanitarie internazionali.
          </p>
          <p>
            Ogni scheda è strutturata in tre sezioni: il contesto storico e politico del conflitto, la giornata tipo di un bambino che ci vive, la situazione sanitaria del paese. L&apos;obiettivo non era elencare statistiche, ma costruire un racconto — dare un volto a qualcosa che i numeri da soli non riescono a trasmettere.
          </p>
          <p>
            Il progetto è stato realizzato nell&apos;ambito delle ore di italiano, come lavoro di ricerca e scrittura collettiva. La mappa interattiva è stata sviluppata per rendere il materiale consultabile in modo diretto.
          </p>
        </div>
      </section>

      {/* Lista conflitti con autori */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-zinc-100 mb-5">Autori per scheda</h2>
        <ul className="space-y-3">
          {conflicts.map((c) => {
            const names = fullNames[c.slug];
            if (!names) return null;
            return (
              <li key={c.slug} className="flex items-baseline justify-between gap-4 py-2 border-b border-zinc-800/40">
                <Link
                  href={`/conflitto/${c.slug}`}
                  className="text-zinc-200 font-medium hover:text-red-400 transition-colors shrink-0"
                >
                  {c.nome}
                </Link>
                <span className="text-sm text-zinc-500 text-right">
                  {names.join(", ")}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Fonti */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-zinc-100 mb-5">Fonti principali</h2>
        <p className="text-zinc-500 text-sm mb-5 leading-relaxed">
          La ricerca si è basata principalmente su rapporti, comunicati e dati pubblicati dalle seguenti organizzazioni internazionali.
        </p>
        <ul className="space-y-2">
          {fonti.map((f) => (
            <li key={f.nome}>
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 hover:text-red-400 transition-colors inline-flex items-center gap-1.5"
              >
                {f.nome}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 opacity-50">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="pt-6 border-t border-zinc-800">
        <Link href="/" className="text-sm text-zinc-600 hover:text-red-400 transition-colors">
          ← Torna alla mappa
        </Link>
      </div>
    </div>
  );
}
