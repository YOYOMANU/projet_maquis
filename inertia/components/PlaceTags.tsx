import { Data } from '@generated/data'
import { Badge } from './ui/badge'

export function PlaceTags({ tags }: { tags: Data.Tag[] }) {
  return (
    <div className="review-tags">
      {tags.map((tag) => (
        <Badge variant={'outline'} key={tag.label} className={`tag ${tag.type}`}>
          {tag.label}
        </Badge>
      ))}
    </div>
  )
}
