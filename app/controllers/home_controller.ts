import Place from '#models/place'
import PlaceTransformer from '#transformers/place_transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async index({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 3

    const places = await Place.query()
      .preload('reviews', (reviewQuery) => {
        reviewQuery.groupLimit(1).orderBy('created_at', 'desc').preload('user')
      })
      .paginate(page, limit)

    return inertia.render('home', {
      places: PlaceTransformer.paginate(places.all(), places.getMeta()).useVariant(
        'forDetailPlace'
      ),
    })
  }
}
