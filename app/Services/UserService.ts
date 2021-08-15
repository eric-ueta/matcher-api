import Mail from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import { NewUser } from 'Contracts/dtos/user/newUser'
import { makeId } from 'App/Utils/Hash'
import Env from '@ioc:Adonis/Core/Env'
import Preference from 'App/Models/Preference'
export class UserService {
  /**
   * registerUser
   */
  public async registerUser(newUserRequest: NewUser) {
    const mailHash = makeId(20)

    const newUser = await User.create({
      name: newUserRequest.name,
      email: newUserRequest.email,
      password: newUserRequest.password,
      birth: newUserRequest.birth,
      gender: newUserRequest.gender,
      phone: newUserRequest.phone,
      cityId: newUserRequest.cityId,
      emailToken: mailHash,
    })

    try {
      // await Mail.send((message) => {
      //   message
      //     .from(Env.get('DEFAULT_EMAIL'))
      //     .to(Env.get('DEFAULT_EMAIL'))
      //     .subject('Bem-vindo ao Matcher!')
      //     .htmlView('emails/confirm_email', {
      //       url: `http://0.0.0.0:3333/confirm_email?token=${mailHash}`,
      //     })
      // })
    } catch (exc) {
      console.log(exc)
    }

    return newUser
  }

  public async getUser(id: number) {
    return await User.query().where('id', id).whereNull('emailToken').first()
  }

  public async updateNotificationToken(id: number, notificationToken: string) {
    const user = await User.findOrFail(id)
    user.notificationToken = notificationToken

    await user.save()
  }

  public async updateBasePreferences(
    id: number,
    minimumAge: number,
    maximumAge: number,
    gender: string
  ) {
    const user = await User.query().preload('preference').where('id', id).firstOrFail()

    if (!user.preference) {
      const newPreference = await Preference.firstOrNew({
        minimumAge: minimumAge,
        maximumAge: maximumAge,
        gender: gender,
      })

      await newPreference.save()

      user.preferenceId = newPreference.id
    } else {
      user.preference.minimumAge = minimumAge
      user.preference.maximumAge = maximumAge
      user.preference.gender = gender

      await user.preference.save()
    }

    await user.save()
  }
}
