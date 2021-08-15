import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Crypt from 'App/Utils/Crypt'
import { DateTime } from 'luxon'
import CustomModel from './CustomModel'
import User from './User'

export default class PasswordRecovery extends CustomModel {
  public static table = 'passwordRecovery'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'userId' })
  public userId: number

  @column({
    prepare: (value: string) => Crypt.encrypt(value),
    consume: (value: string) => Crypt.decrypt(value),
  })
  public token: string

  @column({ columnName: 'expireDate' })
  public expireDate: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
