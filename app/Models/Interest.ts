import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import CustomModel from './CustomModel'
import Preference from './Preference'

export default class Interest extends BaseModel {
  public static table = 'interest'

  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @manyToMany(() => Preference, {
    localKey: 'id',
    pivotForeignKey: 'interestId',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'preferenceId',
    pivotTable: 'interest_preference',
    pivotTimestamps: true,
  })
  public preferences: ManyToMany<typeof Preference>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
