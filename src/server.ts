import fastify from 'fastify'
import { knex } from './db'

const app = fastify()

app.get('/', async () => {
  const getTransaction = await knex('transactions')
    .where('amount', 1000)
    .select('*')
  return getTransaction
})

app
  .listen({ port: 3333 })
  .then(() => console.log('HTTP server running on port 3333!'))
