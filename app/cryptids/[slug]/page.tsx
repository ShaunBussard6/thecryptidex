import Image from "next/image";
import { getCryptidBySlug } from "@/lib/cryptid-data";

export const dynamic = "force-dynamic";

function toTitle(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

export default function CryptidPage({ params }: { params: { slug: string } }) {
  const c = getCryptidBySlug(params.slug) ?? { slug: params.slug, name: toTitle(params.slug) };

  const img = (c as any).image as string | undefined;

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">{c.name}</h1>
      {(c as any).location && <p className="opacity-80">📍 {(c as any).location}</p>}
      {(c as any).traits && <p className="opacity-80">🧬 {(c as any).traits}</p>}
      {(c as any).danger && <p className="opacity-80">⚠️ Danger: {(c as any).danger}</p>}

      {img && (
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl border">
          <Image
            src={img}
            alt={c.name || c.slug}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            unoptimized
            style={{ objectFit: "cover" }}
          />
        </div>
      )}

      {(c as any).description ? (
        <p className="leading-7">{(c as any).description}</p>
      ) : (
        <p className="leading-7 opacity-80">
          No description yet. Coming soon to The Cryptidex 🐾
        </p>
      )}
    </main>
  );
}
