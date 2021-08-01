export default {
  type: "object",
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    price: {type: 'integer'},
    logo: {type: 'string'},
    count: {type: 'string'},
  },
  required: ['title', 'count', 'price']
} as const;
