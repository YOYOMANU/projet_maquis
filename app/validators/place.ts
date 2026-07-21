import vine from '@vinejs/vine'

export const placeValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    address: vine.string().optional(),
    cover_photo: vine.file({ size: '2mb', extnames: ['jpg', 'png', 'jpeg', 'webp'] }).optional(),
    price_range: vine.enum(['$', '$$', '$$$']),
    description: vine.string().optional(),
    quartier_id: vine.number().exists({ table: 'quartiers', column: 'id' }),
  })
)
