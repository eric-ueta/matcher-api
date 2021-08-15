import { BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import CustomModel from './CustomModel'
import State from './State'
import User from './User'

export default class City extends CustomModel {
  public static table = 'city'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @hasMany(() => User)
  public users: HasMany<typeof User>

  @column({ columnName: 'stateId' })
  public stateId: number

  @belongsTo(() => State)
  public state: BelongsTo<typeof State>
}
