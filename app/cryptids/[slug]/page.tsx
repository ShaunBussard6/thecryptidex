import { notFound } from 'next/navigation'
import path from 'path'
import fs from 'fs'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import {
  AlertTriangle,
  Eye,
  ShieldAlert,
  ScrollText,
  BookText,
  BookUser,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

interface Cryptid {
  slug: string
  'cryptid-name': string
  Type: string
  'Specific Location(s)': string
  'Danger Level': number
  image: string
  Summary: string
  Traits?: string[] | string
  Behavior?: string
  'First Reported Sightings'?: string
  'Reported Sightings (Approx.)'?: number
  Hoaxes?: string
  Debunked?: string
  Popularity?: number
  'Media Mentions'?: string
  'Folklore'?: string
  aliases?: string[]
}

export function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'lib', 'cryptids.json')
  const data = fs.readFileSync(filePath, 'utf-8')
  const cryptids: Cryptid[] = JSON.parse(data)
  return cryptids.map((c) => ({ slug: c.slug }))
}

export default async function Page({
  params
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const filePath = path.join(process.cwd(), 'lib', 'cryptids.json')
  const data = await fs.promises.readFile(filePath, 'utf-8')
  const cryptids: Cryptid[] = JSON.parse(data)
  const cryptid = cryptids.find((c) => c.slug === slug)

  if (!cryptid) return notFound()

  const dangerLevel = cryptid['Danger Level']

  return (
    <div className="min-h-screen bg-black text-amber-50 font-mono px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="text-red-400 hover:underline mb-4 inline-block text-sm">
          ← Back to Directory
        </Link>

        <h1 className="text-5xl font-bold text-center font-serif mb-6 text-amber-50">
          {cryptid['cryptid-name']}
        </h1>

        <div className="relative w-full mb-10 rounded-lg overflow-hidden border-2 border-amber-300">
          <Image
            src={`/images/${cryptid.image}`}
            alt={cryptid['cryptid-name']}
            width={800}
            height={600}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        <div className="bg-black/70 rounded-lg px-6 py-4 border border-amber-600 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 text-amber-300" />
            <h2 className="text-xl font-bold text-amber-200 uppercase tracking-wide">Field Report</h2>
          </div>
          <p className="text-amber-200 leading-relaxed text-base font-light">
            {cryptid.Summary}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="space-y-6">
            <div>
              <h3 className="text-yellow-400 font-bold uppercase text-sm mb-1">Classification</h3>
              <div className="space-y-2">
                <p>
                  <span className="block text-xs text-amber-400">Type:</span>
                  <Badge className="bg-amber-900 text-amber-200 border-amber-600 mt-1">{cryptid.Type}</Badge>
                </p>
                {cryptid.aliases && cryptid.aliases.length > 0 && (
                  <p>
                    <span className="block text-xs text-amber-400">Also Known As:</span>
                    {cryptid.aliases.join(', ')}
                  </p>
                )}
                <p>
                  <span className="block text-xs text-amber-400">Location:</span>
                  {cryptid['Specific Location(s)']}
                </p>
                {cryptid.Traits && (
                  <p>
                    <span className="block text-xs text-amber-400">Traits:</span>
                    {Array.isArray(cryptid.Traits) ? cryptid.Traits.join(', ') : cryptid.Traits}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-yellow-400 font-bold uppercase text-sm mb-1">Threat Assessment</h3>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-300">Danger Level: {dangerLevel}</span>
                </p>

                <div className="w-full h-3 bg-amber-900/30 rounded overflow-hidden">
                  <div
                    className="h-full bg-yellow-500"
                    style={{ width: `${(dangerLevel / 10) * 100}%` }}
                  />
                </div>

                {cryptid.Debunked && cryptid.Debunked.toLowerCase() !== 'unknown' && (
                  <p className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-red-300">Status: {cryptid.Debunked}</span>
                  </p>
                )}

                {cryptid['First Reported Sightings'] && (
                  <p className="text-sm text-amber-300">
                    <span className="font-bold text-amber-400">First Reported:</span>{' '}
                    {cryptid['First Reported Sightings']}
                  </p>
                )}

                {cryptid['Reported Sightings (Approx.)'] !== undefined && (
                  <p className="text-sm text-amber-300">
                    <span className="font-bold text-amber-400">Sightings:</span>{' '}
                    {cryptid['Reported Sightings (Approx.)']}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-100/5 border border-amber-400 rounded p-4 mt-10">
          <details className="group">
            <summary className="cursor-pointer flex items-center justify-between text-red-200 font-bold uppercase tracking-wide">
              Reveal Full Dossier
              <ChevronDown className="group-open:hidden ml-2 w-4 h-4" />
              <ChevronUp className="hidden group-open:inline ml-2 w-4 h-4" />
            </summary>

            <div className="grid md:grid-cols-2 gap-8 mt-6">
              {cryptid.Behavior && (
                <div>
                  <h3 className="flex items-center gap-2 text-yellow-300 text-sm font-bold uppercase mb-2">
                    <ScrollText className="w-4 h-4 text-yellow-400" /> Behavioral Patterns
                  </h3>
                  <p className="text-sm text-amber-200 leading-relaxed">{cryptid.Behavior}</p>
                </div>
              )}

              {cryptid['Folklore'] && (
                <div>
                  <h3 className="flex items-center gap-2 text-yellow-300 text-sm font-bold uppercase mb-2">
                    <BookUser className="w-4 h-4 text-yellow-400" /> Folklore & Origins
                  </h3>
                  <p className="text-sm text-amber-200 leading-relaxed">{cryptid['Folklore']}</p>
                </div>
              )}

              {cryptid['Media Mentions'] && (
                <div>
                  <h3 className="flex items-center gap-2 text-yellow-300 text-sm font-bold uppercase mb-2">
                    <BookText className="w-4 h-4 text-yellow-400" /> Media Documentation
                  </h3>
                  <p className="text-sm text-amber-200 leading-relaxed">{cryptid['Media Mentions']}</p>
                </div>
              )}

              {cryptid.Hoaxes && (
                <div>
                  <h3 className="flex items-center gap-2 text-yellow-300 text-sm font-bold uppercase mb-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" /> Hoax Analysis
                  </h3>
                  <p className="text-sm text-amber-200 leading-relaxed">{cryptid.Hoaxes}</p>
                </div>
              )}
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}
