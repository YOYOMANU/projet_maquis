import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'admin/tag/form': ExtractProps<(typeof import('../../inertia/pages/admin/tag/form.tsx'))['default']>
    'admin/tag/index': ExtractProps<(typeof import('../../inertia/pages/admin/tag/index.tsx'))['default']>
    'auth/confirm-password': ExtractProps<(typeof import('../../inertia/pages/auth/confirm-password.tsx'))['default']>
    'auth/forgot-password': ExtractProps<(typeof import('../../inertia/pages/auth/forgot-password.tsx'))['default']>
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.tsx'))['default']>
    'auth/register': ExtractProps<(typeof import('../../inertia/pages/auth/register.tsx'))['default']>
    'auth/reset-password': ExtractProps<(typeof import('../../inertia/pages/auth/reset-password.tsx'))['default']>
    'auth/signup': ExtractProps<(typeof import('../../inertia/pages/auth/signup.tsx'))['default']>
    'auth/two-factor-challenge': ExtractProps<(typeof import('../../inertia/pages/auth/two-factor-challenge.tsx'))['default']>
    'auth/verify-email': ExtractProps<(typeof import('../../inertia/pages/auth/verify-email.tsx'))['default']>
    'dashboard': ExtractProps<(typeof import('../../inertia/pages/dashboard.tsx'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.tsx'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.tsx'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.tsx'))['default']>
    'settings/appearance': ExtractProps<(typeof import('../../inertia/pages/settings/appearance.tsx'))['default']>
    'settings/profile': ExtractProps<(typeof import('../../inertia/pages/settings/profile.tsx'))['default']>
    'settings/security': ExtractProps<(typeof import('../../inertia/pages/settings/security.tsx'))['default']>
  }
}
