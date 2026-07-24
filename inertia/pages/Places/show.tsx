import { Data } from '@generated/data'
import PlaceDetail from '~/components/PlaceDetail'
import { InertiaProps } from '~/types'
import { Meta } from '~/types/index'

type Props = InertiaProps<{
  place: Data.Place
  reviews: {
    data: Data.Review[]
    metadata: Meta
  }
}>

export default function ShowPlace({ place, reviews }: Props) {
  return <PlaceDetail reviews={reviews.data} meta={reviews.metadata} place={place} />
}
