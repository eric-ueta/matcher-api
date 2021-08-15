import { DateTime } from 'luxon'

export interface NewUser {
  name: string
  email: string
  password: string
  phone: number
  birth: DateTime
  cityId: number
  gender: string
}
