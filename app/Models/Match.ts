import { column } from '@ioc:Adonis/Lucid/Orm'
import CustomModel from './CustomModel'

export default class Match extends CustomModel {
  public static table = 'match'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'userOneId' })
  public userOneId: number

  @column({ columnName: 'userTwoId' })
  public userTwoId: number

  @column({ columnName: 'userOneLiked' })
  public userOneLiked: boolean

  @column({ columnName: 'userTwoLiked' })
  public userTwoLiked: boolean
}
