import './css/app.css'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { TuyauProvider } from '@adonisjs/inertia/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { client } from './client'
import { Toaster } from './components/ui/sonner'
import { TooltipProvider } from './components/ui/tooltip'
import { initializeTheme } from './hooks/use-appearance'

import { resolveLayout } from '~/shared/resolve-layout'
const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: async (name) => {
    const page: any = await resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx')
    )
    if (page && page.default.layout === undefined) {
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
