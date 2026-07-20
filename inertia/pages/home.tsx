import { Link } from '@adonisjs/inertia/react'
import { urlFor } from '~/client'
import FeedLayout from '~/components/feed-layout'
import Header from '~/components/header'
import { Button } from '~/components/ui/button'

export default function Home() {
  return (
    <>
      <Header />
      <Button asChild>
        <Link href={urlFor('dashboard')}>Dashboard</Link>
      </Button>
      <FeedLayout />
    </>
  )
}
