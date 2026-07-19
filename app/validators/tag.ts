import vine from '@vinejs/vine'

export const TagCreateValidator = vine.compile(
  vine.object({
    label: vine
      .string()
      .minLength(3)
      .unique(async (db, value, field) => {
        const tag = await db
          .from('tags')
          .where('label', value)
          .where('type', field.data.type)
          .first()
        return !tag
      }),
    type: vine.enum(['place_type', 'ambiance'] as const),
  })
)
export const TagUpdateValidator = vine.compile(
  vine.object({
    label: vine.string().minLength(3),
    type: vine.enum(['place_type', 'ambiance'] as const),
  })
)
