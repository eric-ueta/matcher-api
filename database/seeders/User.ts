import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { UserFactory } from 'Database/factories'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'email'

    const users = await UserFactory.createMany(0)

    const userArray = users.map((user, index) => {
      return {
        email: user.email,
        name: user.name,
        password: user.password,
        phone: user.phone,
        gender: user.gender,
        birth: user.birth,
        cityId: user.cityId,
        preferenceId: index + 1,
      }
    })

    await User.updateOrCreateMany(uniqueKey, userArray)
  }
}
