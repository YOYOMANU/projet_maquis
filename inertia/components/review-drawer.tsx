import { useState } from 'react'
import { Form } from '@adonisjs/inertia/react'
import { StarIcon } from 'lucide-react'
import { Data } from '@generated/data'
import { urlFor } from '~/client'
import { Button } from '~/components/ui/button'
import { Textarea } from '~/components/ui/textarea'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet'

type Props = {
  place: {
    id: number
    name: string
    quartier?: { name?: string }
  }
  ambianceTags: Data.Tag[]
}

export default function ReviewDrawer({ place, ambianceTags }: Props) {
  const [rating, setRating] = useState(5)
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([])
  const [open, setOpen] = useState(false)

  const toggleTag = (tagId: number) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    )
  }

  const displayedRating = hoveredStar ?? rating

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="btn-gold">Donner mon avis</Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-line bg-surface p-0 sm:max-w-md"
      >
        {/* Header fixe */}
        <SheetHeader className="shrink-0 gap-1.5 border-b border-line px-6 py-5 shadow-[0_8px_20px_-12px_rgba(var(--overlay-rgb),0.25)]">
          <div className="eyebrow">Nouvel avis</div>
          <SheetTitle className="font-serif text-2xl font-medium italic">{place.name}</SheetTitle>
          <SheetDescription className="text-text-dim">
            {place.quartier?.name ? `${place.quartier.name} — ` : ''}visité aujourd'hui
          </SheetDescription>
        </SheetHeader>

        <Form
          method="post"
          action={urlFor('user.reviews.store', { placeId: place.id })}
          onSuccess={() => setOpen(false)}
          className="flex min-h-0 flex-1 flex-col"
        >
          {/* Zone scrollable */}
          <div className="flex-1 space-y-7 overflow-y-auto px-6 py-6">
            <input type="hidden" name="rating" value={rating} />
            {selectedTagIds.map((id) => (
              <input key={id} type="hidden" name="tagIds[]" value={id} />
            ))}

            {/* Étoiles */}
            <div>
              <div className="section-label">Votre note</div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(null)}
                    className="cursor-pointer text-copper transition-transform hover:scale-110"
                  >
                    <StarIcon
                      size={32}
                      fill={star <= displayedRating ? 'currentColor' : 'none'}
                      strokeWidth={1.5}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Tags d'ambiance */}
            {ambianceTags.length > 0 && (
              <div>
                <div className="section-label">Tags</div>
                <div className="tag-check-grid">
                  {ambianceTags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      className={`tag-check ${selectedTagIds.includes(tag.id) ? 'on' : ''}`}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Commentaire */}
            <div>
              <div className="section-label">Votre avis</div>
              <Textarea
                name="comment"
                placeholder="Le poisson braisé était…"
                className="h-32 resize-none border-line bg-bg-alt text-cream"
                required
              />
            </div>
          </div>

          {/* Footer fixe */}
          <SheetFooter className="shrink-0 flex-row gap-2.5 border-t border-line bg-surface px-6 py-4 shadow-[0_-8px_20px_-12px_rgba(var(--overlay-rgb),0.25)]">
            <SheetClose asChild>
              <Button type="button" variant="ghost" className="flex-1">
                Annuler
              </Button>
            </SheetClose>
            <Button type="submit" className="btn-gold flex-2">
              Publier l'avis
            </Button>
          </SheetFooter>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
