import { Head } from '@inertiajs/react'
import AppearanceTabs from '~/components/appearance-tabs'
import Heading from '~/components/heading'
// import { edit as editAppearance } from '~/routes/appearance'
import SettingsLayout from '~/layouts/settings/layout'
import AppLayout from '~/layouts/app-layout'
import { ReactNode } from 'react'

export default function Appearance() {
  return (
    <>
      <Head title="Appearance settings" />

      <h1 className="sr-only">Appearance settings</h1>

      <div className="space-y-6">
        <Heading
          variant="small"
          title="Appearance settings"
          description="Update the appearance settings for your account"
        />
        <AppearanceTabs />
      </div>
    </>
  )
}

Appearance.layout = (page: ReactNode) => (
  <AppLayout
    breadcrumbs={[
      {
        title: 'Appearance settings',
        href: '',
      },
    ]}
  >
    <SettingsLayout>{page}</SettingsLayout>
  </AppLayout>
)
