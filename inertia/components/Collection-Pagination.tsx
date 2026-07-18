// import { PaginatedCollection } from "@/types";
import { Link } from '@inertiajs/react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import type { PaginatedCollection } from '~/types/index'
import { Button } from '~/components/ui/button'

type Props = { collection: PaginatedCollection<unknown>; pageNUmbersShow?: boolean }

export function CollectionPagination({ collection, pageNUmbersShow = true }: Props) {
  return (
    <div className="flex item-center justify between">
      {pageNUmbersShow && (
        <div className="text-muted-forground hidden flex-1 text-sm lg:flex">
          Page {collection.meta.current_page} sur {collection.meta.last_page}
        </div>
      )}

      <nav role="navigation" aria-label="Pagination">
        <ul className="flex items-center gap-1">
          {collection.meta.links.map((link, index) => (
            <li key={index}>
              <Button
                disabled={link.url === null}
                aria-current={link.active ? 'page' : undefined}
                data-active={link.active}
                variant={link.active ? 'outline' : 'ghost'}
                size="icon"
                asChild
              >
                <Link href={link.url ?? '#'}>
                  {label(link.label, index, collection.meta.links.length)}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

function label(s: string, index: number, count: number): ReactNode {
  if (index === 0) {
    return <ChevronLeftIcon />
  }

  if (index === count - 1) {
    return <ChevronRightIcon />
  }

  return s
}
