import 'dotenv/config'
import { knex as knexSetup, type Knex } from 'knex'

export const knexConfig: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: process.env.DATABASE_URL || './db/app.db',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = knexSetup(knexConfig)
