import fastify from 'fastify'
import { knex } from '../config/database'
import { env } from './env'

const app = fastify()

const port = env.PORT

app.get('/', async () => {
  const transaction = await knex('transactions')
    .where('amount', 500)
    .select('*')

  return transaction
})

app.listen({ port }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
