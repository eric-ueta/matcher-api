import { column } from '@ioc:Adonis/Lucid/Orm'
import CustomModel from './CustomModel'

export default class Match extends CustomModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userOneId: number

  @column()
  public userTwoId: number

  @column()
  public userOneLiked: boolean

  @column()
  public userTwoLiked: boolean
}
