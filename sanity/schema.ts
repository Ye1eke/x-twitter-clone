import { type SchemaTypeDefinition } from 'sanity'

import tweet from './schemas/tweet'
import comment from './schemas/comment'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [tweet, comment],
}
