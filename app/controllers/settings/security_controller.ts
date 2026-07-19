import type { HttpContext } from '@adonisjs/core/http'

export default class SecurityController {
  async edit({ inertia }: HttpContext) {
    return inertia.render('settings/security', {})
  }
}
