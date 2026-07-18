import { Link } from '@inertiajs/react'
import { BookOpen, Building, FolderGit2, LayoutGrid, OptionIcon, TagPlusIcon } from 'lucide-react'
import AppLogo from '~/components/app-logo'
import { NavFooter } from '~/components/nav-footer'
import { NavMain } from '~/components/nav-main'
import { NavUser } from '~/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '~/components/ui/sidebar'
import { NavItem } from '../types/index'
import { routes } from '@generated/registry'

const mainNavItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: routes.dashboard.pattern,
    icon: LayoutGrid,
  },
  {
    title: 'Tags',
    href: routes['tags.index'].pattern,
    icon: TagPlusIcon,
  },
]

const footerNavItems: NavItem[] = [
  {
    title: 'Repository',
    href: 'https://github.com/laravel/react-starter-kit',
    icon: FolderGit2,
  },
  {
    title: 'Documentation',
    href: 'https://laravel.com/docs/starter-kits#react',
    icon: BookOpen,
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={''} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
