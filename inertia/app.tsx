import './css/app.css'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { TuyauProvider } from '@adonisjs/inertia/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { client } from './client'
import { Toaster } from './components/ui/sonner'
import { TooltipProvider } from './components/ui/tooltip'
import { initializeTheme } from './hooks/use-appearance'
import AppLayout from './layouts/app-layout'
import AuthLayout from './layouts/auth-layout'
import SettingsLayout from './layouts/settings/layout'
import Layout from './layouts/default'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

function resolveLayout(name: string) {
  if (name.startsWith('auth/')) {
    return (page: any) => <AuthLayout>{page}</AuthLayout>
  }

  if (name.startsWith('dashboard')) {
    return (page: any) => <AppLayout>{page}</AppLayout>
  }

  if (name.startsWith('admin')) {
    return (page: any) => <AppLayout>{page}</AppLayout>
  }

  if (name.startsWith('settings/')) {
    return (page: any) => (
      <AppLayout>
        <SettingsLayout>{page}</SettingsLayout>
      </AppLayout>
    )
  }

  return (page: any) => <Layout>{page}</Layout>
}

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: async (name) => {
    const page: any = await resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx')
    )

    if (page) {
      page.default.layout = resolveLayout(name)
    }

    return page
  },

  setup({ el, App, props }) {
    createRoot(el).render(
      <TuyauProvider client={client}>
        <TooltipProvider delayDuration={0}>
          <App {...props} />
          <Toaster richColors position="top-center" closeButton />
        </TooltipProvider>
      </TuyauProvider>
    )
  },

  progress: {
    color: '#4B5563',
  },
})

initializeTheme()
