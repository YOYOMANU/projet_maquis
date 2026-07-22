import { StarRating } from './StarRating'
import { Data } from '@generated/data'
import { AspectRatio } from './ui/aspect-ratio'
import { PlaceTags } from './PlaceTags'

export function PlaceCard({ place }: { place: Data.Place.Variants['forDetailPlace'] }) {
  const lastReview = place.reviews?.[0]

  return (
    <div className="review-card">
      <div className="photo-ph">
        <AspectRatio ratio={10 / 9} className="overflow-hidden rounded-2xl">
          <img
            className="h-full w-full object-cover"
            src={`/uploads/${place.coverPhoto}`}
            alt={place.name}
          />
        </AspectRatio>
      </div>
      <div className="review-body">
        <div className="review-top">
          <div>
            <div className="place-name">{place.name}</div>
            <div className="place-meta">{place.address}</div>
          </div>
          {lastReview && <StarRating rating={lastReview.rating} />}
        </div>

        <PlaceTags tags={place.tags ?? []} />

        {lastReview ? (
          <>
            <div className="review-text">{lastReview.comment}</div>
            <div className="review-footer">
              <div className="mini-avatar"></div>
              <span>
                par {lastReview.user?.fullName} · {lastReview.createdAtRelative}
              </span>
            </div>
          </>
        ) : (
          <div className="review-text text-muted-foreground">Aucun avis pour l'instant</div>
        )}
      </div>
    </div>
  )
}
