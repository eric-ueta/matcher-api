import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Crypt from 'App/Utils/Crypt'
import { DateTime } from 'luxon'
import CustomModel from './CustomModel'
import User from './User'

export default class PasswordRecovery extends CustomModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column({
    prepare: (value: string) => Crypt.encrypt(value),
    consume: (value: string) => Crypt.decrypt(value),
  })
  public token: string

  @column()
  public expireDate: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
