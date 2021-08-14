import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserImages extends BaseSchema {
  protected tableName = 'user_image'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('userId').references('id').inTable('user')
      table.integer('imageId').references('id').inTable('image')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.datetime('created_at', { useTz: true })
      table.datetime('updated_at', { useTz: true })
      table.datetime('deleted_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
