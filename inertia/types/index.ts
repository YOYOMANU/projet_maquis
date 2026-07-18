export type * from './auth'
export type * from './navigation'
export type * from './ui'

export type Tags = {
  id: number
  name: string
}

export type PaginatedCollection<T> = {
  data: T[]
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
  meta: {
    current_page: number
    from: number
    last_page: number
    path: string
    per_page: number
    to: number
    total: number
    links: {
      url: string | null
      label: string
      active: boolean
    }[]
  }
}
