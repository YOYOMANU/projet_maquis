import { Data } from '@generated/data'
import PlaceDetail from '~/components/PlaceDetail'
import { InertiaProps } from '~/types'

type Props = InertiaProps<{
  place: Data.Place.Variants['forDetailPlace']
}>

export default function ShowPlace({ place }: Props) {
  return <PlaceDetail place={place} />
}
