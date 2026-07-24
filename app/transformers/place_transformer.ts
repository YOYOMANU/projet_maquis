import { BaseTransformer } from '@adonisjs/core/transformers'
import Place from '#models/place'
import QuartierTransformer from './quartier_transformer.ts'
import TagTransformer from './tag_transformer.ts'
import ReviewTransformer from './review_transformer.ts'

export default class PlaceTransformer extends BaseTransformer<Place> {
  toObject() {
    return {
      id: this.resource.id,
      name: this.resource.name,
      longitude: this.resource.longitude,
      latitude: this.resource.latitude,
      slug: this.resource.slug,
      coverPhoto: this.resource.coverPhoto,
      description: this.resource.description,
      priceRange: this.resource.priceRange,
      address: this.resource.address,
      quartier: QuartierTransformer.transform(this.whenLoaded(this.resource.quartier)),
      tag: TagTransformer.transform(this.whenLoaded(this.resource.tag)),
      reviews: ReviewTransformer.transform(this.whenLoaded(this.resource.reviews))?.depth(2),
    }
  }

  forDetailPlace() {
    return {
      ...this.toObject(),
      avg_rating: this.resource.avgRating,
      review_count: this.resource.reviewCount,
      weighted_score: this.resource.weightedScore,
    }
  }
}
