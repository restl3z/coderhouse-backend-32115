import knex from 'knex';

export default class Container {
  constructor(db_config, db_table) {
    this.db_config = db_config;
    this.db_table = db_table;
  }

  get_all = async () => {
    const db_client = knex(this.db_config);
    try {
      const db_content = await db_client.select().table(this.db_table);
      return db_content;
    } catch (error) {
      throw new Error(
        `Error reading from table ${this.db_table}. Details: ${error.message}`
      );
    } finally {
      db_client.destroy();
    }
  };

  save = async (new_object) => {
    const db_client = knex(this.db_config);
    try {
      await db_client(this.db_table).insert(new_object);
    } catch (error) {
      `Error writing to table ${this.db_table}. Details: ${error.message}`;
    } finally {
      db_client.destroy();
    }
  };
}
