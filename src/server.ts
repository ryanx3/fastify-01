import fastify from 'fastify'
import { knex } from './db'

const app = fastify()

app.get('/', async () => {
  const result = await knex('sqlite_schema').select('*')
  return result
})

app
  .listen({ port: 3333 })
  .then(() => console.log('HTTP server running on port 3333!'))
