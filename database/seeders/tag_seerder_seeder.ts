import { TagFactory } from '#database/factories/tag_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await TagFactory.createMany(10)
  }
}
