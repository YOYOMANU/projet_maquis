import { AspectRatio } from '~/components/ui/aspect-ratio'
import { Link } from '@adonisjs/inertia/react'
import { Data } from '@generated/data'
import { urlFor } from '~/client'
import { Badge } from './ui/badge'

type Props = {
  item: Data.Place
}

export function ResultCard({ item }: Props) {
  const href = urlFor('explorer.show', { id: item.id, slug: item.slug })

  const content = (
    <>
      <div className="photo-ph">
        {item.coverPhoto ? (
          <AspectRatio ratio={10 / 9} className="absolute inset-0 overflow-hidden">
            <img
              src={`/uploads/${item.coverPhoto}`}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          </AspectRatio>
        ) : (
          <div className="ph-label">Photo</div>
        )}
      </div>
      <div className="result-body">
        <div className="place-name" style={{ fontSize: '16.5px' }}>
          {item.name}
        </div>
        <div className="place-meta">{item.quartier?.name}</div>
        <div className="review-tags flex items-center" style={{ margin: '11px 0 0' }}>
          <Badge className="tag prix" variant={'outline'}>
            {item.priceRange}
          </Badge>
          <Badge key={item.tag?.id}>{item.tag?.label}</Badge>
        </div>
      </div>
    </>
  )

  if (href) {
    return (
      <Link href={href} className="result-card block">
        {content}
      </Link>
    )
  }

  return <div className="result-card">{content}</div>
}
