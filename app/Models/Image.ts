import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import CustomModel from './CustomModel'
import User from './User'

export default class Image extends CustomModel {
  public static table = 'image'

  @column({ isPrimary: true })
  public id: number

  @column()
  public format: string

  @column()
  public image: any

  @column()
  public size: number

  @column()
  public url: string

  @column({ columnName: 'userId' })
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
