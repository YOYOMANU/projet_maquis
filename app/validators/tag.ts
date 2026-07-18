import vine from '@vinejs/vine'

export const TagCreateValidator = vine.compile(
  vine.object({
    name: vine
      .string()
      .unique(async (db, value) => {
        const tag = await db.from('tags').where('name', value).first()
        return !tag
      })
      .minLength(3),
  })
)
export const TagUpdateValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
  })
)
