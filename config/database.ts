import { knex as setupKnex, Knex } from 'knex'
import { env } from '../src/env'

if (!process.env.DB_URL) {
  throw new Error('DATABASE_URL must be set')
}

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection:
    env.DATABASE_CLIENT === 'sqlite'
      ? {
          filename: env.DB_URL,
        }
      : env.DB_URL,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/migrations',
  },
}

export const knex = setupKnex(config)
