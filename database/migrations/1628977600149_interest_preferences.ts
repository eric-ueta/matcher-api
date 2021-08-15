import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class InterestPreferences extends BaseSchema {
  protected tableName = 'interest_preference'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('preferenceId').unsigned().references('id').inTable('preference')
      table.integer('interestId').unsigned().references('id').inTable('interest')
      table.unique(['preferenceId', 'interestId'])

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
