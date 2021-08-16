import {
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
import CustomModel from './CustomModel'
import Interest from './Interest'
import User from './User'

export default class Preference extends CustomModel {
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
}
