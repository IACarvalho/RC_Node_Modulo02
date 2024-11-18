import { FastifyInstance } from 'fastify'
import { knex } from '../../config/database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

export async function transactionController(app: FastifyInstance) {
  app.post('/', async (request, reply) => {
    const createTransaction = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransaction.parse(request.body)

    let sessionId = request.cookies.sessionId
    if (!sessionId) {
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId, {
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

    reply.status(201).send()
  })

  app.get('/', async (_, reply) => {
    const transactions = await knex('transactions').select('*')
    reply.status(200).send({ transactions })
  })

  app.get('/:id', async (request, reply) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionParamsSchema.parse(request.params)

    const transaction = await knex('transactions').where('id', id).first() // usar o first evita que retorne um array

    if (!transaction) {
      reply.status(404).send()
      return
    }

    return reply.status(200).send({ transaction })
  })

  app.get('/summary', async (_, reply) => {
    const summary = await knex('transactions')
      .sum('amount', { as: 'total_ammount' })
      .first()

    return reply.status(200).send({ summary })
  })
}