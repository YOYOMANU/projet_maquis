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
import { MultiSelect } from '~/components/ui/multi-select'
import { useState } from 'react'

const Breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Reviews',
    href: urlFor('reviews.index'),
  },
  {
    title: 'Editer',
    href: '#',
  },
]

const STATUS = ['published', 'flagged', 'hidden'] as const

type Props = InertiaProps<{
  review: Data.Review
  users: Data.User[]
  places: Data.Place[]
  tags: Data.Tag[]
}>

function TagEditPage({ review, users, places, tags }: Props) {
  const [selectedTags, setSelectedTags] = useState<string[]>(
    review?.tags?.map((tag) => tag.id.toString()) ?? []
  )

  return (
    <Form
      route={review.id ? 'reviews.update' : 'reviews.store'}
      className="space-y-4"
      routeParams={{ id: review.id }}
    >
      {({ errors, processing }) => (
        <>
          <FormField htmlFor="dish_name" label="Nom" error={errors.dishName}>
            <Input
              id="dish_name"
              name="dish_name"
              defaultValue={review.dishName ?? ''}
              aria-invalid={!!errors.dishName}
            />
          </FormField>

          <div className="flex gap-5 ">
            <FormField htmlFor="status" label="Status" error={errors.status}>
              <Select name="status" defaultValue={review.status}>
                <SelectTrigger id="status" aria-invalid={!!errors.status}>
                  <SelectValue placeholder="Sélectionner un status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS.map((status, index) => (
                    <SelectItem key={index} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField htmlFor="user_id" label="Utilisateur" error={errors.user_id}>
              <Select name="user_id" defaultValue={review.user?.id.toString()}>
                <SelectTrigger id="user_id" aria-invalid={!!errors.user_id}>
                  <SelectValue placeholder="Sélectionner un utilisateur" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField htmlFor="place_id" label="Place" error={errors.place_id}>
              <Select name="place_id" defaultValue={review.place?.id.toString()}>
                <SelectTrigger id="place_id" aria-invalid={!!errors.place_id}>
                  <SelectValue placeholder="Sélectionner un utilisateur" />
                </SelectTrigger>
                <SelectContent>
                  {places.map((place) => (
                    <SelectItem key={place.id} value={place.id.toString()}>
                      {place.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField htmlFor="tags" label="Tags" error={errors.tags}>
              <MultiSelect
                id="tags"
                name="tags[]"
                ariaInvalid={!!errors.tags}
                placeholder="Sélectionner des tags"
                options={tags.map((tag) => ({ value: tag.id.toString(), label: tag.label }))}
                value={selectedTags}
                onChange={setSelectedTags}
              />
            </FormField>
          </div>

          <FormField htmlFor="comment" label="Commentaire" error={errors.comment}>
            <Textarea
              id="comment"
              name="comment"
              rows={5}
              defaultValue={review.comment}
              aria-invalid={!!errors.comment}
            />
          </FormField>

          <FormField htmlFor="rating" label="Cote" error={errors.rating}>
            <Input
              type="number"
              id="rating"
              name="rating"
              defaultValue={review.rating}
              aria-invalid={!!errors.rating}
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
