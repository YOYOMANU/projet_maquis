import { Data } from '@generated/data'
import { ResultCard } from '~/components/result-card'

type ResultsGridProps = {
  items: Data.Place[]
}

export function ResultsGrid({ items }: ResultsGridProps) {
  return (
    <div className="results-grid">
      {items.map((item) => (
        <ResultCard key={item.id} item={item} />
      ))}
    </div>
  )
}
