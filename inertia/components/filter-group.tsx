import { FilterCheckbox } from '~/components/filter-checkbox'

type FilterOption = {
  label: string
  value: string
}

type FilterGroupProps = {
  title: string
  options: FilterOption[]
  selected: string[]
  onToggle: (value: string) => void
}

export function FilterGroup({ title, options, selected, onToggle }: FilterGroupProps) {
  return (
    <div className="filter-group">
      <h4>{title}</h4>
      {options.map((opt) => (
        <FilterCheckbox
          key={opt.value}
          label={opt.label}
          checked={selected.includes(opt.value)}
          onCheckedChange={() => onToggle(opt.value)}
        />
      ))}
    </div>
  )
}
