import { ViewToggle } from '~/components/view-toggle'

type ResultsHeaderProps = {
  count: number
  title: string
  view: 'grid' | 'map'
  onViewChange: (view: 'grid' | 'map') => void
}

export function ResultsHeader({ count, title, view, onViewChange }: ResultsHeaderProps) {
  return (
    <div className="results-head">
      <div>
        <div className="eyebrow">{count} lieux trouvés</div>
        <div className="feed-title" style={{ fontSize: '27px', marginTop: '9px' }}>
          {title}
        </div>
      </div>
      <ViewToggle value={view} onValueChange={onViewChange} />
    </div>
  )
}
