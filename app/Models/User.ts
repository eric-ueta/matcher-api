import { DateTime } from 'luxon'
import {
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
import Gender from 'Contracts/enums/gender'
import Crypt from 'App/Utils/Crypt'
import CustomModel from './CustomModel'
import Image from './Image'
import City from './City'
import Preference from './Preference'
import Match from './Match'
import PasswordRecovery from './PasswordRecovery'
import Interest from './Interest'

export default class User extends CustomModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column({
    prepare: (value: string) => Crypt.encrypt(value),
    consume: (value: string) => Crypt.decrypt(value),
  })
  public password: string

  @column()
  public email: string

  @column({
    prepare: (value: string) => Crypt.encrypt(value),
    consume: (value: string) => Crypt.decrypt(value),
  })
  public emailToken: string

  @column()
  public phone: number

  @column()
  public birth: DateTime

  @column()
  public gender: Gender

  @column()
  public notificationToken: string

  @column()
  public cityId: number

  @column()
  public preferenceId: number

  @hasMany(() => Image)
  public images: HasMany<typeof Image>

  @belongsTo(() => City)
  public cities: BelongsTo<typeof City>

  @hasOne(() => Preference)
  public preference: HasOne<typeof Preference>

  @hasManyThrough([() => Interest, () => Preference])
  public interests: HasManyThrough<typeof Interest>

  @hasMany(() => Match)
  public matches: HasMany<typeof Match>

  @hasMany(() => PasswordRecovery)
  public passwordRecoveries: HasMany<typeof PasswordRecovery>
}
