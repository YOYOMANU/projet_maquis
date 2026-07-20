import { BaseTransformer } from '@adonisjs/core/transformers'
import quartier from '#models/quartier'

export default class QuartierTransformer extends BaseTransformer<quartier> {
  toObject() {
    return this.pick(this.resource, ['id', 'name'])
  }
}
