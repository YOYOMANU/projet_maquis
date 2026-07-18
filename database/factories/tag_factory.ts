import factory from '@adonisjs/lucid/factories'
import Tag from '#models/tag'

export const TagFactory = factory
  .define(Tag, async ({ faker }) => {
    return {
      name: faker.lorem.paragraph(),
    }
  })
  .build()
