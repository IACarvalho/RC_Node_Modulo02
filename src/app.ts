import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { transactionController } from './routes/transactionRoutes'

export const app = fastify()

app.register(cookie)
app.register(transactionController, {
  prefix: '/transactions',
})
