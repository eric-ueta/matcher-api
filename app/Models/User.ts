import { DateTime } from 'luxon'
import {
  beforeSave,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  HasManyThrough,
  hasManyThrough,
  HasOne,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm'
import CustomModel from './CustomModel'
import Image from './Image'
import City from './City'
import Preference from './Preference'
import Match from './Match'
import PasswordRecovery from './PasswordRecovery'
import Interest from './Interest'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends CustomModel {
  public static table = 'user'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public email: string

  @column({
    columnName: 'emailToken',
    serializeAs: null,
  })
  public emailToken: string

  @column()
  public phone: number

  @column()
  public birth: DateTime

  @column()
  public gender: string

  @column({ columnName: 'notificationToken' })
  public notificationToken: string

  @column({ columnName: 'cityId' })
  public cityId: number

  @column({ columnName: 'preferenceId' })
  public preferenceId: number

  @hasMany(() => Image)
  public images: HasMany<typeof Image>

  @belongsTo(() => City)
  public city: BelongsTo<typeof City>

  @hasOne(() => Preference)
  public preference: HasOne<typeof Preference>

  @hasManyThrough([() => Interest, () => Preference])
  public interests: HasManyThrough<typeof Interest>

  @hasMany(() => Match)
  public matches: HasMany<typeof Match>

  @hasMany(() => PasswordRecovery)
  public passwordRecoveries: HasMany<typeof PasswordRecovery>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
