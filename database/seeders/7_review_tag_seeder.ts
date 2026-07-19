import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    const reviews = await db.from('reviews').select('id').orderBy('id')
    const ambianceTags = await db.from('tags').select('id').where('type', 'ambiance').orderBy('id')

    const rows = reviews.map((review, index) => ({
      review_id: review.id,
      tag_id: ambianceTags[index % ambianceTags.length].id,
    }))

    await db.table('review_tags').multiInsert(rows)
  }
}
