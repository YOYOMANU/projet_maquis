import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import string from '@adonisjs/core/helpers/string'
import drive from '@adonisjs/drive/services/main'
import Place from '#models/place'

// Centre approximatif de quelques quartiers d'Abidjan (lat, lng)
const QUARTIER_CENTERS: Record<string, [number, number]> = {
  cocody: [5.3599, -3.9895],
  yopougon: [5.3364, -4.0863],
  marcory: [5.2933, -3.9975],
  treichville: [5.2926, -4.0089],
  plateau: [5.3208, -4.0181],
  angre: [5.3833, -3.9833],
  riviera: [5.3667, -3.9667],
  koumassi: [5.2903, -3.9503],
  abobo: [5.4167, -4.0167],
  adjame: [5.3517, -4.0261],
}

const ABIDJAN_CENTER: [number, number] = [5.3599517, -4.0082563]

function jitter(value: number, spread = 0.015) {
  return value + (Math.random() * 2 - 1) * spread
}

function getCoordsForQuartier(quartierName: string): { latitude: number; longitude: number } {
  const key = string.slug(quartierName, { lower: true }).replace(/-/g, '')
  const center = QUARTIER_CENTERS[key] ?? ABIDJAN_CENTER
  return {
    latitude: Number(jitter(center[0]).toFixed(7)),
    longitude: Number(jitter(center[1]).toFixed(7)),
  }
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomFloat(min: number, max: number, decimals = 2) {
  const value = Math.random() * (max - min) + min
  return Number(value.toFixed(decimals))
}

function pickRandom<T>(arr: T[]): T {
  return arr[randomInt(0, arr.length - 1)]
}

function computeWeightedScore(rating: number, reviewCount: number, globalMean: number, m = 20) {
  const v = reviewCount
  const score = (v / (v + m)) * rating + (m / (v + m)) * globalMean
  return Number(score.toFixed(4))
}

/**
 * Télécharge une image depuis picsum.photos et la sauvegarde sur le disk
 * configuré, en suivant exactement le même format de clé que
 * PlacesController.handleRequest() (uploads/<nom-aléatoire>.<ext>).
 */
async function downloadCoverPhoto(slug: string): Promise<string> {
  const url = `https://picsum.photos/seed/${slug}/800/600`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Échec du téléchargement de l'image pour "${slug}" (HTTP ${response.status})`)
  }

  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const filename = `${string.generateRandom(32)}.jpg`
  const key = `uploads/${filename}`

  await drive.use().put(key, buffer)

  return key
}

export default class extends BaseSeeder {
  async run() {
    const quartiers = await db.from('quartiers').select('id', 'name').orderBy('id')

    const placeTypeTags = await db
      .from('tags')
      .select('id')
      .where('type', 'place_type')
      .orderBy('id')

    if (placeTypeTags.length === 0) {
      throw new Error(
        'Aucun tag de type "place_type" trouvé. Assure-toi que le seeder des tags s\'exécute avant celui des places.'
      )
    }

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

    const GLOBAL_MEAN_RATING = 4.2

    // On utilise une boucle for...of (pas .map) car le téléchargement
    // des images est asynchrone et doit être fait séquentiellement
    // pour éviter de saturer picsum.photos de requêtes en parallèle.
    const rows: Record<string, unknown>[] = []

    for (const [index, place] of places.entries()) {
      const quartier = quartiers[index % quartiers.length]
      const slug = string.slug(place.name, { lower: true })
      const { latitude, longitude } = getCoordsForQuartier(quartier.name)

      const avgRating = randomFloat(3.4, 5, 2)
      const reviewCount = randomInt(3, 340)
      const weightedScore = computeWeightedScore(avgRating, reviewCount, GLOBAL_MEAN_RATING)

      console.log(`  → Téléchargement de l'image pour "${place.name}"...`)
      const coverPhoto = await downloadCoverPhoto(slug)

      rows.push({
        name: place.name,
        slug,
        quartierId: quartier.id,
        tagId: pickRandom(placeTypeTags).id,
        coverPhoto,
        address: null,
        latitude,
        longitude,
        priceRange: place.price,
        description: place.desc,
        avgRating,
        reviewCount,
        weightedScore,
      })
    }

    await Place.createMany(rows)
  }
}
