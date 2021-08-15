import { column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import CustomModel from './CustomModel'
import Interest from './Interest'

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
  public preferences: ManyToMany<typeof Interest>
}
