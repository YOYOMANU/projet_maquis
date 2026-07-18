import { routes } from '@generated/registry'
import { router } from '@inertiajs/react'
import FeedLayout from '~/components/feed-layout'
import Header from '~/components/header'
import { Button } from '~/components/ui/button'

export default function Home() {
  return (
    <>
      <Header />
      <Button onClick={() => router.visit(routes.dashboard.pattern)}>Dashboard</Button>
      <FeedLayout />
    </>
  )
}
