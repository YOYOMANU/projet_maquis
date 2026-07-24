import { useState } from 'react'
import { Card, CardContent } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Progress } from '~/components/ui/progress'
import { MapPin, Clock, Wallet, UtensilsCrossed, Navigation } from 'lucide-react'
import { Data } from '@generated/data'
import Header from './header'
import { Meta } from '~/types/index'
import AppPagination from './app-pagination'

const RATING = {
  average: 4.9,
  total: 312,
  breakdown: [
    { label: 'Excellent', pct: 88, share: 72 },
    { label: 'Très bien', pct: 60, share: 20 },
    { label: 'Correct', pct: 20, share: 6 },
    { label: 'Moyen', pct: 8, share: 2 },
  ],
}

const FILTERS = ['Tous les avis (312)', 'Plat signature', 'Ambiance', 'Récents', 'Mieux notés']
function Stars({ count }: { count: number }) {
  return (
    <div className="text-[13px] tracking-tight text-[#C9915B]">
      {'★'.repeat(count)}
      <span className="text-neutral-700">{'★'.repeat(5 - count)}</span>
    </div>
  )
}

type Props = {
  place: Data.Place
  reviews: Data.Review[] // adapte le type/variant à ton generated data
  meta: Meta
}

export default function PlaceDetail({ place, reviews, meta }: Props) {
  const INFOS = [
    { icon: MapPin, label: 'Quartier', value: place.quartier?.name },
    { icon: Clock, label: 'Horaires', value: '18h – 2h' },
    { icon: Wallet, label: 'Gamme de prix', value: place.priceRange },
    {
      icon: UtensilsCrossed,
      label: 'Type',
      value: place.tags![0].label,
    },
    { icon: Navigation, label: 'Distance', value: '2 min à pied' },
  ]

  const [activeFilter, setActiveFilter] = useState(0)
  const [dot, setDot] = useState(0)
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Header */}
      <Header />

      {/* Hero */}
      <div className="relative h-72 w-full overflow-hidden bg-neutral-900">
        {place.coverPhoto && (
          <img
            src={`/uploads/${place.coverPhoto}`}
            alt={place.name}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )}

        {/* 2. Le calque de dégradé sombre par-dessus l'image */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-8 pb-6">
          <div>
            <div className="text-xs font-medium text-[#DDAE7E]">
              {place.tags![0].label + ' de quartier - ' + place.quartier?.name}
            </div>
            <div className="mt-1 text-3xl font-semibold tracking-tight">{place.name}</div>
            <div className="mt-3 flex gap-2">
              <Badge
                className="rounded-full border-neutral-700 bg-neutral-900/80 text-neutral-200"
                variant="outline"
              >
                {place.quartier?.name}
              </Badge>
              <Badge
                className="rounded-full border-neutral-700 bg-neutral-900/80 text-neutral-200"
                variant="outline"
              >
                {place.priceRange}
              </Badge>
              <Badge
                className="rounded-full border-neutral-700 bg-neutral-900/80 text-neutral-200"
                variant="outline"
              >
                {place.tags![0].label}
              </Badge>
            </div>
          </div>

          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setDot(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === dot ? 'w-5 bg-[#C9915B]' : 'w-1.5 bg-neutral-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-[1fr_280px]">
        {/* Colonne principale */}
        <div>
          {/* Répartition des notes */}
          <Card className="mb-6 border-neutral-800 bg-neutral-900/60">
            <CardContent className="flex items-center gap-8 py-5">
              <div className="text-4xl font-semibold text-[#C9915B]">{RATING.average}</div>
              <div className="flex-1 space-y-1.5">
                {RATING.breakdown.map((row) => (
                  <div key={row.label} className="flex items-center gap-3 text-xs text-neutral-400">
                    <span className="w-16 shrink-0">{row.label}</span>
                    <Progress
                      value={row.pct}
                      className="h-1.5 flex-1 bg-neutral-800 [&>div]:bg-[#C9915B]"
                    />
                    <span className="w-8 shrink-0 text-right">{row.share}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Filtres */}
          <div className="mb-5 flex flex-wrap gap-2">
            {FILTERS.map((f, i) => (
              <button
                key={f}
                onClick={() => setActiveFilter(i)}
                className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                  i === activeFilter
                    ? 'border-[#C9915B] bg-[#C9915B]/10 text-[#DDAE7E]'
                    : 'border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Avis */}
          <div className="space-y-4">
            {reviews?.map((review) => (
              <Card key={review.id} className="border-neutral-800 bg-neutral-900/60">
                <CardContent className="flex gap-4 p-4">
                  <div className="flex h-24 w-[140px] shrink-0 items-center justify-center rounded-lg bg-neutral-800 text-[11px] text-neutral-500">
                    Photo
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-[15px] font-medium">{review.user?.fullName}</div>
                      <Stars count={review.rating} />
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-300">
                      {review.comment}
                    </p>
                    <div className="mt-2 text-xs text-neutral-500">{review.createdAtRelative}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {meta.lastPage > 1 && (
              <div className="mt-6">
                <AppPagination meta={meta} route="explorer.show" routeParams={{ id: place.id }} />
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <Card className="border-neutral-800 bg-neutral-900/60">
            <CardContent className="p-4">
              <div className="mb-3 text-sm font-medium text-neutral-200">Infos pratiques</div>
              <div className="space-y-2.5">
                {INFOS.map((info) => (
                  <div
                    key={info.label}
                    className="flex items-center justify-between border-b border-neutral-800 pb-2.5 text-sm last:border-none last:pb-0"
                  >
                    <span className="flex items-center gap-2 text-neutral-500">
                      <info.icon className="h-3.5 w-3.5" />
                      {info.label}
                    </span>
                    <span className="text-right text-neutral-200">{info.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-neutral-800 bg-neutral-900/60">
            <CardContent className="p-4">
              <div className="mb-3 text-sm font-medium text-neutral-200">Localisation</div>
              <div className="relative h-32 w-full overflow-hidden rounded-lg bg-neutral-800">
                <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9915B] ring-4 ring-[#C9915B]/25" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
