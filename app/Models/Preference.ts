import { column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Gender from 'Contracts/enums/gender'
import CustomModel from './CustomModel'
import Interest from './Interest'

export default class Preference extends CustomModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public minimumAge: number

  @column()
  public maximumAge: number

  @column()
  public gender: Gender

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
