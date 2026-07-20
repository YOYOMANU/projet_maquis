import { SaveIcon } from 'lucide-react'
import { TopAction } from '~/components/top-action'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { withAppLayout } from '~/layouts/app-layout'
import type { BreadcrumbItem } from '~/types/index'
import { Form } from '@adonisjs/inertia/react'
import { FormField } from '~/components/form-field'
import { InertiaProps } from '~/types'
import { Data } from '@generated/data'
import { urlFor } from '~/client'

const Breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Quartiers',
    href: urlFor('quartiers.index'),
  },
  {
    title: 'Editer',
    href: '#',
  },
]

type Props = InertiaProps<{
  quartier: Data.Quartier
}>

function TagEditPage({ quartier }: Props) {
  return (
    <Form
      route={quartier.id ? 'quartiers.update' : 'quartiers.store'}
      routeParams={{ id: quartier.id }}
    >
      {({ errors, processing }) => (
        <>
          <FormField htmlFor="name" label="name" error={errors.name}>
            <Input
              id="name"
              name="name"
              defaultValue={quartier.name}
              aria-invalid={!!errors.name}
            />
          </FormField>
          <TopAction>
            <Button disabled={processing}>
              <SaveIcon /> Enregistrer
            </Button>
          </TopAction>
        </>
      )}
    </Form>
  )
}

export default withAppLayout(Breadcrumbs, TagEditPage)
