import { Data } from '@generated/data'
import { Form, Head, usePage } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import { ReactNode } from 'react'
import DeleteUser from '~/components/delete-user'
import Heading from '~/components/heading'
import InputError from '~/components/input-error'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import AppLayout from '~/layouts/app-layout'
import SettingsLayout from '~/layouts/settings/layout'

export default function Profile({
  mustVerifyEmail,
  status,
}: {
  mustVerifyEmail: boolean
  status?: string
}) {
  const { user } = usePage<Data.SharedProps>().props

  if (!user) {
    return null
  }

  return (
    <>
      <Head title="Profile settings" />

      <h1 className="sr-only">Profile settings</h1>

      <div className="space-y-6">
        <Heading variant="small" title="Profile" description="Update your name and email address" />

        <Form
          // {...ProfileController.update.form()}
          options={{
            preserveScroll: true,
          }}
          className="space-y-6"
        >
          {({ processing, errors }) => (
            <>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>

                <Input
                  id="name"
                  className="mt-1 block w-full"
                  defaultValue={user.fullName ?? ''}
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Full name"
                />

                <InputError className="mt-2" message={errors.fullName} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>

                <Input
                  id="email"
                  type="email"
                  className="mt-1 block w-full"
                  defaultValue={user.email}
                  name="email"
                  required
                  autoComplete="username"
                  placeholder="Email address"
                />

                <InputError className="mt-2" message={errors.email} />
              </div>

              {mustVerifyEmail &&
                // user.email_verified_at === null && (
                user !== null && (
                  <div>
                    <p className="-mt-4 text-sm text-muted-foreground">
                      Your email address is unverified.{' '}
                      <Link
                        // href={send()}
                        as="button"
                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                      >
                        Click here to re-send the verification email.
                      </Link>
                    </p>

                    {status === 'verification-link-sent' && (
                      <div className="mt-2 text-sm font-medium text-green-600">
                        A new verification link has been sent to your email address.
                      </div>
                    )}
                  </div>
                )}

              <div className="flex items-center gap-4">
                <Button disabled={processing} data-test="update-profile-button">
                  Save
                </Button>
              </div>
            </>
          )}
        </Form>
      </div>

      <DeleteUser />
    </>
  )
}

Profile.layout = (page: ReactNode) => (
  <AppLayout
    breadcrumbs={[
      {
        title: 'Profile settings',
        href: 'edit()',
      },
    ]}
  >
    <SettingsLayout>{page}</SettingsLayout>
  </AppLayout>
)
