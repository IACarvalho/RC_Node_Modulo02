import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { env } from './env'
import { transactionController } from './routes/transactionRoutes'

const app = fastify()

const port = env.PORT

app.register(cookie)
app.register(transactionController, {
  prefix: '/transactions',
})

app.listen({ port }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
