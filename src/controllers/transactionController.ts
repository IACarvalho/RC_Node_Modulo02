import { FastifyInstance } from 'fastify'
import { knex } from '../../config/database'

export async function transactionController(app: FastifyInstance) {
  app.get('/', async () => {
    const transaction = await knex('transactions')
      .where('amount', 1000)
      .select('*')

    return transaction
  })
}
