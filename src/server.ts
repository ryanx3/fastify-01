import fastify from 'fastify'
import { env } from './env'
import { TransactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'
import { SessionIdExists } from './middlewares/check-if-session-id-exists'

const app = fastify()

app.register(cookie)
app.addHook('preHandler', SessionIdExists)
app.register(TransactionsRoutes, {
  prefix: 'transactions',
})

app
  .listen({ port: env.PORT })
  .then(() => console.log('HTTP server running on port 3333!'))
