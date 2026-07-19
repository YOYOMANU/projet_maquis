import { updateProfileValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfileController {
  async edit({ inertia }: HttpContext) {
    return inertia.render('settings/profile', { mustVerifyEmail: true })
  }

  async update({ inertia, request }: HttpContext) {
    const data = await request.validateUsing(updateProfileValidator)
  }
}
