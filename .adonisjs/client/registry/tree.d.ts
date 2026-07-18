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
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
}
