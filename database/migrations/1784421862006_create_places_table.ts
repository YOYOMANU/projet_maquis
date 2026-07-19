import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'places'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('slug').notNullable().unique()
      table
        .integer('quartier_id')
        .unsigned()
        .references('id')
        .inTable('quartiers')
        .onDelete('RESTRICT')
      table.string('cover_photo').nullable()
      table.string('address').nullable()
      table.decimal('latitude', 10, 7).nullable()
      table.decimal('longitude', 10, 7).nullable()
      table.enum('price_range', ['$', '$$', '$$$']).notNullable()
      table.text('description').nullable()

      table.decimal('avg_rating', 3, 2).notNullable().defaultTo(0)
      table.integer('review_count').unsigned().notNullable().defaultTo(0)
      table.decimal('weighted_score', 6, 4).notNullable().defaultTo(0)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
