import Place from '#models/place'
import Review from '#models/review'
import Tag from '#models/tag'
import User from '#models/user'
import PlaceTransformer from '#transformers/place_transformer'
import ReviewTransformer from '#transformers/review_transformer'
import TagTransformer from '#transformers/tag_transformer'
import UserTransformer from '#transformers/user_transformer'
import { reviewValidator } from '#validators/review'
import { type HttpContext } from '@adonisjs/core/http'

export default class ReviewsController {
  /**
   * Display a list of resource
   */
  async index({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 5

    const reviews = await Review.query()
      .orderBy('createdAt', 'desc')
      .preload('user')
      .paginate(page, limit)

    return inertia.render('admin/review/index', {
      reviews: ReviewTransformer.paginate(reviews.all(), reviews.getMeta()),
    })
  }

  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    const review = new Review()
    const users = await User.all()
    const places = await Place.all()
    const tags = await Tag.all()

    return inertia.render('admin/review/form', {
      review: ReviewTransformer.transform(review),
      users: UserTransformer.transform(users),
      places: PlaceTransformer.transform(places),
      tags: TagTransformer.transform(tags),
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, session, response }: HttpContext) {
    const { tags, ...data } = await request.validateUsing(reviewValidator)

    const review = await Review.create(data)
    await review.related('tags').sync(tags)

    session.flash('success', 'review créée avec succès')
    return response.redirect().toRoute('reviews.index')
  }

  /**
   * Edit individual record
   */
  async edit({ params, inertia }: HttpContext) {
    const review = await Review.findByOrFail('id', params.id)

    await review.preload('place')
    await review.preload('user')
    await review.preload('tags')

    const users = await User.all()
    const places = await Place.all()
    const tags = await Tag.all()

    return inertia.render('admin/review/form', {
      review: ReviewTransformer.transform(review),
      users: UserTransformer.transform(users),
      places: PlaceTransformer.transform(places),
      tags: TagTransformer.transform(tags),
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, session, response }: HttpContext) {
    const review = await Review.findByOrFail('id', params.id)
    const { tags, ...data } = await request.validateUsing(reviewValidator)
    await review.merge(data).save()
    await review.related('tags').sync(tags)
    session.flash('success', 'review modifiée avec succès !')
    return response.redirect().toRoute('reviews.index')
  }

  /**
   * Delete record
   */
  async destroy({ params, session, response }: HttpContext) {
    const review = await Review.findByOrFail('id', params.id)
    await review.delete()
    session.flash('success', 'review supprimée avec succès')
    return response.redirect().toRoute('reviews.index')
  }
}
