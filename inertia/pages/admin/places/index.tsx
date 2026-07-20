import { Form, Link } from '@adonisjs/inertia/react'
import { Data } from '@generated/data'
import { EditIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { urlFor } from '~/client'
import AppPagination from '~/components/app-pagination'
import { TopAction } from '~/components/top-action'
import { AspectRatio } from '~/components/ui/aspect-ratio'
import { Button } from '~/components/ui/button'
import { ImageInput } from '~/components/ui/image-dropzone'
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
    title: 'Places',
    href: urlFor('places.index'),
  },
]

type Props = InertiaProps<{
  places: {
    data: Data.Place[]
    metadata: Meta
  }
}>

export default withAppLayout(breadCrumbs, ({ places }: Props) => {
  const { data, metadata } = places
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
            <TableHead></TableHead>
            <TableHead>Nom</TableHead>
            <TableHead className="text-end">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell colSpan={4}>
              <Button asChild variant="outline" className="w-full">
                <Link href={urlFor('places.create')}>
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
                {item.coverPhoto ? (
                  <img
                    src={`/uploads/${item.coverPhoto}`}
                    alt=""
                    className="rouded-lg aspect-square w-20 object-cover"
                  />
                ) : (
                  <div className="aspect-square size-20 bg-background"></div>
                )}
              </TableCell>
              <TableCell>
                <Link route="places.edit" routeParams={{ id: item.id }} className="hover:underline">
                  {item.name}
                </Link>
              </TableCell>
              <TableCell>
                <div className="item-center flex justify-end gap-2">
                  <Button asChild size="icon" variant="outline">
                    <Link route="places.edit" routeParams={{ id: item.id }}>
                      <EditIcon size={16} />
                    </Link>
                  </Button>
                  <Button asChild size="icon" variant="destructive">
                    <Link
                      route="places.destroy"
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
      <AppPagination meta={metadata} route="places.index" />
    </>
  )
})
