import Signature from "./Signature";

type SectionProps = {
  title: string;
  children: React.ReactNode;
  autori: string[];
};

export default function Section({ title, children, autori }: SectionProps) {
  return (
    <section className="mb-14">
      <h2 className="text-2xl font-bold text-zinc-100 mb-5 pb-3 border-b border-zinc-800">
        {title}
      </h2>
      <div className="text-justify text-zinc-300 leading-relaxed whitespace-pre-wrap">
        {children}
      </div>
      <Signature autori={autori} />
    </section>
  );
}
