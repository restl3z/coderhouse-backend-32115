import knex from 'knex';

const config_MariaDB = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'coderhouse_dba',
    password: 'dba_password',
    database: 'ecommerce',
  },
};

const config_SQLite = {
  client: 'better-sqlite3',
  connection: { filename: './db/ecommerce.sqlite' },
  useNullAsDefault: true,
};

export { config_MariaDB, config_SQLite };
