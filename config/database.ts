import 'dotenv/config'
import { knex as setupKnex, Knex } from 'knex'

if (!process.env.DB_URL) {
  throw new Error('DATABASE_URL must be set')
}

export const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: process.env.DB_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/migrations',
  },
}

export const knex = setupKnex(config)
