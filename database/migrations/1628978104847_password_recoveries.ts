import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PasswordRecovery extends BaseSchema {
  protected tableName = 'passwordRecovery'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('userId').unsigned().references('id').inTable('user')
      table.string('token', 50).notNullable()
      table.datetime('expireDate').notNullable()

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
