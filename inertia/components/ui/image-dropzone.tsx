import { ChangeEventHandler, ComponentProps, DragEventHandler, useRef, useState } from 'react'
import { cn } from '~/lib/utils'
import { UploadIcon, XIcon } from 'lucide-react'

type Props = ComponentProps<'input'> & {
  progress?: number
  onFilesChange?: (files: File[]) => void
  existingCount?: number
  maxImages?: number
}

export function ImageInput({
  className,
  progress,
  defaultValue,
  onFilesChange,
  existingCount,
  maxImages,
  ...props
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [hover, setHover] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [preview, setPreview] = useState(defaultValue?.toString() ?? null)
  const [count, setCount] = useState(0)

  const applyFiles = (files: File[]) => {
    if (props.multiple && files.length > 0) {
      setPreview(URL.createObjectURL(files[files.length - 1]))
      setCount(files.length)
      onFilesChange?.(files)
    } else if (files[0]) {
      setPreview(URL.createObjectURL(files[0]))
      setCount(0)
      onFilesChange?.([files[0]])
    }
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setHover(false)
    const files = Array.from(event.target.files ?? [])
    applyFiles(files)
    // Délègue aussi le onChange parent (pour handleImagesChange dans la page)
    props.onChange?.(event)
  }

  const handleDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    setHover(true)
    setDragging(true)
  }

  const handleDragLeave: DragEventHandler<HTMLDivElement> = () => {
    setHover(false)
    setDragging(false)
  }

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    setHover(false)
    setDragging(false)
    if (props.disabled || !inputRef.current) return

    const droppedFiles = Array.from(e.dataTransfer.files ?? []).filter((f) =>
      f.type.startsWith('image/')
    )
    if (droppedFiles.length === 0) return

    // Assigne réellement les fichiers à l'input pour que le form (Inertia) les soumette
    const dataTransfer = new DataTransfer()
    const filesToAssign = props.multiple ? droppedFiles : [droppedFiles[0]]
    filesToAssign.forEach((f) => dataTransfer.items.add(f))
    inputRef.current.files = dataTransfer.files

    applyFiles(filesToAssign)

    // Déclenche un vrai event change pour que le onChange parent soit notifié
    inputRef.current.dispatchEvent(new Event('change', { bubbles: true }))
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!inputRef.current) return
    inputRef.current.value = ''
    setPreview(null)
    setCount(0)
    onFilesChange?.([])
    inputRef.current.dispatchEvent(new Event('change', { bubbles: true }))
  }

  const remaining = maxImages != null && existingCount != null ? maxImages - existingCount : null

  return (
    <div
      className={cn(
        className,
        'relative group mb-2 grid place-items-center rounded-md overflow-hidden transition-all border',
        dragging && 'border-dashed',
        props['aria-invalid'] && 'ring-destructive ring-2 bg-destructive/10',
        hover && !props.disabled && 'bg-primary/10 text-primary ring-primary ring-2',
        props.disabled && 'opacity-50 cursor-not-allowed'
      )}
      onMouseOver={() => !props.disabled && setHover(true)}
      onMouseLeave={() => setHover(false)}
      onDragOver={!props.disabled ? handleDragOver : undefined}
      onDragLeave={handleDragLeave}
      onDrop={!props.disabled ? handleDrop : undefined}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        {...props}
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
      />
      <UploadIcon size={16} />

      {preview && (
        <img
          src={preview}
          className={cn(
            'absolute inset-0 object-cover w-full h-full transition-all',
            (hover || props['aria-invalid']) && 'opacity-20'
          )}
          alt=""
        />
      )}

      {/* Bouton retirer */}
      {preview && !props.disabled && (
        <button
          type="button"
          onClick={handleRemove}
          className="absolute top-1 right-1 z-20 rounded-full bg-background/90 p-1 shadow-sm ring-1 ring-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
          aria-label="Retirer l'image"
        >
          <XIcon size={14} />
        </button>
      )}

      {/* Badge fichiers sélectionnés */}
      {count > 1 && (
        <span className="absolute top-1 left-1 z-20 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-black shadow">
          {count} photos
        </span>
      )}

      {/* Badge slots restants */}
      {remaining !== null && remaining > 0 && (
        <span className="absolute bottom-1 left-1 z-20 rounded-full bg-black/50 px-2 py-0.5 text-xs text-white">
          +{remaining} max
        </span>
      )}

      {progress != null && progress > 0 && (
        <div
          className="h-2 opacity-80 w-full absolute bottom-0 left-0 pointer-events-none origin-left bg-primary transition-transform"
          style={{ transform: `scaleX(${progress.toFixed(2)})` }}
        />
      )}
    </div>
  )
}
