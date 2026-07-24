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
      tags: TagTransformer.transform(this.whenLoaded(this.resource.tags)),
      reviews: ReviewTransformer.transform(this.whenLoaded(this.resource.reviews)),
    }
  }
}
