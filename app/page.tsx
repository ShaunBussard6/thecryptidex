'use client'

import { useState } from 'react'
import { Search, MapPin, AlertTriangle, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import cryptids from '@/lib/cryptids.json'

type Cryptid = {
  slug: string
  'cryptid-name': string
  Type: string
  'Specific Location(s)': string
  'Danger Level': number
  image: string
}

const getDangerColor = (level: number) => {
  if (level < 2) return 'bg-green-600 text-white border-green-600'
  if (level < 5) return 'bg-yellow-500 text-black border-yellow-500'
  if (level < 8) return 'bg-red-600 text-white border-red-600'
  return 'bg-gray-600 text-white border-gray-600'
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCryptids = cryptids.filter((cryptid: Cryptid) =>
    cryptid['cryptid-name'].toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-black text-amber-50 font-mono relative overflow-hidden">
      <header className="text-center py-10">
        <h1 className="text-5xl font-bold tracking-wide text-red-500">THE CRYPTIDEX</h1>
        <p className="text-lg text-white mt-2">The World's Most Comprehensive Cryptid Directory</p>
      </header>

      <div className="max-w-xl mx-auto px-4 mb-10">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-300 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search cryptids by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-black/50 border-amber-200/50 text-amber-50 placeholder:text-amber-300/70 focus:border-red-400 focus:ring-red-400/50"
          />
        </div>
      </div>

      <main className="container mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold mb-6 text-red-400 flex items-center gap-2">
          <Filter className="w-6 h-6" />
          FEATURED ENTITIES
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCryptids.map((cryptid, index) => (
            <Link href={`/cryptids/${cryptid.slug}`} key={index}>
              <Card
                className={`group bg-amber-100/5 border-amber-200/30 hover:border-red-400/50 transition-all duration-300 transform hover:-translate-y-1 ${
                  index % 2 === 0 ? 'rotate-1' : '-rotate-1'
                } group-hover:rotate-0`}
              >
                <CardHeader className="pb-3">
                  <div className="relative aspect-video overflow-hidden rounded border-2 border-amber-200/50 shadow-lg">
                    <Image
                      src={`/images/${cryptid.image}`}
                      alt={cryptid['cryptid-name']}
                      fill
                      className="object-contain"
                    />
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-amber-200 rounded-full shadow-md"></div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-amber-50 mb-2 font-serif">{cryptid['cryptid-name']}</CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-amber-300">
                      <MapPin className="w-4 h-4" />
                      {cryptid['Specific Location(s)']}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs bg-amber-900/30 text-amber-200 border-amber-600">
                        {cryptid.Type}
                      </Badge>
                      <Badge className={`text-xs ${getDangerColor(cryptid['Danger Level'])}`}>
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {cryptid['Danger Level']}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
