import { useState } from 'react'
import { Card, CardContent } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Progress } from '~/components/ui/progress'
import { MapPin, Clock, Wallet, UtensilsCrossed } from 'lucide-react'
import { Data } from '@generated/data'
import type { Meta } from '~/types/index'
import Header from './header'
import AppPagination from './app-pagination'

function Stars({ count }: { count: number }) {
  return (
    <div className="text-[13px] tracking-tight text-copper">
      {'★'.repeat(count)}
      <span className="text-muted-dim">{'★'.repeat(5 - count)}</span>
    </div>
  )
}

const RATING_LABELS: Record<number, string> = {
  5: 'Excellent',
  4: 'Très bien',
  3: 'Correct',
  2: 'Moyen',
  1: 'Faible',
}

function computeRatingBreakdown(reviews: Data.Review[] | undefined, total: number) {
  // Compte le nombre d'avis par note (1 à 5)
  const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

  reviews?.forEach((review) => {
    const rounded = Math.round(review.rating)
    if (counts[rounded] !== undefined) {
      counts[rounded] += 1
    }
  })

  return [5, 4, 3, 2, 1].map((stars) => {
    const count = counts[stars]
    const share = total > 0 ? Math.round((count / total) * 100) : 0
    return {
      label: RATING_LABELS[stars],
      pct: share,
      share,
    }
  })
}

type Props = {
  place: Data.Place.Variants['forDetailPlace']
  reviews: Data.Review[]
  meta: Meta
}

export default function PlaceDetail({ place, reviews, meta }: Props) {
  const total = reviews.map((r) => r.comment).length
  const FILTERS = [
    `Tous les avis (${total})`,
    'Plat signature',
    'Ambiance',
    'Récents',
    'Mieux notés',
  ]

  const RATING = {
    average: place.avg_rating,
    total: place.review_count,
    breakdown: computeRatingBreakdown(reviews, place.review_count),
  }

  const INFOS = [
    { icon: MapPin, label: 'Quartier', value: place.quartier?.name },
    { icon: Clock, label: 'Horaires', value: '18h – 2h' },
    { icon: Wallet, label: 'Gamme de prix', value: place.priceRange },
    {
      icon: UtensilsCrossed,
      label: 'Type',
      value: place.tag?.label,
    },
  ]

  const [activeFilter, setActiveFilter] = useState(0)
  const [dot, setDot] = useState(0)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header />

      {/* Hero */}
      <div className="relative h-72 w-full overflow-hidden bg-surface">
        {place.coverPhoto && (
          <img
            src={`/uploads/${place.coverPhoto}`}
            alt={place.name}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        )}

        <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-8 pb-6">
          <div>
            <div className="text-xs font-medium text-copper-light">
              {place.tag?.label + ' de quartier - ' + place.quartier?.name}
            </div>
            <div className="mt-1 font-serif text-3xl font-semibold tracking-tight">
              {place.name}
            </div>
            <div className="mt-3 flex gap-2">
              <Badge
                className="rounded-full border-line bg-surface/80 text-text-dim"
                variant="outline"
              >
                {place.quartier?.name}
              </Badge>
              <Badge
                className="rounded-full border-line bg-surface/80 text-text-dim"
                variant="outline"
              >
                {place.priceRange}
              </Badge>
              <Badge
                className="rounded-full border-line bg-surface/80 text-text-dim"
                variant="outline"
              >
                {place.tag?.label}
              </Badge>
            </div>
          </div>

          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setDot(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === dot ? 'w-5 bg-copper' : 'w-1.5 bg-line-strong'
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
          <Card className="mb-6 border-line bg-surface">
            <CardContent className="flex items-center gap-8 py-5">
              <div className="font-serif text-4xl font-semibold text-copper-light italic">
                {RATING.average}
              </div>
              <div className="flex-1 space-y-1.5">
                {RATING.breakdown.map((row) => (
                  <div key={row.label} className="flex items-center gap-3 text-xs text-text-dim">
                    <span className="w-16 shrink-0">{row.label}</span>
                    <Progress
                      value={row.pct}
                      className="h-1.5 flex-1 bg-surface-2 [&>div]:bg-copper"
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
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  i === activeFilter
                    ? 'border-transparent font-extrabold text-primary-foreground bg-linear-to-br from-copper-light to-copper'
                    : 'border-line text-text-dim hover:border-line-strong'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Avis */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="border-line bg-surface">
                <CardContent className="flex gap-4 p-4">
                  <div className="flex h-24 w-35 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-[11px] text-muted-dim">
                    Photo
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-[15px] font-medium">{review.user?.fullName}</div>
                      <Stars count={review.rating} />
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-parchment opacity-90">
                      {review.comment}
                    </p>
                    <div className="mt-2 text-xs text-muted-dim">{review.createdAtRelative}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {meta.lastPage > 1 && (
            <div className="mt-6">
              <AppPagination meta={meta} route="explorer.show" routeParams={{ id: place.id }} />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <Card className="border-line bg-surface">
            <CardContent className="p-4">
              <div className="mb-3 font-serif text-sm font-medium">Infos pratiques</div>
              <div className="space-y-2.5">
                {INFOS.map((info) => (
                  <div
                    key={info.label}
                    className="flex items-center justify-between border-b border-line pb-2.5 text-sm last:border-none last:pb-0"
                  >
                    <span className="flex items-center gap-2 text-text-dim">
                      <info.icon className="h-3.5 w-3.5" />
                      {info.label}
                    </span>
                    <span className="text-right font-bold">{info.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-line bg-surface">
            <CardContent className="p-4">
              <div className="mb-3 font-serif text-sm font-medium">Localisation</div>
              <div className="relative h-32 w-full overflow-hidden rounded-lg bg-surface-2">
                <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper ring-4 ring-copper/25" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
