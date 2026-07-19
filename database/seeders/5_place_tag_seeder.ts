import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    const places = await db.from('places').select('id').orderBy('id')
    const placeTypeTags = await db
      .from('tags')
      .select('id')
      .where('type', 'place_type')
      .orderBy('id')

    // Chaque lieu reçoit un tag de type, réparti en boucle sur les 10 tags disponibles
    const rows = places.map((place, index) => ({
      place_id: place.id,
      tag_id: placeTypeTags[index % placeTypeTags.length].id,
    }))

    await db.table('place_tags').multiInsert(rows)
  }
}
