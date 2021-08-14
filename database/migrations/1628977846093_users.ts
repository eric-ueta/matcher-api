import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'user'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 100).notNullable()
      table.string('password', 50).notNullable()
      table.string('email', 100).notNullable().unique()
      table.string('emailToken', 100).nullable()
      table.text('about').notNullable()
      table.integer('phone', 9).notNullable()
      table.datetime('birth').notNullable()
      table.string('gender', 1).notNullable()
      table.string('notificationToken', 150).nullable()
      table.integer('cityId').unsigned().references('id').inTable('city')
      table.integer('preferenceId').unsigned().references('id').inTable('preference')
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
