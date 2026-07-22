import { Form, Link } from '@adonisjs/inertia/react'
import { Data } from '@generated/data'
import { EditIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { urlFor } from '~/client'
import AppPagination from '~/components/app-pagination'
import { TopAction } from '~/components/top-action'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { withAppLayout } from '~/layouts/app-layout'
import { InertiaProps } from '~/types'
import { Meta } from '~/types/index'
import { BreadcrumbItem } from '~/types/navigation'

const breadCrumbs: BreadcrumbItem[] = [
  {
    title: 'Reviews',
    href: urlFor('reviews.index'),
  },
]

type Props = InertiaProps<{
  reviews: {
    data: Data.Review[]
    metadata: Meta
  }
}>

export default withAppLayout(breadCrumbs, ({ reviews }: Props) => {
  const { data, metadata } = reviews

  return (
    <>
      <TopAction>
        <Form route="home" className="flex items-center gap-2">
          <Input placeholder="Rechercher..." name="q" defaultValue={''} autoFocus />
          <Button>Rechercher</Button>
        </Form>
      </TopAction>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Commentaire</TableHead>
            <TableHead>Utilisateur</TableHead>
            <TableHead className="text-end">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell colSpan={5}>
              <Button asChild variant="outline" className="w-full">
                <Link href={urlFor('reviews.create')}>
                  <PlusIcon />
                  Ajouter une place
                </Link>
              </Button>
            </TableCell>
          </TableRow>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                <Link
                  route="reviews.edit"
                  routeParams={{ id: item.id }}
                  className="hover:underline"
                >
                  {item.dishName}
                </Link>
              </TableCell>
              <TableCell>{item.comment}</TableCell>
              <TableCell>{item.user?.fullName}</TableCell>
              <TableCell>
                <div className="item-center flex justify-end gap-2">
                  <Button asChild size="icon" variant="outline">
                    <Link route="reviews.edit" routeParams={{ id: item.id }}>
                      <EditIcon size={16} />
                    </Link>
                  </Button>
                  <Button asChild size="icon" variant="destructive">
                    <Link
                      route="reviews.destroy"
                      routeParams={{ id: item.id }}
                      onBefore={() => confirm('Voulez vous vraiment supprimer ce quartier ?')}
                    >
                      <TrashIcon size={16} />
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AppPagination meta={metadata} route="reviews.index" />
    </>
  )
})
