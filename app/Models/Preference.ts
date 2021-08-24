import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  hasMany,
  HasMany,
  HasOne,
  hasOne,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Interest from './Interest'
import User from './User'

export default class Preference extends BaseModel {
  public static table = 'preference'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'minimumAge' })
  public minimumAge: number

  @column({ columnName: 'maximumAge' })
  public maximumAge: number

  @column()
  public gender: string

  @manyToMany(() => Interest, {
    localKey: 'id',
    pivotForeignKey: 'preferenceId',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'interestId',
    pivotTable: 'interest_preference',
    pivotTimestamps: true,
  })
  public interests: ManyToMany<typeof Interest>

  @hasOne(() => User)
  public user: HasOne<typeof User>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
