import Quartier from '#models/quartier'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    const quartiers = [
      'Cocody - Riviera',
      'Cocody - Angré',
      'Cocody - Danga',
      'Cocody - II Plateaux',
      'Marcory - Zone 4',
      'Marcory - Résidentiel',
      'Yopougon - Selmer',
      'Yopougon - Niangon',
      'Yopougon - Maroc',
      'Plateau',
      'Treichville',
      'Adjamé',
      'Abobo',
      'Koumassi',
      'Port-Bouët',
      'Attécoubé',
      'Bingerville',
      'Songon',
      'Anyama',
      'Riviera Palmeraie',
    ]

    await Quartier.createMany(quartiers.map((name) => ({ name })))
  }
}
