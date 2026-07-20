import vine from '@vinejs/vine'

export const quartierCreateValidator = vine.compile(
  vine.object({
    name: vine.string().unique({ table: 'quartiers', column: 'name' }),
  })
)
export const quartierUpdateValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3),
  })
)
