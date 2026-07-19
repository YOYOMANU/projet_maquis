import Review from '#models/review'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run() {
    // On exclut l'admin (Yoann) des auteurs d'avis
    const users = await db.from('users').select('id').where('is_admin', false).orderBy('id')
    const places = await db.from('places').select('id').orderBy('id')

    const comments = [
      {
        dish: 'Attiéké poisson braisé',
        text: 'Le poisson le plus fondant du quartier.',
        rating: 5,
      },
      {
        dish: 'Kedjenou de pintade',
        text: 'Service impeccable, un peu cher pour la portion.',
        rating: 4,
      },
      { dish: 'Garba thon', text: 'Toujours frais, piment parfait.', rating: 5 },
      { dish: 'Alloco poulet', text: 'Bonne ambiance, bruyant le week-end.', rating: 4 },
      { dish: 'Attiéké garba', text: 'Copieux et pas cher.', rating: 4 },
      { dish: 'Grillades mixtes', text: 'Cadre soigné, viande bien cuite.', rating: 5 },
      { dish: 'Riz sauce graine', text: 'Correct sans plus.', rating: 3 },
      { dish: 'Kedjenou poulet', text: 'Mijoté parfait, recette maison.', rating: 5 },
      { dish: 'Poisson fumé', text: 'Vue sympa mais service lent.', rating: 3 },
      { dish: 'Beignets crevettes', text: 'Rapide et savoureux.', rating: 4 },
      { dish: 'Kedjenou bœuf', text: 'Un des meilleurs de la ville.', rating: 5 },
      { dish: 'Alloco poisson', text: 'Ambiance festive, musique live.', rating: 4 },
      { dish: 'Attiéké poisson frit', text: 'Très populaire, prix doux.', rating: 4 },
      { dish: 'Brochettes bœuf', text: 'Braisé parfait, portions généreuses.', rating: 5 },
      { dish: 'Garba spécial', text: 'Bon rapport qualité prix.', rating: 4 },
      { dish: 'Foutou sauce', text: 'Cuisine simple mais bonne.', rating: 3 },
      { dish: 'Crevettes grillées', text: 'Spécialiste fruits de mer, un peu cher.', rating: 4 },
      { dish: 'Attiéké alloco', text: 'Soirée réussie, bonne musique.', rating: 5 },
      { dish: 'Garba économique', text: 'Petit budget, bon accueil.', rating: 3 },
      { dish: 'Plat du jour', text: 'Plats traditionnels bien préparés.', rating: 4 },
    ]

    const rows = comments.map((c, index) => ({
      user_id: users[index % users.length].id,
      place_id: places[index % places.length].id,
      rating: c.rating,
      dish_name: c.dish,
      comment: c.text,
      status: 'published',
    }))

    await Review.createMany(rows)
  }
}
