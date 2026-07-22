import Place from '#models/place'
import PlaceTransformer from '#transformers/place_transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class ExplorersController {
  async explorer({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 6

    const places = await Place.query()
      .preload('quartier')
      .preload('tags')
      .preload('reviews')
      .paginate(page, limit)

    return inertia.render('Places/explorer', {
      places: PlaceTransformer.paginate(places.all(), places.getMeta()),
    })
  }

  async show({ inertia, params }: HttpContext) {
    const place = await Place.findByOrFail('id', params.id)
    await place.load('quartier')
    await place.load('tags')
    await place.load('reviews', (query) => query.orderBy('created_at', 'desc').preload('user'))
    return inertia.render('Places/show', {
      place: PlaceTransformer.transform(place).useVariant('forDetailPlace'),
    })
  }
}
