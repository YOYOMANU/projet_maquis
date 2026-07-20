import { SaveIcon } from 'lucide-react'
import { TopAction } from '~/components/top-action'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { withAppLayout } from '~/layouts/app-layout'
import type { BreadcrumbItem } from '~/types/index'
import { Form } from '@adonisjs/inertia/react'
import { FormField } from '~/components/form-field'
import { InertiaProps } from '~/types'
import { Data } from '@generated/data'
import { urlFor } from '~/client'
import { ImageInput } from '~/components/ui/image-dropzone'

const Breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Places',
    href: urlFor('places.index'),
  },
  {
    title: 'Editer',
    href: '#',
  },
]

const PRICE_RANGES = ['$', '$$', '$$$'] as const

type Props = InertiaProps<{
  place: Data.Place
  quartiers: Data.Quartier[]
}>

function TagEditPage({ place, quartiers }: Props) {
  console.log(place)

  return (
    <Form
      route={place.id ? 'places.update' : 'places.store'}
      routeParams={{ id: place.id }}
      encType="multipart/form-data"
    >
      {({ errors, processing }) => (
        <>
          <FormField htmlFor="cover_photo" label="Photo de couverture" error={errors.cover_photo}>
            <ImageInput
              className="w-50 h-50"
              id="cover_photo"
              name="cover_photo"
              defaultValue={place.coverPhoto ? `/uploads/${place.coverPhoto}` : ''}
              aria-invalid={!!errors.cover_photo}
            />
          </FormField>
          <FormField htmlFor="name" label="Nom" error={errors.name}>
            <Input id="name" name="name" defaultValue={place.name} aria-invalid={!!errors.name} />
          </FormField>

          <FormField htmlFor="quartier_id" label="Quartier" error={errors.quartier_id}>
            <Select name="quartier_id" defaultValue={place.quartier?.id?.toString()}>
              <SelectTrigger id="quartier_id" aria-invalid={!!errors.quartier_id}>
                <SelectValue placeholder="Sélectionner un quartier" />
              </SelectTrigger>
              <SelectContent>
                {quartiers.map((quartier) => (
                  <SelectItem key={quartier.id} value={quartier.id.toString()}>
                    {quartier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField htmlFor="address" label="Adresse" error={errors.address}>
            <Input
              id="address"
              name="address"
              defaultValue={place.address ?? ''}
              aria-invalid={!!errors.address}
            />
          </FormField>

          <FormField htmlFor="price_range" label="Gamme de prix" error={errors.price_range}>
            <Select name="price_range" defaultValue={place.priceRange}>
              <SelectTrigger id="price_range" aria-invalid={!!errors.price_range}>
                <SelectValue placeholder="Sélectionner une gamme de prix" />
              </SelectTrigger>
              <SelectContent>
                {PRICE_RANGES.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField htmlFor="description" label="Description" error={errors.description}>
            <Textarea
              id="description"
              name="description"
              defaultValue={place.description ?? ''}
              aria-invalid={!!errors.description}
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
