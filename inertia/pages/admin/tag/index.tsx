import { Form } from '@adonisjs/inertia/react'
import { Data } from '@generated/data'
import { routes } from '@generated/registry'
import { Link } from '@inertiajs/react'
import { EditIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { urlFor } from '~/client'
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
import { BreadcrumbItem } from '~/types/navigation'

const breadCrumbs: BreadcrumbItem[] = [
  {
    title: 'Tags',
    href: routes['tags.index'].pattern,
  },
]

type Props = InertiaProps<{ tags: Data.Tag[] }>

export default withAppLayout(breadCrumbs, ({ tags }: Props) => {
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
            <TableHead>Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell colSpan={4}>
              <Button asChild variant="outline" className="w-full">
                <Link href={urlFor('tags.create')}>
                  <PlusIcon />
                  Ajouter un tag
                </Link>
              </Button>
            </TableCell>
          </TableRow>
          {tags.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                <Link href={urlFor('tags.edit', { id: item.id })} className="hover:underline">
                  {item.label}
                </Link>
              </TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>
                <div className="item-center flex justify-end gap-2">
                  <Button asChild size="icon" variant="outline">
                    <Link href={urlFor('tags.edit', { id: item.id })}>
                      <EditIcon size={16} />
                    </Link>
                  </Button>
                  <Button asChild size="icon" variant="destructive">
                    <Link
                      href={urlFor('tags.destroy', { id: item.id })}
                      onBefore={() => confirm('Voulez vous vraiment supprimer ce tag ?')}
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
    </>
  )
})
