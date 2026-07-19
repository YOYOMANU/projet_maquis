export type * from './auth'
export type * from './navigation'
export type * from './ui'

interface Tags {
  id: number
  label: string
  type: 'place_type' | 'ambiance'
  createdAt: string | null
  updatedAt: string | null
}

export type Review = {
  id: string
  photoLabel: string
  placeName: string
  placeMeta: string
  rating: number // 1-5, sert à générer les étoiles
  tags: Tags[]
  text: string
  authorName: string
  timeAgo: string
  addedTo?: string
}

export type TrendEntry = {
  rank: number
  name: string
  score: number
}

export type PopularPlace = {
  name: string
  duration: string
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
