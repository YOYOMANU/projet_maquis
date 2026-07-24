import Place from '#models/place'
import Review from '#models/review'
import PlaceTransformer from '#transformers/place_transformer'
import ReviewTransformer from '#transformers/review_transformer'
import type { HttpContext } from '@adonisjs/core/http'

export default class ExplorersController {
  async explorer({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 6

    const places = await Place.query()
      .preload('quartier')
      .preload('tag')
      .preload('reviews')
      .paginate(page, limit)

    return inertia.render('Places/explorer', {
      places: PlaceTransformer.paginate(places.all(), places.getMeta()),
    })
  }

  async show({ inertia, params, request }: HttpContext) {
    const place = await Place.findByOrFail('id', params.id)
    await place.load('quartier')
    await place.load('tag')

    const page = request.input('page', 1)
    const perPage = 5

    const reviewsPaginated = await Review.query()
      .where('placeId', place.id)
      .preload('user')
      .orderBy('createdAt', 'desc')
      .paginate(page, perPage)

    return inertia.render('Places/show', {
      place: PlaceTransformer.transform(place).useVariant('forDetailPlace'),
      reviews: ReviewTransformer.paginate(reviewsPaginated.all(), reviewsPaginated.getMeta()).depth(
        2
      ),
    })
  }
}
