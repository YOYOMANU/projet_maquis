import { Link } from '@adonisjs/inertia/react'
import { routes } from '@generated/registry'
import { usePage } from '@inertiajs/react'
import { urlFor } from '~/client'
import { Button } from './ui/button'

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
          <Link className={url === routes.home.pattern ? 'on' : ''} href={urlFor('home')}>
            Feed
          </Link>
          <Link
            href={urlFor('explorer')}
            className={url.startsWith(routes.explorer.pattern) ? 'on' : ''}
          >
            Explorer
          </Link>
          <a href="#">Mes listes</a>
          <a href="#">Profil</a>
        </nav>
      </div>
      <div className="header-right">
        <div className="icon-btn">＋</div>
        <div className="avatar">Y</div>
        <Button asChild>
          <Link href={urlFor('dashboard')}>Dashboard</Link>
        </Button>
      </div>
    </header>
  )
}
