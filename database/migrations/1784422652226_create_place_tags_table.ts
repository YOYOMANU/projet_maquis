import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'place_tags'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('place_id').unsigned().references('id').inTable('places').onDelete('CASCADE')
      table.integer('tag_id').unsigned().references('id').inTable('tags').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
