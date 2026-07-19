import type { Review } from '~/types/index'
import { StarRating } from './StarRating'
import { ReviewTags } from './ReviewTags'

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="review-card">
      <div className="photo-ph">
        <div className="ph-label">{review.photoLabel}</div>
      </div>
      <div className="review-body">
        <div className="review-top">
          <div>
            <div className="place-name">{review.placeName}</div>
            <div className="place-meta">{review.placeMeta}</div>
          </div>
          <StarRating rating={review.rating} />
        </div>

        <ReviewTags tags={review.tags} />

        <div className="review-text">{review.text}</div>

        <div className="review-footer">
          <div className="mini-avatar"></div>
          <span>
            par {review.authorName} · {review.timeAgo}
            {review.addedTo && <> · ajouté à « {review.addedTo} »</>}
          </span>
        </div>
      </div>
    </div>
  )
}
