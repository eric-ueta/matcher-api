import { column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import CustomModel from './CustomModel'
import Preference from './Preference'

export default class Interest extends CustomModel {
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
}
