import { PlaceSchema } from '#database/schema'
import { beforeCreate, belongsTo, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Quartier from '#models/quartier'
import Review from '#models/review'
import Tag from '#models/tag'
import stringHelpers from '@adonisjs/core/helpers/string'

export default class Place extends PlaceSchema {
  @belongsTo(() => Quartier)
  declare quartier: BelongsTo<typeof Quartier>

  @hasMany(() => Review)
  declare reviews: HasMany<typeof Review>

  @manyToMany(() => Tag, {
    pivotTable: 'place_tags',
  })
  declare tags: ManyToMany<typeof Tag>

  @beforeCreate()
  static async generateSlug(place: Place) {
    place.slug = stringHelpers.slug(place.name, { lower: true })
  }
}
