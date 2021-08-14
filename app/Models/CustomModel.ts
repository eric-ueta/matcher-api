import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { beforeFind, beforeFetch } from '@ioc:Adonis/Lucid/Orm'
import { softDelete, softDeleteQuery, softTest } from '../Services/AdonisSoftDelete'

// Custom model com soft deleted implementado
export default class CustomModel extends BaseModel {
  @beforeFind()
  public static softDeletesFind = softDeleteQuery
  @beforeFetch()
  public static softDeletesFetch = softDeleteQuery

  public async softDelete(column?: string) {
    await softDelete(this, column)
  }

  public delete = this.softDelete
}
