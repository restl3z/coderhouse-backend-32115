import knex from 'knex';
import { config_MariaDB, config_SQLite } from './db_config.js';

export default async () => {
  const client_MariaDB = knex(config_MariaDB);
  try {
    const exists = await client_MariaDB.schema.hasTable('products');
    if (!exists) {
      client_MariaDB.schema
        .createTable('products', (x) => {
          x.increments('id'),
            x.string('title'),
            x.integer('price'),
            x.string('thumbnail');
        })
        .then(() => {
          console.log('PRODUCTS table created successfully');
        });
    } else {
      console.log('PRODUCTS table already exists');
    }
  } catch (error) {
    console.log(`Error creating PRODUCTS table. Details: ${error.message}`);
  } finally {
    client_MariaDB.destroy();
  }

  const client_SQLite = knex(config_SQLite);
  try {
    const exists = await client_SQLite.schema.hasTable('messages');
    if (!exists) {
      client_SQLite.schema
        .createTable('messages', (x) => {
          x.string('date'), x.string('email'), x.string('message');
        })
        .then(() => {
          console.log('MESSAGES table created successfully');
        });
    } else {
      console.log('MESSAGES table already exists');
    }
  } catch (error) {
    console.log(`Error creating MESSAGES table. Details: ${error.message}`);
  } finally {
    client_SQLite.destroy();
  }
};
