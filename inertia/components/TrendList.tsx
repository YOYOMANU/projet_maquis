import type { TrendEntry } from '~/types/index'
import { StarRating } from './StarRating'

export function TrendList({ entries }: { entries: TrendEntry[] }) {
  return (
    <>
      {entries.map((entry) => (
        <div className="trend-item" key={entry.rank}>
          <span>
            <span className="trend-rank">{String(entry.rank).padStart(2, '0')}</span>
            {entry.name}
          </span>
          <StarRating rating={entry.score} size="sm" />
        </div>
      ))}
    </>
  )
}
