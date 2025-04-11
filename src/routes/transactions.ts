import type { FastifyInstance } from 'fastify'
import { knex } from '../db'
import z from 'zod'
import { randomUUID } from 'crypto'

export async function TransactionsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const allTransactions = await knex('transactions').select('*')
    return {
      allTransactions,
    }
  })

  app.get('/:id', async (request) => {
    const getTransactionByIdParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = getTransactionByIdParamsSchema.parse(request.params)
    const transaction = await knex('transactions').where('id', id).first()

    return {
      transaction,
    }
  })

  app.get('/summary', async () => {
    const summary = await knex('transactions')
      .sum('amount', { as: 'amount_total' })
      .first()

    return { summary }
  })

  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['debit', 'credit']),
    })

    const { amount, title, type } = createTransactionBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
