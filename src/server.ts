import fastify from 'fastify'
import { knex } from './db'
import { env } from './env'

const app = fastify()

app.get('/', async () => {
  const getTransaction = await knex('transactions')
    .where('amount', 1000)
    .select('*')
  return getTransaction
})

app
  .listen({ port: env.PORT })
  .then(() => console.log('HTTP server running on port 3333!'))
