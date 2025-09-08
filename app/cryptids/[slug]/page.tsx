import { notFound } from "next/navigation";
import cryptids from "@/lib/cryptids.json";

type Item = { slug: string; name?: string; location?: string; traits?: string; danger?: string; description?: string };

export function generateStaticParams() {
  return (cryptids as Item[]).filter(x => x?.slug).map(x => ({ slug: x.slug }));
}

export const dynamic = "force-static";

export default function CryptidPage({ params }: { params: { slug: string } }) {
  const data = (cryptids as Item[]).find(x => x.slug === params.slug);
  if (!data) return notFound();

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">{data.name ?? params.slug}</h1>
      {data.location && <p className="opacity-80">📍 {data.location}</p>}
      {data.traits && <p className="opacity-80">🧬 {data.traits}</p>}
      {data.danger && <p className="opacity-80">⚠️ Danger: {data.danger}</p>}
      {data.description && <p className="leading-7">{data.description}</p>}
    </main>
  );
}
