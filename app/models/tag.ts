import { TagSchema } from '#database/schema'
import { manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Place from '#models/place'
import Review from '#models/review'

export default class Tag extends TagSchema {
  @manyToMany(() => Place, {
    pivotTable: 'place_tags',
  })
  declare places: ManyToMany<typeof Place>

  @manyToMany(() => Review, {
    pivotTable: 'review_tags',
  })
  declare reviews: ManyToMany<typeof Review>
}
