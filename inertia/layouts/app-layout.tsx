import { Data } from '@generated/data'
import { usePage } from '@inertiajs/react'
import type { ReactNode, FC } from 'react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import AppLayoutTemplate from '~/layouts/app/app-sidebar-layout'
import type { BreadcrumbItem } from '~/types/index'

interface AppLayoutProps {
  children: ReactNode
  breadcrumbs?: BreadcrumbItem[]
}

const AppLayout = ({ breadcrumbs = [], children, ...props }: AppLayoutProps) => {
  const page = usePage<Data.SharedProps>()
  useEffect(() => {
    if (page.props.flash.success) toast.success(page.props.flash.success)
    if (page.props.flash.error) toast.error(page.props.flash.error)
  }, [page.props.flash])

  return (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
      <div className="p-4 lg:p-6">{children}</div>
    </AppLayoutTemplate>
  )
}

export function withAppLayout<T>(breadcrumbs: BreadcrumbItem[], component: FC<T>) {
  //@ts-expect-error layout exist for inertia
  component.layout = (page: ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 lg:p-6">{page}</div>
    </AppLayout>
  )

  return component
}

export default AppLayout
