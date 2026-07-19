import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reviews'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('place_id').unsigned().references('id').inTable('places').onDelete('CASCADE')
      table.integer('rating').unsigned().notNullable()
      table.string('dish_name').nullable()
      table.text('comment').notNullable()
      table.enum('status', ['published', 'flagged', 'hidden']).notNullable().defaultTo('published')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
