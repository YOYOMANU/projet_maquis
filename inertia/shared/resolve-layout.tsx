// resolve-layout.tsx (nouveau fichier partagé)
import AppLayout from '~/layouts/app-layout'
import AuthLayout from '~/layouts/auth-layout'
import SettingsLayout from '~/layouts/settings/layout'
import Layout from '~/layouts/default'

export function resolveLayout(name: string) {
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
