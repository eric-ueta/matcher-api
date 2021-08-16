import Factory from '@ioc:Adonis/Lucid/Factory'
import Preference from 'App/Models/Preference'
import User from 'App/Models/User'
import { getRandomDate } from 'App/Utils/DateUtil'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: '123456',
    phone: 4299999999,
    cityId: 3060,
    gender: Math.random() < 0.5 ? 'm' : 'f',
    birth: getRandomDate(new Date('1971-01-01'), new Date('2003-01-01')),
  }
}).build()

export const PreferenceFactory = Factory.define(Preference, ({ faker }) => {
  return {
    gender: getRandomGenderPreference(),
    minimumAge: getRandomAgePreference(18, 25),
    maximumAge: getRandomAgePreference(22, 50),
  }
}).build()

const getRandomGenderPreference = () => {
  let gender = Math.random() < 0.5 ? 'o' : 'f'

  return Math.random() < 0.5 ? gender : 'm'
}

const getRandomAgePreference = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}
