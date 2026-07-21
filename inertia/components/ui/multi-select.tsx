import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { Badge } from '~/components/ui/badge'
import { ChevronsUpDown, X } from 'lucide-react'
import { cn } from '~/lib/utils'

type Option = {
  value: string
  label: string
}

type MultiSelectProps = {
  id?: string
  name?: string
  options: Option[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  ariaInvalid?: boolean
}

export function MultiSelect({
  id,
  name,
  options,
  value,
  onChange,
  placeholder = 'Sélectionner...',
  ariaInvalid,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)

  function toggle(val: string) {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val))
    } else {
      onChange([...value, val])
    }
  }

  function remove(val: string, e: React.MouseEvent) {
    e.stopPropagation()
    onChange(value.filter((v) => v !== val))
  }

  const selectedOptions = options.filter((o) => value.includes(o.value))

  return (
    <>
      {name && value.map((val) => <input key={val} type="hidden" name={name} value={val} />)}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            id={id}
            aria-invalid={ariaInvalid}
            aria-expanded={open}
            className="w-full justify-between h-auto min-h-9 font-normal"
          >
            <div className="flex flex-wrap gap-1">
              {selectedOptions.length > 0 ? (
                selectedOptions.map((opt) => (
                  <Badge key={opt.value} variant="secondary" className="gap-1">
                    {opt.label}
                    <span
                      role="button"
                      tabIndex={-1}
                      onClick={(e) => remove(opt.value, e)}
                      className="ml-1 rounded-full hover:bg-muted-foreground/20"
                    >
                      <X className="h-3 w-3" />
                    </span>
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-2" align="start">
          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
            {options.map((opt) => (
              <label
                key={opt.value}
                className={cn(
                  'flex items-center gap-2 cursor-pointer rounded-md p-2 hover:bg-accent text-sm'
                )}
              >
                <Checkbox
                  checked={value.includes(opt.value)}
                  onCheckedChange={() => toggle(opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  )
}
