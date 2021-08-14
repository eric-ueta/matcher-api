import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Interest extends BaseSchema {
  protected tableName = 'interest'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('description', 100).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.datetime('created_at', { useTz: true })
      table.datetime('updated_at', { useTz: true })
      table.datetime('deleted_at', { useTz: true }).defaultTo(null)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
