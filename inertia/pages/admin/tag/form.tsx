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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { SelectWithItems } from '~/components/ui/select-with-items'

const Breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Tags',
    href: urlFor('tags.index'),
  },
  {
    title: 'Editer',
    href: '#',
  },
]

type Props = InertiaProps<{
  tag: Data.Tag
}>
const TagType = ['place_type', 'ambiance'] as const

function TagEditPage({ tag }: Props) {
  console.log(tag)

  return (
    <Form route={tag.id ? 'tags.update' : 'tags.store'} routeParams={{ id: tag.id }}>
      {({ errors, processing }) => (
        <>
          <FormField htmlFor="label" label="label" error={errors.name}>
            <Input id="label" name="label" defaultValue={tag.label} aria-invalid={!!errors.label} />
          </FormField>

          <FormField htmlFor="type" label="type" error={errors.type}>
            <Select name={'type'} defaultValue={tag.type}>
              <SelectTrigger>
                <SelectValue placeholder={'chosissez un type'} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {TagType.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
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
