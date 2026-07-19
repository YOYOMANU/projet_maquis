import { Form } from '@adonisjs/inertia/react'
import { routes } from '@generated/registry'
import { Head } from '@inertiajs/react'
import InputError from '~/components/input-error'
import PasswordInput from '~/components/password-input'
import TextLink from '~/components/text-link'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Spinner } from '~/components/ui/spinner'
import AuthLayout from '~/layouts/auth-layout'

export default function Register() {
  return (
    <>
      <Head title="Register" />
      <Form
        route="new_account.store"
        // {...store.form()}
        resetOnSuccess={['password', 'password_confirmation']}
        disableWhileProcessing
        className="flex flex-col gap-6"
      >
        {({ processing, errors }) => (
          <>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  type="text"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="fullName"
                  name="fullName"
                  placeholder="Full name"
                />
                <InputError message={errors.fullName} className="mt-2" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  tabIndex={2}
                  autoComplete="email"
                  name="email"
                  placeholder="email@example.com"
                />
                <InputError message={errors.email} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  id="password"
                  required
                  tabIndex={3}
                  autoComplete="new-password"
                  name="password"
                  placeholder="Password"
                />
                <InputError message={errors.password} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="passwordConfirmation">Confirm password</Label>
                <PasswordInput
                  id="passwordConfirmation"
                  required
                  tabIndex={4}
                  autoComplete="new-password"
                  name="passwordConfirmation"
                  placeholder="Confirm password"
                />
                <InputError message={errors.passwordConfirmation} />
              </div>

              <Button
                type="submit"
                className="mt-2 w-full"
                tabIndex={5}
                data-test="register-user-button"
              >
                {processing && <Spinner />}
                Create account
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <TextLink href={routes.login.pattern} tabIndex={6}>
                Log in
              </TextLink>
            </div>
          </>
        )}
      </Form>
    </>
  )
}

Register.layout = (page: React.ReactNode) => (
  <AuthLayout
    title="Create an account"
    description="Enter your details below to create your account"
  >
    {page}
  </AuthLayout>
)
