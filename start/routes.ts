/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import DashboardController from '#controllers/dashboard/dashboard_controller'
import SessionController from '#controllers/session_controller'
import NewAccountController from '#controllers/new_account_controller'
import TagsController from '#controllers/dashboard/tags_controller'

router.on('/').renderInertia('home', {}).as('home')
router.get('dashboard', [DashboardController, 'index']).as('dashboard')

router.resource('tags', TagsController).except(['show'])

router
  .group(() => {
    router.get('signup', [NewAccountController, 'create'])
    router.post('signup', [NewAccountController, 'store'])

    router.get('login', [SessionController, 'create'])
    router.post('login', [SessionController, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('logout', [SessionController, 'destroy'])
  })
  .use(middleware.auth())
