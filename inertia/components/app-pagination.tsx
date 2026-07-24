import { Link } from '@adonisjs/inertia/react'
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'
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
  siblingCount?: number
}

const ELLIPSIS = 'ellipsis' as const

/**
 * Génère la liste des pages à afficher, avec des marqueurs 'ellipsis'
 * quand des pages sont masquées. Toujours affiche 1, lastPage,
 * la page courante et `siblingCount` pages autour d'elle.
 */
function getPageRange(currentPage: number, lastPage: number, siblingCount: number) {
  const totalVisible = siblingCount * 2 + 5 // first + last + current + 2*siblings + 2 ellipsis max

  if (lastPage <= totalVisible) {
    return Array.from({ length: lastPage }, (_, i) => i + 1)
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1)
  const rightSibling = Math.min(currentPage + siblingCount, lastPage)

  const showLeftEllipsis = leftSibling > 2
  const showRightEllipsis = rightSibling < lastPage - 1

  const pages: (number | typeof ELLIPSIS)[] = []

  pages.push(1)

  if (showLeftEllipsis) {
    pages.push(ELLIPSIS)
  } else {
    for (let i = 2; i < leftSibling; i++) pages.push(i)
  }

  for (
    let i = leftSibling === 1 ? 2 : leftSibling;
    i <= (rightSibling === lastPage ? lastPage - 1 : rightSibling);
    i++
  ) {
    if (i !== 1 && i !== lastPage) pages.push(i)
  }

  if (showRightEllipsis) {
    pages.push(ELLIPSIS)
  } else {
    for (let i = rightSibling + 1; i < lastPage; i++) pages.push(i)
  }

  pages.push(lastPage)

  return pages
}

export default function AppPagination({
  meta,
  route,
  routeParams = {},
  extraQs = {},
  siblingCount = 1,
}: Props) {
  const isFirstPage = meta.currentPage === 1
  const isLastPage = meta.currentPage === meta.lastPage

  const buildUrl = (page: number) => urlFor(route, routeParams, { qs: { ...extraQs, page } })

  const pages = getPageRange(meta.currentPage, meta.lastPage, siblingCount)

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

          {pages.map((page, index) =>
            page === ELLIPSIS ? (
              <li key={`ellipsis-${index}`}>
                <span className="flex size-9 items-center justify-center">
                  <MoreHorizontalIcon className="text-muted-foreground size-4" />
                </span>
              </li>
            ) : (
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
            )
          )}

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
