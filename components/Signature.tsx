type SignatureProps = {
  autori: string[];
};

export default function Signature({ autori }: SignatureProps) {
  const formatted = autori.join(", ");
  return (
    <p className="mt-5 text-sm text-zinc-600 italic text-right">
      — Firmato: {formatted}
    </p>
  );
}
