import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import CustomModel from './CustomModel'
import User from './User'

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

  @belongsTo(() => User, { localKey: 'id', foreignKey: 'userOneId' })
  public userOne: BelongsTo<typeof User>

  @belongsTo(() => User, { localKey: 'id', foreignKey: 'userTwoId' })
  public userTwo: BelongsTo<typeof User>
}
