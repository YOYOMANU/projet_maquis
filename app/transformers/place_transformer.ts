import { BaseTransformer } from '@adonisjs/core/transformers'
import Place from '#models/place'
import QuartierTransformer from './quartier_transformer.ts'

export default class PlaceTransformer extends BaseTransformer<Place> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'name',
        'longitude',
        'latitude',
        'slug',
        'coverPhoto',
        'description',
        'priceRange',
        'address',
      ]),
      quartier: QuartierTransformer.transform(this.whenLoaded(this.resource.quartier)),
    }
  }
}
