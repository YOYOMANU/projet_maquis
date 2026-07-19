import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    const names = [
      'Yoann',
      'Josiane K.',
      'Bertrand A.',
      'Fatou D.',
      'Aya N.',
      'Kouadio Y.',
      'Mariam T.',
      'Serge B.',
      'Aminata C.',
      'Franck O.',
      'Christelle M.',
      'Ibrahim S.',
      'Nadège P.',
      'Willy K.',
      'Grace A.',
      'Moussa D.',
      'Sandra L.',
      'Yves B.',
      'Patricia N.',
      'Cédric A.',
    ]

    const rows = await Promise.all(
      names.map(async (fullName, index) => ({
        full_name: fullName,
        email: `user${index + 1}@example.com`,
        password: await hash.make('password123'),
        avatar_url: null,
        is_admin: index === 0, // Yoann seul admin
      }))
    )

    await User.createMany(rows)
  }
}
