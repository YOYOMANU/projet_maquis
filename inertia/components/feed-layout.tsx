import { SidebarBlock } from '~/components/SidebarBlock'
import { TrendList } from '~/components/TrendList'
import { PopularList } from '~/components/PopularList'
import { MiniMap } from '~/components/MiniMap'
import type { TrendEntry, PopularPlace, Meta } from '~/types/index'
import { Data } from '@generated/data'
import AppPagination from './app-pagination'
import { PlaceCard } from './PlaceCard'

const trends: TrendEntry[] = [
  { rank: 1, name: 'Chez Tantie Awa', score: 4.9 },
  { rank: 2, name: 'Maquis du Phare', score: 4.8 },
  { rank: 3, name: 'Garba de la Gare', score: 4.7 },
  { rank: 4, name: 'Le Petit Marcory', score: 4.6 },
]

const popular: PopularPlace[] = [
  { name: 'Chez Tantie Awa', duration: '2 min' },
  { name: 'Riviera Grill', duration: '8 min' },
  { name: 'Le Bambou Doré', duration: '12 min' },
]

type Props = {
  data: Data.Place.Variants['forDetailPlace'][]
  metadata: Meta
}

export default function FeedLayout({ data, metadata }: Props) {
  return (
    <div className="feed-layout">
      <div>
        <div className="eyebrow">Fil de la communauté</div>
        <div className="feed-title">
          Ce qui se mange, <em>ce soir</em>, à Abidjan
        </div>
        <div className="feed-sub">247 nouveaux avis publiés cette semaine</div>

        {data.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>

      <div>
        <SidebarBlock title="Tendances de la semaine">
          <TrendList entries={trends} />
        </SidebarBlock>

        <SidebarBlock title="Autour de vous">
          <MiniMap />
        </SidebarBlock>

        <SidebarBlock title="Populaire à Cocody">
          <PopularList places={popular} />
        </SidebarBlock>
      </div>
      <AppPagination meta={metadata} route="home" />
    </div>
  )
}
