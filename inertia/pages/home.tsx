import { Data } from '@generated/data'
import FeedLayout from '~/components/feed-layout'
import Header from '~/components/header'
import { InertiaProps } from '~/types'
import { Meta } from '~/types/index'

type Props = InertiaProps<{
  places: {
    data: Data.Place[]
    metadata: Meta
  }
}>

export default function Home({ places }: Props) {
  const { data, metadata } = places
  return (
    <>
      <Header />
      <FeedLayout data={data} metadata={metadata} />
    </>
  )
}
