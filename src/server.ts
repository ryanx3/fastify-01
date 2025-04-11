import fastify from 'fastify'
import { env } from './env'
import { TransactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)
app.register(TransactionsRoutes, {
  prefix: 'transactions',
})

app
  .listen({ port: env.PORT })
  .then(() => console.log('HTTP server running on port 3333!'))
