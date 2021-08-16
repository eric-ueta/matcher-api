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

  public async updateInterests(id: number, intererestsIds: Array<number>) {
    const user = await User.query().preload('preference').where('id', id).firstOrFail()

    await user.preference.related('interests').detach() // ¯\_(ツ)_/¯
    await user.preference.related('interests').attach(intererestsIds)
  }

  public async getCandidates(user: User) {
    const candidates = await User.query()
      .where('cityId', user.cityId)
      .whereHas('preference', (preference) => {
        preference
          .where('minimumAge', '<=', user.getAge())
          .where('maximumAge', '>=', user.getAge())
          .where('gender', user.gender)
      })
      .orWhereHas('preference', (preference) => {
        preference
          .where('minimumAge', '<=', user.getAge())
          .where('maximumAge', '>=', user.getAge())
          .where('gender', 'o')
      })
      .whereNot('id', user.id)
      .paginate(1, 500)

    // cidade
    // sexo
    // idade
    // interesses

    return candidates
  }
}
