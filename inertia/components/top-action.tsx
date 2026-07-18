import type { PropsWithChildren } from 'react'

export function TopAction(props: PropsWithChildren) {
  return (
    <div
      className="absolute top-4 right-4 flex items-center justify-end gap-2 lg:right-6"
      {...props}
    />
  )
}
