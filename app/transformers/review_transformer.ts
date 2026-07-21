import { BaseTransformer } from '@adonisjs/core/transformers'
import Review from '#models/review'
import UserTransformer from './user_transformer.ts'
import PlaceTransformer from './place_transformer.ts'
import TagTransformer from './tag_transformer.ts'

export default class ReviewTransformer extends BaseTransformer<Review> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'rating', 'dishName', 'comment', 'status']),
      user: UserTransformer.transform(this.whenLoaded(this.resource.user)),
      place: PlaceTransformer.transform(this.whenLoaded(this.resource.place)),
      tags: TagTransformer.transform(this.whenLoaded(this.resource.tags)),
    }
  }
}
