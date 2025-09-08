'use client';

import { useState } from 'react';
import cryptids from '@/lib/cryptids.json';
import { Search, MapPin, AlertTriangle, Eye, Filter } from 'lucide-react';
import Badge from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

type Cryptid = {
  slug: string;
  'cryptid-name': string;
  Type: string;
  Traits: string;
  'Specific Location(s)': string;
  'Danger Level': number;
  image: string;
};

const getDangerColor = (level: number) => {
  if (level < 2) return 'bg-green-600 text-white border-green-600';
  if (level < 5) return 'bg-yellow-500 text-black border-yellow-500';
  if (level < 8) return 'bg-red-600 text-white border-red-600';
  return 'bg-gray-600 text-white border-gray-600';
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCryptids = cryptids.filter((cryptid: Cryptid) =>
    cryptid['cryptid-name'].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-amber-50 font-mono">
      {/* Header */}
      <header className="text-center py-10">
        <h1 className="text-5xl font-bold tracking-wide text-red-500">THE CRYPTIDEX</h1>
        <p className="text-lg text-white mt-2">The World's Most Comprehensive Cryptid Directory</p>
      </header>

      {/* Search */}
      <div className="max-w-xl mx-auto px-4">
        <div className="relative mb-10">
          <input
            type="text"
            placeholder="Search cryptids by name..."
            className="w-full px-4 py-2 rounded-md border border-amber-300 bg-black text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute top-2.5 right-3 text-amber-300" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-16">
        {filteredCryptids.map((cryptid: Cryptid) => (
          <Link href={`/cryptids/${cryptid.slug}`} key={cryptid.slug}>
            <div className="bg-neutral-900 border border-amber-600 p-4 rounded-lg hover:bg-neutral-800 transition">
              <div className="relative h-48 w-full mb-3">
                <Image
                  src={`/images/${cryptid.image}`}
                  alt={cryptid['cryptid-name']}
                  layout="fill"
                  objectFit="contain"
                  className="rounded shadow-lg"
                />
              </div>
              <h2 className="text-xl font-bold mb-2">{cryptid['cryptid-name']}</h2>
              <p className="text-sm mb-1">
                <MapPin className="inline-block w-4 h-4 mr-1" />
                {cryptid['Specific Location(s)']}
              </p>
              <p className="text-sm mb-1">
                <Eye className="inline-block w-4 h-4 mr-1" />
                Traits: {cryptid.Traits}
              </p>
              <Badge className={`mt-2 ${getDangerColor(cryptid['Danger Level'])}`}>
                <AlertTriangle className="inline-block w-4 h-4 mr-1" />
                Danger Level: {cryptid['Danger Level']}
              </Badge>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
