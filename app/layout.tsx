import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Newsreader } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Eserciti finanziati, infanzie dimenticate — Collegio San Giuseppe",
  description:
    "Ricerca sui conflitti nel mondo con focus su bambini e adolescenti. Progetto di Italiano, Liceo Scientifico, Collegio San Giuseppe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl" style={{ borderBottomColor: "rgba(22,101,52,0.35)" }}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex flex-col group">
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-400 transition">
                Collegio San Giuseppe — Liceo Scientifico
              </span>
              <span className="text-base font-bold tracking-tight text-zinc-100">
                Eserciti finanziati, infanzie dimenticate
              </span>
            </Link>
            <nav className="flex gap-6 text-sm font-medium text-zinc-400">
              <Link
                href="/"
                className="hover:text-emerald-400 transition-colors"
              >
                Mappa
              </Link>
              <Link
                href="/crediti"
                className="hover:text-emerald-400 transition-colors"
              >
                Crediti
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 w-full pt-[72px]">{children}</main>
      </body>
    </html>
  );
}
