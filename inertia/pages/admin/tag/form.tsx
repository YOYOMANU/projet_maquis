import { SaveIcon } from 'lucide-react'
import { TopAction } from '~/components/top-action'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { withAppLayout } from '~/layouts/app-layout'
import type { BreadcrumbItem } from '~/types/index'
import { Tags } from '~/types/index'
import { routes } from '@generated/registry'
import { Form } from '@adonisjs/inertia/react'
import { FormField } from '~/components/form-field'

const Breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Tags',
    href: routes['tags.index'].pattern,
  },
  {
    title: 'Editer',
    href: '#',
  },
]

type Props = {
  tag: Tags
}

function TagEditPage({ tag }: Props) {
  return (
    <Form route={tag.id ? 'tags.update' : 'tags.store'} routeParams={{ id: tag.id }}>
      {({ errors, processing }) => (
        <>
          <FormField htmlFor="name" label="name" error={errors.name}>
            <Input id="name" name="name" defaultValue={tag.name} aria-invalid={!!errors.name} />
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
