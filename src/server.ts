import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.get('/', async () => {
  const tables = await knex('sqlite_schema').select('*')

  return tables
})

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
