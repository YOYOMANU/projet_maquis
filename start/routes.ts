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
import ProfileController from '#controllers/settings/profile_controller'
import SecurityController from '#controllers/settings/security_controller'
import QuartiersController from '#controllers/dashboard/quartiers_controller'
import PlacesController from '#controllers/dashboard/places_controller'
import ReviewsController from '#controllers/dashboard/reviews_controller'
import HomeController from '#controllers/home_controller'
import ExplorersController from '#controllers/explorers_controller'
import UserReviewsController from '#controllers/user_reviews_controller'

// Public path
router.get('/', [HomeController, 'index']).as('home')
router.get('/explorer', [ExplorersController, 'explorer']).as('explorer')
router
  .get('/explorer/:id/:slug', [ExplorersController, 'show'])
  .as('explorer.show')
  .where('id', router.matchers.number())
  .where('slug', router.matchers.slug())
router
  .post('/places/:placeId/reviews', [UserReviewsController, 'store'])
  .as('user.reviews.store')
  .use(middleware.auth())

// Dashboard Admin
router
  .group(() => {
    router.get('/', [DashboardController, 'index']).as('dashboard').use(middleware.auth())
    router.resource('tags', TagsController).except(['show'])
    router.resource('quartiers', QuartiersController).except(['show'])
    router.resource('places', PlacesController).except(['show'])
    router.resource('reviews', ReviewsController).except(['show'])
  })
  .prefix('/dashboard')
  .use(middleware.auth())

// Settings profile
router
  .group(() => {
    router.get('settings/profile', [ProfileController, 'edit']).as('profile.edit')
    // router.patch('settings/profile', [ProfileController, 'update']).as('profile.update')
    // router.post('settings/avatar', [ProfileController, 'updateAvatar']).as('profile.update.avatar')
    // router.delete('settings/avatar', [ProfileController, 'destroyAvatar']).as('profile.destroy.avatar')
  })
  .use(middleware.auth())

router
  .group(() => {
    // router.delete('settings/profile', [ProfileController, 'destroy']).as('profile.destroy')
    router.get('settings/security', [SecurityController, 'edit']).as('security.edit')
    // router.put('settings/password', [ProfileController, 'update']).as('user-password.update')
    router.on('settings/appearance').renderInertia('settings/appearance', {}).as('appearence.edit')
  })
  .use(middleware.auth())

router
  .group(() => {
    router.get('signup', [NewAccountController, 'create']).as('register')
    router.post('signup', [NewAccountController, 'store'])

    router.get('login', [SessionController, 'create']).as('login')
    router.post('login', [SessionController, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('logout', [SessionController, 'destroy']).as('logout')
  })
  .use(middleware.auth())
