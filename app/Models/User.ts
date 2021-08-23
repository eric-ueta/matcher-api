import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeSave,
  BelongsTo,
  belongsTo,
  column,
  computed,
  HasMany,
  hasMany,
  HasManyThrough,
  hasManyThrough,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Image from './Image'
import City from './City'
import Preference from './Preference'
import PasswordRecovery from './PasswordRecovery'
import Interest from './Interest'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
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
  public about: string

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

  @belongsTo(() => Preference)
  public preference: BelongsTo<typeof Preference>

  @hasManyThrough([() => Interest, () => Preference], {
    localKey: 'preferenceId',
    foreignKey: 'id',
    throughLocalKey: 'id',
    throughForeignKey: 'preferenceId',
  })
  public interests: HasManyThrough<typeof Interest>

  @manyToMany(() => User, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'userOneId',
    pivotRelatedForeignKey: 'userTwoId',
    pivotTable: 'match',
    pivotTimestamps: true,
    pivotColumns: ['userOneLiked', 'userTwoLiked', 'created_at', 'updated_at', 'deleted_at'],
  })
  public matchesStarted: ManyToMany<typeof User>

  @manyToMany(() => User, {
    localKey: 'id',
    relatedKey: 'id',
    pivotForeignKey: 'userTwoId',
    pivotRelatedForeignKey: 'userOneId',
    pivotTable: 'match',
    pivotTimestamps: true,
    pivotColumns: ['userOneLiked', 'userTwoLiked', 'created_at', 'updated_at', 'deleted_at'],
  })
  public matchesRelated: ManyToMany<typeof User>

  @hasMany(() => PasswordRecovery)
  public passwordRecoveries: HasMany<typeof PasswordRecovery>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @computed()
  public get age() {
    return this.getAge()
  }

  public getAge() {
    const today = new Date()
    const birthDate = new Date(this.birth.toString())
    let age = today.getFullYear() - birthDate.getFullYear()
    let m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }
}
