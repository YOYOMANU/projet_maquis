import { Link } from '@adonisjs/inertia/react'
import { Data } from '@generated/data'
import { routes } from '@generated/registry'
import { EditIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { Button } from '~/components/ui/button'
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
              <Link route="tags.create">
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
              <Link route="tags.edit" routeParams={{ id: item.id }} className="hover:underline">
                {item.label}
              </Link>
            </TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>
              <div className="item-center flex justify-end gap-2">
                <Button asChild size="icon" variant="outline">
                  <Link route="tags.edit" routeParams={{ id: item.id }}>
                    <EditIcon size={16} />
                  </Link>
                </Button>
                <Button asChild size="icon" variant="destructive">
                  <Link
                    route="tags.destroy"
                    routeParams={{ id: item.id }}
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
  )
})
