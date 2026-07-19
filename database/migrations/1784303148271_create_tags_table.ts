import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tags'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('label').notNullable()
      table.enum('type', ['place_type', 'ambiance']).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.unique(['label', 'type'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
