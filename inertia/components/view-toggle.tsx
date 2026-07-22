import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group'

type ViewToggleProps = {
  value: 'grid' | 'map'
  onValueChange: (value: 'grid' | 'map') => void
}

export function ViewToggle({ value, onValueChange }: ViewToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => v && onValueChange(v as 'grid' | 'map')}
      className="view-toggle"
    >
      <ToggleGroupItem value="grid" asChild>
        <button className={value === 'grid' ? 'on' : ''}>▦ Grille</button>
      </ToggleGroupItem>
      <ToggleGroupItem value="map" asChild>
        <button className={value === 'map' ? 'on' : ''}>◔ Carte</button>
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
