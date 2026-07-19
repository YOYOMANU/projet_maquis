/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
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
