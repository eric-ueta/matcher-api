import { DateTime } from 'luxon'
import { column, computed, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import CustomModel from './CustomModel'
import City from './City'

export default class State extends CustomModel {
  public static table = 'state'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public code: string

  @hasMany(() => City)
  public cities: HasMany<typeof City>
}
