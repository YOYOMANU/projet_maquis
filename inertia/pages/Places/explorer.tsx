import { Data } from '@generated/data'
import Header from '~/components/header'
import { SearchLayout } from '~/components/search-layout'
import { InertiaProps } from '~/types'
import { Meta } from '~/types/index'

type Props = InertiaProps<{
  places: {
    data: Data.Place[]
    metadata: Meta
  }
}>

export default function Explorer({ places }: Props) {
  const { data, metadata } = places

  return (
    <>
      <Header />
      <SearchLayout
        results={data}
        metadata={metadata}
        count={metadata.total}
        title="Street-food · Cocody"
      />
    </>
  )
}
