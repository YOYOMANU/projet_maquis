import Tag from '#models/tag'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    const placeTypes = [
      'Maquis',
      'Restaurant',
      'Street food',
      'Fast food',
      'Bar',
      'Café',
      'Pâtisserie',
      'Rooftop',
      'Buvette',
      'Grillades',
    ]

    const ambiances = [
      'Entre potes',
      'Romantique',
      'Rapide',
      'En famille',
      'Calme',
      'Festif',
      'Chic',
      'Décontracté',
      'Bruyant',
      'Cosy',
    ]

    await Tag.createMany([
      ...placeTypes.map((label) => ({ label, type: 'place_type' })),
      ...ambiances.map((label) => ({ label, type: 'ambiance' })),
    ])
  }
}
