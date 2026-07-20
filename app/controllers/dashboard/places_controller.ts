import Place from '#models/place'
import Quartier from '#models/quartier'
import PlaceTransformer from '#transformers/place_transformer'
import QuartierTransformer from '#transformers/quartier_transformer'
import { placeValidator } from '#validators/place'
import stringHelpers from '@adonisjs/core/helpers/string'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { unlink } from 'node:fs/promises'

export default class PlacesController {
  /**
   * Display a list of resource
   */
  async index({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 5
    const places = await Place.query()
      .preload('quartier')
      .orderBy('createdAt', 'desc')
      .paginate(page, limit)
    return inertia.render('admin/places/index', {
      places: PlaceTransformer.paginate(places.all(), places.getMeta()),
    })
  }

  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    let place = new Place()
    const quartiers = await Quartier.all()
    return inertia.render('admin/places/form', {
      place: PlaceTransformer.transform(place),
      quartiers: QuartierTransformer.transform(quartiers),
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session }: HttpContext) {
    const { cover_photo: coverPhoto, ...data } = await request.validateUsing(placeValidator)
    const place = await Place.create(data)
    if (coverPhoto) {
      const newName = stringHelpers.generateRandom(32) + '.' + coverPhoto.extname
      await coverPhoto.move(app.publicPath('uploads'), { name: newName, overwrite: true })
      place.coverPhoto = newName
      await place.save()
    }

    session.flash('success', 'place créée avec succès !')
    return response.redirect().toRoute('places.index')
  }

  private async handleRequest(params: HttpContext['params'], request: HttpContext['request']) {
    const place = await Place.findByOrFail('id', params.id)
    const coverPhoto = request.file('cover_photo')
    if (coverPhoto) {
      const newName = stringHelpers.generateRandom(32) + '.' + coverPhoto.extname
      await coverPhoto.move(app.publicPath('uploads'), { name: newName, overwrite: true })
      place.coverPhoto = newName
    }

    const data = await request.validateUsing(placeValidator)
    await place
      .merge({
        ...data,
        slug: stringHelpers.slug(data.name),
        reviewCount: 0,
        avgRating: 0.0,
        weightedScore: 0.0,
      })
      .save()
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params, inertia }: HttpContext) {
    const place = await Place.findByOrFail('id', params.id)
    await place.load('quartier')
    const quartiers = await Quartier.all()
    return inertia.render('admin/places/form', {
      place: PlaceTransformer.transform(place),
      quartiers: QuartierTransformer.transform(quartiers),
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, session, response }: HttpContext) {
    const place = await Place.findByOrFail('id', params.id)
    const { cover_photo: coverPhoto, ...data } = await request.validateUsing(placeValidator)

    await place.merge(data).save()
    if (coverPhoto) {
      if (place.coverPhoto) {
        const oldPath = app.publicPath('uploads', place.coverPhoto)
        await unlink(oldPath).catch(() => {})
      }
      const newName = stringHelpers.generateRandom(32) + '.' + coverPhoto.extname
      await coverPhoto.move(app.publicPath('uploads'), { name: newName, overwrite: true })
      place.coverPhoto = newName
      await place.save()
    }
    session.flash('success', 'place modifiée avec succès !')
    return response.redirect().toRoute('places.index')
  }

  /**
   * Delete record
   */
  async destroy({ params, session, response }: HttpContext) {
    const place = await Place.findByOrFail('id', params.id)
    await place.delete()
    session.flash('success', 'place supprimée avec succès !')
    return response.redirect().toRoute('places.index')
  }
}
