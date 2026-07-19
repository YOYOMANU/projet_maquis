import Tag from '#models/tag'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class TagTransformer extends BaseTransformer<Tag> {
  toObject() {
    return this.pick(this.resource, ['id', 'label', 'type'])
  }
}
