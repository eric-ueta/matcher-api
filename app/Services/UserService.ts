import Mail from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import { NewUser } from 'Contracts/dtos/user/newUser'
import { makeId } from 'App/Utils/Hash'
import Env from '@ioc:Adonis/Core/Env'
import Preference from 'App/Models/Preference'
import { subYears } from 'date-fns'
import Match from 'App/Models/Match'
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

  public async getAll() {
    return await User.query().paginate(1, 500)
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
    await user.load('preference')

    // cidade
    // sexo
    // idade

    // ordenar interesses

    const maximumBirthPref = subYears(Date.now(), user.preference.maximumAge).toISOString()
    const minimumBirthPref = subYears(Date.now(), user.preference.minimumAge).toISOString()

    const preferedGender = user.preference.gender
    const isBissexual = preferedGender === 'o'
    const acceptedGenders = isBissexual ? ['m', 'f'] : [preferedGender]

    const candidates = await User.query()
      .where('cityId', user.cityId) // mesma cidade do usuario
      .whereIn('gender', acceptedGenders) // usuario aceite genero do candidato
      .whereBetween('birth', [maximumBirthPref, minimumBirthPref]) // usuario aceite idade do candidato
      .whereHas('preference', (preference) => {
        preference
          .where('minimumAge', '<=', user.getAge()) // candidato aceite idade do usuario
          .where('maximumAge', '>=', user.getAge()) // candidato aceite idade do usuario
          .whereIn('gender', [user.gender, 'o']) // candidato aceite genero do usuario (sexo do usuario exato ou bi)
      })
      .whereNot('id', user.id) // filtrar próprio usuário
      // filtro matches 1
      .whereDoesntHave('matchesOne', (match) => {
        match.where('userOneId', user.id).orWhere('userTwoId', user.id)
      })
      // filtro matches 2
      .whereDoesntHave('matchesTwo', (match) => {
        match.where('userOneId', user.id).orWhere('userTwoId', user.id)
      })

    return candidates
  }
}
