import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { beforeFind, beforeFetch } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { softDelete, softDeleteQuery } from '../Services/AdonisSoftDelete'

// Custom model com soft deleted implementado
export default class CustomModel extends BaseModel {
  @beforeFind()
  public static softDeletesFind = softDeleteQuery
  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery

  public async softDelete(column?: string) {
    await softDelete(this, column)
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column({ columnName: 'deleted_at', serializeAs: null })
  public deletedAt: DateTime

  public delete = this.softDelete
}
