import { Data } from '@generated/data'
import PlaceDetail from '~/components/PlaceDetail'
import { InertiaProps } from '~/types'
import { Meta } from '~/types/index'

type Props = InertiaProps<{
  place: Data.Place.Variants['forDetailPlace']
  reviews: {
    data: Data.Review[]
    metadata: Meta
  }
  ambianceTags: Data.Tag[]
}>

export default function ShowPlace({ place, reviews, ambianceTags }: Props) {
  return (
    <PlaceDetail
      ambianceTags={ambianceTags}
      reviews={reviews.data}
      meta={reviews.metadata}
      place={place}
    />
  )
}
