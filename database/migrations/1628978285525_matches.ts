import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Match extends BaseSchema {
  protected tableName = 'match'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('userOneId').references('id').inTable('user')
      table.integer('userTwoId').references('id').inTable('user')
      table.boolean('userOneLiked').nullable().defaultTo(null)
      table.boolean('userTwoLiked').nullable().defaultTo(null)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.datetime('deleted_at', { useTz: true }).defaultTo(null)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
