# Conflitti e Infanzia

Progetto scolastico di Italiano — Classe 2ª Liceo Scientifico, Collegio San Giuseppe.
Ricerca sui conflitti nel mondo con focus su bambini e adolescenti.

**Deadline: 2-3 maggio 2026.**

---

## 📝 Come scrivere il tuo contributo (per i compagni)

1. Apri la cartella `content/conflitti/`
2. Trova il file con il nome del tuo paese (es. `ucraina-russia.md`, `sudan.md`, `yemen.md`)
3. Apri il file in un editor di testo qualsiasi (o Obsidian, VS Code, TextEdit)
4. **Non toccare la parte in alto tra i `---`** (sono i metadati: nome, autori, gruppo)
5. Scrivi il tuo testo sotto ciascuna delle 3 sezioni:
   - `## Contestualizzazione` — storia del conflitto, cause, attori coinvolti, timeline
   - `## Giornata tipo` — come vivono i bambini e gli adolescenti in quella zona
   - `## Situazione sanitaria` — sanità, accesso a cure, malattie, mortalità infantile
6. Salva il file

Non c'è un limite di lunghezza. Scrivi quanto serve per raccontare bene.

**Esempio di file dopo la tua scrittura:**

```markdown
---
slug: sudan
nome: Sudan
autori: [Raviola, Cenci]
gruppo: 2
---

## Contestualizzazione

Il Sudan è attraversato da una guerra civile iniziata ad aprile 2023
tra le forze armate sudanesi (SAF) e le Rapid Support Forces (RSF)...

## Giornata tipo

Un bambino di 10 anni a Khartoum si sveglia alle 6 del mattino...

## Situazione sanitaria

Il 70% degli ospedali nelle zone di conflitto è chiuso o parzialmente
operativo...
```

### Se non sai usare Git/GitHub

Nessun problema. Scrivi nel file sul tuo computer e passa il file (o anche solo
il testo) a Lucio su WhatsApp. Ci pensa lui a inserirlo.

---

## 🗺️ Chi scrive cosa

| Paese | File | Autore/i | Gruppo |
|---|---|---|---|
| Ucraina / Russia | `ucraina-russia.md` | Corsaro, Bauducco | 1 |
| Colombia | `colombia.md` | Casalini | 1 |
| Palestina / Israele | `palestina-israele.md` | D'Abramo, Urlovas, Fino, Mazzuco | 1 |
| Iran | `iran.md` | D'Abramo, Urlovas, Fino, Mazzuco | 1 |
| Sudan | `sudan.md` | Raviola, Cenci | 2 |
| Yemen | `yemen.md` | Grosso, Pischiutta | 2 |
| Myanmar | `myanmar.md` | Magro, Di Stefano | 2 |
| Burkina Faso | `burkina-faso.md` | Riccaldone | 3 |
| Mali | `mali.md` | Tomaino | 3 |
| Niger | `niger.md` | Tomaino | 3 |
| Somalia | `somalia.md` | Gai | 3 |
| RDC | `rdc.md` | Fonbergen | 3 |
| Etiopia | `etiopia.md` | Fonbergen | 3 |
| Haiti | `haiti.md` | Olivieri | 3 |
| Afghanistan | `afghanistan.md` | Balistrieri | 3 |
| Messico (narcos/gang) | `messico.md` | Corsaro, Raviola, Riccaldone | Trasversale |

---

## 💻 Come far girare il sito in locale (solo per chi sviluppa)

```bash
npm install --legacy-peer-deps --ignore-scripts
npm run dev
```

Poi apri [http://localhost:3000](http://localhost:3000).

### Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4**
- **react-simple-maps** per la cartina interattiva
- **world-atlas** per i dati geografici (110m TopoJSON, `public/countries-110m.json`)
- Contenuti in Markdown (`content/conflitti/*.md`) letti con `gray-matter`

### Struttura

```
conflitti-infanzia/
├── app/
│   ├── layout.tsx              # header + footer condivisi
│   ├── page.tsx                # homepage con cartina + griglia
│   ├── conflitto/[slug]/       # template scheda paese
│   └── crediti/                # pagina crediti con elenco per gruppo
├── components/
│   ├── WorldMap.tsx            # cartina interattiva
│   ├── Section.tsx             # sezione con titolo + firma
│   └── Signature.tsx           # box firma "— Firmato: ..."
├── lib/
│   ├── conflicts.ts            # metadata dei 16 conflitti
│   └── content.ts              # loader markdown con gray-matter
├── content/conflitti/          # 16 file .md (uno per paese)
└── public/
    └── countries-110m.json     # cartina del mondo (TopoJSON)
```

### Note tecniche

- I file markdown vengono letti a build-time (pagine statiche via
  `generateStaticParams`)
- La cartina è lato client (`"use client"`) perché react-simple-maps richiede
  il DOM
- I codici ISO 3166-1 numerici in `lib/conflicts.ts` servono a matchare i paesi
  con le features del TopoJSON
- `--ignore-scripts` serve per aggirare un bug di `unrs-resolver` nell'ambiente
  corrente
- `--legacy-peer-deps` serve perché react-simple-maps non ha peer deps
  aggiornate a React 19

---

## 📄 Testo unico firmato

Il sito si legge come ipertesto, ma la consegna alla prof includerà anche
un **PDF unico** che raccoglie tutte le schede in ordine, ciascuna firmata dal
responsabile. Il generatore PDF arriverà in un secondo momento.
