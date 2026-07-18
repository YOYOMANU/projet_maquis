import { router, usePage } from '@inertiajs/react'
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '~/lib/utils'
import { TableHead } from './ui/table'

type Props = ComponentProps<typeof TableHead> & {
  field: string
}

export function SortableTableHead({ field, children, className, ...props }: Props) {
  const query = usePage<{ query: { sort?: string; dir?: string } }>().props.query
  const isActive = field === query.sort
  const direction = query.dir ?? 'desc'

  const handleSort = () => {
    const url = new URL(window.location.href)

    if (isActive) {
      url.searchParams.set('dir', direction === 'asc' ? 'desc' : 'asc')
    } else {
      url.searchParams.set('dir', 'desc')
      url.searchParams.set('sort', field)
    }

    router.visit(url.toString())
  }

  const getSortIcon = () => {
    if (!isActive) {
      return <ArrowDownIcon size={16} className="opacity-50" />
    }

    if (direction === 'asc') {
      return <ArrowUpIcon size={16} />
    }

    return <ArrowDownIcon size={16} />
  }

  return (
    <TableHead
      {...props}
      className={cn(
        className,
        'cursor-pointer hover:text-foreground',
        isActive && 'text-foreground'
      )}
      onClick={handleSort}
    >
      <div className="flex items-center gap-2">
        {children}
        {getSortIcon()}
      </div>
    </TableHead>
  )
}
