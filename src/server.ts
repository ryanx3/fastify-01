import fastify from 'fastify'
import { knex } from './db'

const app = fastify()

app.get('/', async () => {
  const createTransaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transaction 1',
      amount: 1000,
    })
    .returning('*')
  return createTransaction
})

app
  .listen({ port: 3333 })
  .then(() => console.log('HTTP server running on port 3333!'))
