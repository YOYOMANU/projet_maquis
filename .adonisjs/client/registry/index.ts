/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'drive.fs.serve': {
    methods: ["GET","HEAD"],
    pattern: '/uploads/*',
    tokens: [{"old":"/uploads/*","type":0,"val":"uploads","end":""},{"old":"/uploads/*","type":2,"val":"*","end":""}],
    types: placeholder as Registry['drive.fs.serve']['types'],
  },
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'dashboard': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard',
    tokens: [{"old":"/dashboard","type":0,"val":"dashboard","end":""}],
    types: placeholder as Registry['dashboard']['types'],
  },
  'tags.index': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/tags',
    tokens: [{"old":"/dashboard/tags","type":0,"val":"dashboard","end":""},{"old":"/dashboard/tags","type":0,"val":"tags","end":""}],
    types: placeholder as Registry['tags.index']['types'],
  },
  'tags.create': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/tags/create',
    tokens: [{"old":"/dashboard/tags/create","type":0,"val":"dashboard","end":""},{"old":"/dashboard/tags/create","type":0,"val":"tags","end":""},{"old":"/dashboard/tags/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['tags.create']['types'],
  },
  'tags.store': {
    methods: ["POST"],
    pattern: '/dashboard/tags',
    tokens: [{"old":"/dashboard/tags","type":0,"val":"dashboard","end":""},{"old":"/dashboard/tags","type":0,"val":"tags","end":""}],
    types: placeholder as Registry['tags.store']['types'],
  },
  'tags.edit': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/tags/:id/edit',
    tokens: [{"old":"/dashboard/tags/:id/edit","type":0,"val":"dashboard","end":""},{"old":"/dashboard/tags/:id/edit","type":0,"val":"tags","end":""},{"old":"/dashboard/tags/:id/edit","type":1,"val":"id","end":""},{"old":"/dashboard/tags/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['tags.edit']['types'],
  },
  'tags.update': {
    methods: ["PUT","PATCH"],
    pattern: '/dashboard/tags/:id',
    tokens: [{"old":"/dashboard/tags/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/tags/:id","type":0,"val":"tags","end":""},{"old":"/dashboard/tags/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tags.update']['types'],
  },
  'tags.destroy': {
    methods: ["DELETE"],
    pattern: '/dashboard/tags/:id',
    tokens: [{"old":"/dashboard/tags/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/tags/:id","type":0,"val":"tags","end":""},{"old":"/dashboard/tags/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tags.destroy']['types'],
  },
  'quartiers.index': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/quartiers',
    tokens: [{"old":"/dashboard/quartiers","type":0,"val":"dashboard","end":""},{"old":"/dashboard/quartiers","type":0,"val":"quartiers","end":""}],
    types: placeholder as Registry['quartiers.index']['types'],
  },
  'quartiers.create': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/quartiers/create',
    tokens: [{"old":"/dashboard/quartiers/create","type":0,"val":"dashboard","end":""},{"old":"/dashboard/quartiers/create","type":0,"val":"quartiers","end":""},{"old":"/dashboard/quartiers/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['quartiers.create']['types'],
  },
  'quartiers.store': {
    methods: ["POST"],
    pattern: '/dashboard/quartiers',
    tokens: [{"old":"/dashboard/quartiers","type":0,"val":"dashboard","end":""},{"old":"/dashboard/quartiers","type":0,"val":"quartiers","end":""}],
    types: placeholder as Registry['quartiers.store']['types'],
  },
  'quartiers.edit': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/quartiers/:id/edit',
    tokens: [{"old":"/dashboard/quartiers/:id/edit","type":0,"val":"dashboard","end":""},{"old":"/dashboard/quartiers/:id/edit","type":0,"val":"quartiers","end":""},{"old":"/dashboard/quartiers/:id/edit","type":1,"val":"id","end":""},{"old":"/dashboard/quartiers/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['quartiers.edit']['types'],
  },
  'quartiers.update': {
    methods: ["PUT","PATCH"],
    pattern: '/dashboard/quartiers/:id',
    tokens: [{"old":"/dashboard/quartiers/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/quartiers/:id","type":0,"val":"quartiers","end":""},{"old":"/dashboard/quartiers/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['quartiers.update']['types'],
  },
  'quartiers.destroy': {
    methods: ["DELETE"],
    pattern: '/dashboard/quartiers/:id',
    tokens: [{"old":"/dashboard/quartiers/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/quartiers/:id","type":0,"val":"quartiers","end":""},{"old":"/dashboard/quartiers/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['quartiers.destroy']['types'],
  },
  'places.index': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/places',
    tokens: [{"old":"/dashboard/places","type":0,"val":"dashboard","end":""},{"old":"/dashboard/places","type":0,"val":"places","end":""}],
    types: placeholder as Registry['places.index']['types'],
  },
  'places.create': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/places/create',
    tokens: [{"old":"/dashboard/places/create","type":0,"val":"dashboard","end":""},{"old":"/dashboard/places/create","type":0,"val":"places","end":""},{"old":"/dashboard/places/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['places.create']['types'],
  },
  'places.store': {
    methods: ["POST"],
    pattern: '/dashboard/places',
    tokens: [{"old":"/dashboard/places","type":0,"val":"dashboard","end":""},{"old":"/dashboard/places","type":0,"val":"places","end":""}],
    types: placeholder as Registry['places.store']['types'],
  },
  'places.edit': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/places/:id/edit',
    tokens: [{"old":"/dashboard/places/:id/edit","type":0,"val":"dashboard","end":""},{"old":"/dashboard/places/:id/edit","type":0,"val":"places","end":""},{"old":"/dashboard/places/:id/edit","type":1,"val":"id","end":""},{"old":"/dashboard/places/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['places.edit']['types'],
  },
  'places.update': {
    methods: ["PUT","PATCH"],
    pattern: '/dashboard/places/:id',
    tokens: [{"old":"/dashboard/places/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/places/:id","type":0,"val":"places","end":""},{"old":"/dashboard/places/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['places.update']['types'],
  },
  'places.destroy': {
    methods: ["DELETE"],
    pattern: '/dashboard/places/:id',
    tokens: [{"old":"/dashboard/places/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/places/:id","type":0,"val":"places","end":""},{"old":"/dashboard/places/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['places.destroy']['types'],
  },
  'reviews.index': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/reviews',
    tokens: [{"old":"/dashboard/reviews","type":0,"val":"dashboard","end":""},{"old":"/dashboard/reviews","type":0,"val":"reviews","end":""}],
    types: placeholder as Registry['reviews.index']['types'],
  },
  'reviews.create': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/reviews/create',
    tokens: [{"old":"/dashboard/reviews/create","type":0,"val":"dashboard","end":""},{"old":"/dashboard/reviews/create","type":0,"val":"reviews","end":""},{"old":"/dashboard/reviews/create","type":0,"val":"create","end":""}],
    types: placeholder as Registry['reviews.create']['types'],
  },
  'reviews.store': {
    methods: ["POST"],
    pattern: '/dashboard/reviews',
    tokens: [{"old":"/dashboard/reviews","type":0,"val":"dashboard","end":""},{"old":"/dashboard/reviews","type":0,"val":"reviews","end":""}],
    types: placeholder as Registry['reviews.store']['types'],
  },
  'reviews.edit': {
    methods: ["GET","HEAD"],
    pattern: '/dashboard/reviews/:id/edit',
    tokens: [{"old":"/dashboard/reviews/:id/edit","type":0,"val":"dashboard","end":""},{"old":"/dashboard/reviews/:id/edit","type":0,"val":"reviews","end":""},{"old":"/dashboard/reviews/:id/edit","type":1,"val":"id","end":""},{"old":"/dashboard/reviews/:id/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['reviews.edit']['types'],
  },
  'reviews.update': {
    methods: ["PUT","PATCH"],
    pattern: '/dashboard/reviews/:id',
    tokens: [{"old":"/dashboard/reviews/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/reviews/:id","type":0,"val":"reviews","end":""},{"old":"/dashboard/reviews/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['reviews.update']['types'],
  },
  'reviews.destroy': {
    methods: ["DELETE"],
    pattern: '/dashboard/reviews/:id',
    tokens: [{"old":"/dashboard/reviews/:id","type":0,"val":"dashboard","end":""},{"old":"/dashboard/reviews/:id","type":0,"val":"reviews","end":""},{"old":"/dashboard/reviews/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['reviews.destroy']['types'],
  },
  'profile.edit': {
    methods: ["GET","HEAD"],
    pattern: '/settings/profile',
    tokens: [{"old":"/settings/profile","type":0,"val":"settings","end":""},{"old":"/settings/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.edit']['types'],
  },
  'security.edit': {
    methods: ["GET","HEAD"],
    pattern: '/settings/security',
    tokens: [{"old":"/settings/security","type":0,"val":"settings","end":""},{"old":"/settings/security","type":0,"val":"security","end":""}],
    types: placeholder as Registry['security.edit']['types'],
  },
  'appearence.edit': {
    methods: ["GET","HEAD"],
    pattern: '/settings/appearance',
    tokens: [{"old":"/settings/appearance","type":0,"val":"settings","end":""},{"old":"/settings/appearance","type":0,"val":"appearance","end":""}],
    types: placeholder as Registry['appearence.edit']['types'],
  },
  'register': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['register']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'login': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['login']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.store']['types'],
  },
  'logout': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['logout']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
