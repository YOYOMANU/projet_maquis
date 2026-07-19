import { QuartierSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Place from '#models/place'

export default class Quartier extends QuartierSchema {
  @hasMany(() => Place)
  declare places: HasMany<typeof Place>
}
