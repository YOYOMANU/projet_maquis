import Place from '#models/place'
import Quartier from '#models/quartier'
import Tag from '#models/tag'
import PlaceTransformer from '#transformers/place_transformer'
import QuartierTransformer from '#transformers/quartier_transformer'
import TagTransformer from '#transformers/tag_transformer'
import { placeValidator } from '#validators/place'
import stringHelpers from '@adonisjs/core/helpers/string'
import type { HttpContext } from '@adonisjs/core/http'
import drive from '@adonisjs/drive/services/main'

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
    const tags = await Tag.query().where('type', 'place_type')
    return inertia.render('admin/places/form', {
      place: PlaceTransformer.transform(place),
      quartiers: QuartierTransformer.transform(quartiers),
      tags: TagTransformer.transform(tags),
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session, params }: HttpContext) {
    this.handleRequest(params, request)
    session.flash('success', 'place créée avec succès !')
    return response.redirect().toRoute('places.index')
  }

  private async handleRequest(params: HttpContext['params'], request: HttpContext['request']) {
    const place = params.id ? await Place.findByOrFail('id', params.id) : new Place()
    const { cover_photo: coverPhoto, tags, ...data } = await request.validateUsing(placeValidator)
    await place.merge(data).save()
    await place.related('tags').sync(tags)

    if (coverPhoto) {
      if (place.coverPhoto) {
        await drive.use().delete(place.coverPhoto)
      }
      const newName = stringHelpers.generateRandom(32) + '.' + coverPhoto.extname
      const key = `uploads/${newName}`
      await coverPhoto.moveToDisk(key)
      place.coverPhoto = key
      await place.save()
    }
  }

  /**
   * Edit individual record
   */
  async edit({ params, inertia }: HttpContext) {
    const place = await Place.findByOrFail('id', params.id)
    await place.load('quartier')
    await place.load('tags')
    const quartiers = await Quartier.all()
    const tags = await Tag.query().where('type', 'place_type')
    return inertia.render('admin/places/form', {
      place: PlaceTransformer.transform(place),
      quartiers: QuartierTransformer.transform(quartiers),
      tags: TagTransformer.transform(tags),
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, session, response }: HttpContext) {
    this.handleRequest(params, request)
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
