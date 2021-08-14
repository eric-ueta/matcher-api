import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Preference extends BaseSchema {
  protected tableName = 'preference'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('minimumAge').notNullable()
      table.integer('maximumAge').notNullable()
      table.string('gender', 1).notNullable()

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
