import fastify from 'fastify'
import { env } from './env'
import { TransactionsRoutes } from './routes/transactions'

const app = fastify()

app.register(TransactionsRoutes, {
  prefix: 'transactions',
})

app
  .listen({ port: env.PORT })
  .then(() => console.log('HTTP server running on port 3333!'))
