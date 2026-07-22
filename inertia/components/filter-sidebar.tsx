import { FilterGroup } from '~/components/filter-group'

type FilterSection = {
  title: string
  options: { label: string; value: string }[]
}

type FilterSidebarProps = {
  sections: FilterSection[]
  selected: Record<string, string[]>
  onToggle: (sectionTitle: string, value: string) => void
}

export function FilterSidebar({ sections, selected, onToggle }: FilterSidebarProps) {
  return (
    <div className="filter-sidebar">
      {sections.map((section) => (
        <FilterGroup
          key={section.title}
          title={section.title}
          options={section.options}
          selected={selected[section.title] ?? []}
          onToggle={(value) => onToggle(section.title, value)}
        />
      ))}
    </div>
  )
}
