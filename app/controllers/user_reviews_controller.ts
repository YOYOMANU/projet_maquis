import type { HttpContext } from '@adonisjs/core/http'

import Review from '#models/review'

export default class UserReviewsController {
  async store({ params, request, response, auth, session }: HttpContext) {
    const { rating, comment, tagIds } = request.only(['rating', 'comment', 'tagIds'])

    const review = await Review.create({
      placeId: params.placeId,
      userId: auth.user!.id,
      rating,
      comment,
    })

    if (tagIds?.length) {
      await review.related('tags').attach(tagIds)
    }

    session.flash('success', 'Avis publié avec succès !')
    return response.redirect().back()
  }
}
