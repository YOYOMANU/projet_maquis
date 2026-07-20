import Quartier from '#models/quartier'
import QuartierTransformer from '#transformers/quartier_transformer'
import { quartierCreateValidator, quartierUpdateValidator } from '#validators/quartier'
import type { HttpContext } from '@adonisjs/core/http'

export default class QuartiersController {
  /**
   * Display a list of resource
   */
  async index({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 5

    const quartiers = await Quartier.query().paginate(page, limit)

    return inertia.render('admin/quartier/index', {
      quartier: QuartierTransformer.paginate(quartiers.all(), quartiers.getMeta()),
    })
  }

  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    const quartier = new Quartier()
    return inertia.render('admin/quartier/form', {
      quartier: QuartierTransformer.transform(quartier),
    })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, session, response }: HttpContext) {
    const data = await request.validateUsing(quartierCreateValidator)
    await Quartier.create(data)
    session.flash('success', 'Le quartier a bien été créer !')
    return response.redirect().toRoute('quartiers.index')
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params, inertia }: HttpContext) {
    const quartier = await Quartier.findByOrFail('id', params.id)
    return inertia.render('admin/quartier/form', {
      quartier: QuartierTransformer.transform(quartier),
    })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, session, response }: HttpContext) {
    const quartier = await Quartier.findByOrFail('id', params.id)
    const data = await request.validateUsing(quartierUpdateValidator)
    await quartier.merge(data).save()
    session.flash('success', 'Le quartier a bien été modifié !')
    return response.redirect().toRoute('quartiers.index')
  }

  /**
   * Delete record
   */
  async destroy({ params, session, response }: HttpContext) {
    const quartier = await Quartier.findByOrFail('id', params.id)
    await quartier.delete()
    session.flash('success', 'Le quartier a bien été supprimé !')
    return response.redirect().toRoute('quartiers.index')
  }
}
