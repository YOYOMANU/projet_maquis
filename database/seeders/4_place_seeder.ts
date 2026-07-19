import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import string from '@adonisjs/core/helpers/string'
import Place from '#models/place'

export default class extends BaseSeeder {
  async run() {
    const quartiers = await db.from('quartiers').select('id').orderBy('id')

    const places = [
      { name: 'Chez Tantie Awa', price: '$$', desc: 'Poisson braisé fondant, ouvert tard.' },
      { name: 'Le Petit Marcory', price: '$$$', desc: 'Ambiance romantique, cuisine raffinée.' },
      { name: 'Garba de la Gare', price: '$', desc: 'Garba au thon, service rapide.' },
      { name: 'Maquis du Phare', price: '$$', desc: 'Grillades et ambiance conviviale.' },
      { name: 'Chez Mama Adjoua', price: '$$', desc: 'Cuisine maison, alloco légendaire.' },
      { name: "Le Grill d'Angré", price: '$$$', desc: 'Grillades premium, cadre soigné.' },
      { name: 'Maquis Le Bonheur', price: '$', desc: 'Petit maquis de quartier, prix doux.' },
      { name: 'Chez Tonton Serge', price: '$$', desc: 'Spécialiste kedjenou.' },
      { name: 'La Terrasse du Plateau', price: '$$$', desc: 'Vue dégagée, cuisine fusion.' },
      { name: 'Chez Nana Foods', price: '$', desc: 'Street food rapide et copieux.' },
      { name: "Le Kedjenou d'Or", price: '$$', desc: 'Kedjenou mijoté à l’ancienne.' },
      { name: 'Maquis Soleil', price: '$$', desc: 'Ambiance festive le week-end.' },
      { name: 'Chez Fatim', price: '$', desc: 'Attiéké et poisson frit, très populaire.' },
      { name: 'Le Coin Braisé', price: '$$', desc: 'Spécialiste braisé toutes viandes.' },
      { name: 'Maquis Étoile', price: '$$', desc: 'Bonne ambiance, service correct.' },
      { name: 'Chez Djeneba', price: '$', desc: 'Cuisine simple et généreuse.' },
      { name: 'Le Palais du Poisson', price: '$$$', desc: 'Spécialiste fruits de mer.' },
      { name: 'Maquis Bonne Ambiance', price: '$$', desc: 'Musique live certains soirs.' },
      { name: 'Chez Salimata', price: '$', desc: 'Garba et attiéké, petit budget.' },
      { name: 'Le Foyer Ivoirien', price: '$$', desc: 'Plats traditionnels variés.' },
    ]

    const rows = places.map((place, index) => ({
      name: place.name,
      slug: string.slug(place.name, { lower: true }),
      quartier_id: quartiers[index % quartiers.length].id,
      cover_photo: `places/${string.slug(place.name, { lower: true })}/cover.jpg`,
      address: null,
      latitude: null,
      longitude: null,
      price_range: place.price,
      description: place.desc,
      avg_rating: 0,
      review_count: 0,
      weighted_score: 0,
    }))

    await Place.createMany(rows)
  }
}
