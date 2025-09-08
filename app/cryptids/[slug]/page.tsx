import cryptids from "@/lib/cryptids.json";

type Item = {
  slug?: string;
  name?: string;
  location?: string;
  traits?: string;
  danger?: string;
  description?: string;
};

export const dynamic = "force-dynamic"; // never 404 due to missing SSG

function toTitle(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function CryptidPage({ params }: { params: { slug: string } }) {
  const list = (cryptids as Item[]) ?? [];
  const data =
    list.find((x) => x?.slug === params.slug) ??
    ({ slug: params.slug, name: toTitle(params.slug) } as Item);

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">{data.name}</h1>
      {data.location && <p className="opacity-80">📍 {data.location}</p>}
      {data.traits && <p className="opacity-80">🧬 {data.traits}</p>}
      {data.danger && <p className="opacity-80">⚠️ Danger: {data.danger}</p>}
      {data.description ? (
        <p className="leading-7">{data.description}</p>
      ) : (
        <p className="leading-7 opacity-80">
          No description yet. Coming soon to The Cryptidex 🐾
        </p>
      )}
    </main>
  );
}
