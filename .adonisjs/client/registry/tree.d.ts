/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  drive: {
    fs: {
      serve: typeof routes['drive.fs.serve']
    }
  }
  home: typeof routes['home']
  dashboard: typeof routes['dashboard']
  tags: {
    index: typeof routes['tags.index']
    create: typeof routes['tags.create']
    store: typeof routes['tags.store']
    edit: typeof routes['tags.edit']
    update: typeof routes['tags.update']
    destroy: typeof routes['tags.destroy']
  }
  quartiers: {
    index: typeof routes['quartiers.index']
    create: typeof routes['quartiers.create']
    store: typeof routes['quartiers.store']
    edit: typeof routes['quartiers.edit']
    update: typeof routes['quartiers.update']
    destroy: typeof routes['quartiers.destroy']
  }
  places: {
    index: typeof routes['places.index']
    create: typeof routes['places.create']
    store: typeof routes['places.store']
    edit: typeof routes['places.edit']
    update: typeof routes['places.update']
    destroy: typeof routes['places.destroy']
  }
  reviews: {
    index: typeof routes['reviews.index']
    create: typeof routes['reviews.create']
    store: typeof routes['reviews.store']
    edit: typeof routes['reviews.edit']
    update: typeof routes['reviews.update']
    destroy: typeof routes['reviews.destroy']
  }
  profile: {
    edit: typeof routes['profile.edit']
  }
  security: {
    edit: typeof routes['security.edit']
  }
  appearence: {
    edit: typeof routes['appearence.edit']
  }
  register: typeof routes['register']
  newAccount: {
    store: typeof routes['new_account.store']
  }
  login: typeof routes['login']
  session: {
    store: typeof routes['session.store']
  }
  logout: typeof routes['logout']
}
