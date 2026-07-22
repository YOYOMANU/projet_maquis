import { Checkbox } from '~/components/ui/checkbox'
import { cn } from '~/lib/utils'

type FilterCheckboxProps = {
  label: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function FilterCheckbox({ label, checked, onCheckedChange }: FilterCheckboxProps) {
  return (
    <label className="chk-row cursor-pointer">
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={cn('chk-box border-none bg-transparent p-0 shadow-none', checked && 'on')}
      />
      {label}
    </label>
  )
}
