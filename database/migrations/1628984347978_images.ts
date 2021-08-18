import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Images extends BaseSchema {
  protected tableName = 'image'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('path', 255).notNullable()
      table.string('format', 10).notNullable()
      table.integer('size').notNullable()
      table.integer('userId').unsigned().references('id').inTable('user').onDelete('CASCADE')
      table.boolean('isProfile').notNullable()

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
