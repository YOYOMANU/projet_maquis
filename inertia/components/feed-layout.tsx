import { ReviewCard } from '~/components/ReviewCard'
import { SidebarBlock } from '~/components/SidebarBlock'
import { TrendList } from '~/components/TrendList'
import { PopularList } from '~/components/PopularList'
import { MiniMap } from '~/components/MiniMap'
import type { Review, TrendEntry, PopularPlace } from '~/types/index'

const reviews: Review[] = [
  {
    id: '1',
    photoLabel: 'Attiéké poisson braisé',
    placeName: 'Chez Tantie Awa',
    placeMeta: 'Cocody · Riviera Golf — Maquis de quartier',
    rating: 5,
    tags: [
      { label: 'Cocody', type: 'quartier' },
      { label: '$$', type: 'prix' },
      { label: 'Entre potes', type: 'ambiance' },
    ],
    text: "Le poisson braisé le plus fondant de la Riviera. On y va après 21h pour le vrai coup de feu, quand la braise tourne encore. L'attiéké maison change tout.",
    authorName: 'Josiane K.',
    timeAgo: 'il y a 3h',
    addedTo: 'Garba avant minuit',
  },
  {
    id: '2',
    photoLabel: 'Salle terrasse',
    placeName: 'Le Petit Marcory',
    placeMeta: 'Marcory Zone 4 — Restaurant',
    rating: 4,
    tags: [
      { label: 'Marcory', type: 'quartier' },
      { label: '$$$', type: 'prix' },
      { label: 'Romantique', type: 'ambiance' },
    ],
    text: "Coin tranquille, lumière tamisée, service impeccable. Le kedjenou de pintade mérite le déplacement. Un peu cher pour la portion, mais l'ambiance justifie tout.",
    authorName: 'Bertrand A.',
    timeAgo: 'il y a 7h',
  },
  {
    id: '3',
    photoLabel: 'Garba, dressage',
    placeName: 'Garba de la Gare',
    placeMeta: 'Yopougon Selmer — Street-food',
    rating: 5,
    tags: [
      { label: 'Yopougon', type: 'quartier' },
      { label: '$', type: 'prix' },
      { label: 'Rapide', type: 'ambiance' },
    ],
    text: "Le thon est toujours frais, le piment juste assez fort. C'est bruyant, c'est rapide, c'est parfait à minuit passé.",
    authorName: 'Fatou D.',
    timeAgo: 'hier',
  },
]

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

export default function FeedLayout() {
  return (
    <div className="feed-layout">
      <div>
        <div className="eyebrow">Fil de la communauté</div>
        <div className="feed-title">
          Ce qui se mange, <em>ce soir</em>, à Abidjan
        </div>
        <div className="feed-sub">247 nouveaux avis publiés cette semaine</div>

        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
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
    </div>
  )
}
