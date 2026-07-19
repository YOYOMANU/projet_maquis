import { ReviewSchema } from '#database/schema'
import { belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Place from '#models/place'
import Tag from '#models/tag'

export default class Review extends ReviewSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Place)
  declare place: BelongsTo<typeof Place>

  @manyToMany(() => Tag, {
    pivotTable: 'review_tags',
  })
  declare tags: ManyToMany<typeof Tag>
}
