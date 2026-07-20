import Tag from '#models/tag'
import TagTransformer from '#transformers/tag_transformer'
import { TagCreateValidator, TagUpdateValidator } from '#validators/tag'
import type { HttpContext } from '@adonisjs/core/http'

export default class TagsController {
  /**
   * Display a list of resource
   */
  async index({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 5
    const tags = await Tag.query().paginate(page, limit)
    return inertia.render('admin/tag/index', {
      tags: TagTransformer.paginate(tags.all(), tags.getMeta()),
    })
  }

  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    const tag = new Tag()
    return inertia.render('admin/tag/form', { tag: TagTransformer.transform(tag) })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, session, response }: HttpContext) {
    const data = await request.validateUsing(TagCreateValidator)
    await Tag.create(data)
    session.flash('success', 'Tag ajouté')
    return response.redirect().toRoute('tags.index')
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params, inertia }: HttpContext) {
    const tag = await Tag.findByOrFail('id', params.id)
    return inertia.render('admin/tag/form', { tag: TagTransformer.transform(tag) })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, session, response }: HttpContext) {
    const data = await request.validateUsing(TagUpdateValidator)
    const tag = await Tag.findBy('id', params.id)
    await tag?.merge(data).save()
    session.flash('success', 'Tag modifié')
    return response.redirect().toRoute('tags.index')
  }

  /**
   * Delete record
   */
  async destroy({ params, session, response }: HttpContext) {
    const tag = await Tag.findByOrFail('id', params.id)
    await tag.delete()
    session.flash('success', 'Tag supprimé')
    return response.redirect().toRoute('tags.index')
  }
}
