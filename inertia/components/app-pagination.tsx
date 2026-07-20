import { Link } from '@adonisjs/inertia/react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { urlFor } from '~/client'
import { Button } from '~/components/ui/button'
import type { Meta } from '~/types/index'

// Extrait automatiquement le type exact du 1er paramètre de urlFor
type RouteIdentifier = Parameters<typeof urlFor>[0]

type Props = {
  meta: Meta
  route: RouteIdentifier
  routeParams?: Record<string, any>
  extraQs?: Record<string, any>
}

export default function AppPagination({ meta, route, routeParams = {}, extraQs = {} }: Props) {
  const isFirstPage = meta.currentPage === 1
  const isLastPage = meta.currentPage === meta.lastPage

  const buildUrl = (page: number) => urlFor(route, routeParams, { qs: { ...extraQs, page } })

  const pages = Array.from({ length: meta.lastPage }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-between">
      <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
        Page {meta.currentPage} sur {meta.lastPage}
      </div>

      <nav role="navigation" className="mt-2" aria-label="Pagination">
        <ul className="flex items-center gap-1">
          <li>
            <Button disabled={isFirstPage} variant="ghost" size="icon" asChild={!isFirstPage}>
              {isFirstPage ? (
                <ChevronLeftIcon />
              ) : (
                <Link href={buildUrl(meta.currentPage - 1)}>
                  <ChevronLeftIcon />
                </Link>
              )}
            </Button>
          </li>

          {pages.map((page) => (
            <li key={page}>
              <Button
                aria-current={page === meta.currentPage ? 'page' : undefined}
                data-active={page === meta.currentPage}
                variant={page === meta.currentPage ? 'outline' : 'ghost'}
                size="icon"
                asChild
              >
                <Link href={buildUrl(page)}>{page}</Link>
              </Button>
            </li>
          ))}

          <li>
            <Button disabled={isLastPage} variant="ghost" size="icon" asChild={!isLastPage}>
              {isLastPage ? (
                <ChevronRightIcon />
              ) : (
                <Link href={buildUrl(meta.currentPage + 1)}>
                  <ChevronRightIcon />
                </Link>
              )}
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
