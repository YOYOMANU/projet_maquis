import { Link } from '@adonisjs/inertia/react'
import { usePage } from '@inertiajs/react'
import { routes } from '@generated/registry'
import { LayoutDashboardIcon, LogOutIcon, UserIcon } from 'lucide-react'
import { urlFor } from '~/client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export default function Header() {
  const url = usePage().url

  return (
    <header className="app-header">
      <div className="logo">
        <span className="mark"></span>MAQU<em>i</em>S
      </div>

      <div className="header-center">
        <div className="search-box">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          Rechercher un maquis, un plat, un quartier…
        </div>

        <nav className="nav-links">
          <Link href={urlFor('home')} className={url === routes.home.pattern ? 'on' : ''}>
            Feed
          </Link>
          <Link
            href={urlFor('explorer')}
            className={url.startsWith(routes.explorer.pattern) ? 'on' : ''}
          >
            Explorer
          </Link>
          <a href="#">Mes listes</a>
        </nav>
      </div>

      <div className="header-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="avatar cursor-pointer">Y</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-200 w-48">
            <DropdownMenuItem asChild>
              <Link href={urlFor('dashboard')} className="flex items-center gap-2">
                <LayoutDashboardIcon size={16} />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={urlFor('profile.edit')} className="flex items-center gap-2">
                <UserIcon size={16} />
                Profil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild variant="destructive">
              <Link href={urlFor('logout')}>
                <LogOutIcon size={16} />
                Déconnexion
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
