import { useState } from 'react'
import { FilterSidebar } from '~/components/filter-sidebar'
import { ResultsHeader } from '~/components/results-header'
import { ResultsGrid } from '~/components/results-grid'
import { Data } from '@generated/data'
import { Meta } from '~/types/index'
import AppPagination from './app-pagination'

const FILTER_SECTIONS = [
  {
    title: 'Quartier',
    options: [
      { label: 'Cocody', value: 'cocody' },
      { label: 'Yopougon', value: 'yopougon' },
      { label: 'Marcory', value: 'marcory' },
      { label: 'Plateau', value: 'plateau' },
      { label: 'Treichville', value: 'treichville' },
    ],
  },
  {
    title: 'Type de cuisine',
    options: [
      { label: 'Braisé', value: 'braise' },
      { label: 'Street-food', value: 'street-food' },
      { label: 'Gastronomique', value: 'gastronomique' },
      { label: 'Fruits de mer', value: 'fruits-de-mer' },
    ],
  },
  {
    title: 'Gamme de prix',
    options: [
      { label: '$ — Économique', value: 'eco' },
      { label: '$$ — Modéré', value: 'modere' },
      { label: '$$$ — Premium', value: 'premium' },
    ],
  },
  {
    title: 'Ambiance',
    options: [
      { label: 'Romantique', value: 'romantique' },
      { label: 'Entre potes', value: 'potes' },
      { label: 'Rapide', value: 'rapide' },
      { label: 'Calme', value: 'calme' },
    ],
  },
]

type Props = {
  results: Data.Place[]
  count: number
  title: string
  metadata: Meta
}

export function SearchLayout({ results, count, title, metadata }: Props) {
  const [selected, setSelected] = useState<Record<string, string[]>>({})
  const [view, setView] = useState<'grid' | 'map'>('grid')

  function handleToggle(sectionTitle: string, value: string) {
    setSelected((prev) => {
      const current = prev[sectionTitle] ?? []
      return {
        ...prev,
        [sectionTitle]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      }
    })
  }

  return (
    <div className="search-layout">
      <FilterSidebar sections={FILTER_SECTIONS} selected={selected} onToggle={handleToggle} />
      <div>
        <ResultsHeader count={count} title={title} view={view} onViewChange={setView} />
        {view === 'grid' && <ResultsGrid items={results} />}
        {/* {view === 'map' && <MapView items={results} />} à implémenter si besoin */}
        <AppPagination meta={metadata} route="explorer" />
      </div>
    </div>
  )
}
