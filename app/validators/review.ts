import vine from '@vinejs/vine'

export const reviewValidator = vine.compile(
  vine.object({
    rating: vine.number().positive(),
    dish_name: vine.string().optional(),
    comment: vine.string(),
    status: vine.enum(['published', 'flagged', 'hidden']),
    user_id: vine.number().exists({ table: 'users', column: 'id' }),
    place_id: vine.number().exists({ table: 'places', column: 'id' }),
    tags: vine.array(vine.number().exists({ table: 'tags', column: 'id' })).distinct(),
  })
)
