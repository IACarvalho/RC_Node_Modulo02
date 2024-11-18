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

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })

    reply.status(201).send()
  })

  app.get('/', async (request, reply) => {
    const transactions = await knex('transactions').select('*')
    reply.send(transactions)
  })
}
