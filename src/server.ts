import fastify from 'fastify'
import { env } from './env'
import { transactionController } from './controllers/transactionController'

const app = fastify()

const port = env.PORT

app.register(transactionController)

app.listen({ port }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
