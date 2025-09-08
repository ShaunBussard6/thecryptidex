import Link from "next/link";
import Image from "next/image";
import { list } from "@/lib/cryptid-data";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">The Cryptidex</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((c) => (
          <Link key={c.slug} href={`/cryptids/${c.slug}`} className="group rounded-xl border overflow-hidden">
            {c.image && (
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={c.image}
                  alt={c.name || c.slug}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold group-hover:underline">{c.name || c.slug}</h2>
              {c.location && <p className="text-sm opacity-70">📍 {c.location}</p>}
              {c.description && <p className="text-sm opacity-80 line-clamp-3">{c.description}</p>}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
