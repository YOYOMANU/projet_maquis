import type { Tag } from '~/types/index'

export function ReviewTags({ tags }: { tags: Tag[] }) {
  return (
    <div className="review-tags">
      {tags.map((tag) => (
        <span key={tag.label} className={`tag ${tag.type}`}>
          {tag.label}
        </span>
      ))}
    </div>
  )
}
