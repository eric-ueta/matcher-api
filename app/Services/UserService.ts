import User from 'App/Models/User'
import { NewUser } from 'Contracts/dtos/user/newUser'
import { makeId } from 'App/Utils/Hash'
import Preference from 'App/Models/Preference'
import { parseJSON, subYears } from 'date-fns'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
import Application from '@ioc:Adonis/Core/Application'
import Image from 'App/Models/Image'
import Interest from 'App/Models/Interest'
import Database from '@ioc:Adonis/Lucid/Database'
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
    const user = await User.query().preload('images').preload('preference').where('id', id).first()

    await user?.preference.load('interests')

    return user
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
    gender: string,
    interestIds: Array<number>,
    about: string
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

    user.about = about

    await user.save()

    await this.updateInterests(id, interestIds)
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
      .preload('city')
      .preload('preference')
      .preload('images')
      .where('cityId', user.cityId) // mesma cidade do usuario
      .whereIn('gender', acceptedGenders) // usuario aceite genero do candidato
      .whereBetween('birth', [maximumBirthPref, minimumBirthPref]) // usuario aceite idade do candidato
      .whereNot('id', user.id) // filtrar próprio usuário
      .whereHas('preference', (preference) => {
        preference
          .where('minimumAge', '<=', user.getAge()) // candidato aceite idade do usuario
          .where('maximumAge', '>=', user.getAge()) // candidato aceite idade do usuario
          .whereIn('gender', [user.gender, 'o']) // candidato aceite genero do usuario (sexo do usuario exato ou bi)
      })
      // Onde usuario nao tenha ja comecado um match
      .whereDoesntHave('matchesRelated', (match) => {
        match.whereInPivot('userOneId', [user.id])
      })
      // Onde candidato comecou mas usuario nao avaliou
      .whereDoesntHave('matchesStarted', (match) => {
        match.whereNotNullPivot('userTwoLiked')
      })

    return candidates
  }

  public async addImage(id: number, img: MultipartFileContract | null, isProfile: boolean) {
    const imgName = `${Date.now()}_USER_${id}.jpg`

    if (img) {
      const newImage = new Image()
      newImage.format = img.extname ?? 'jpg'
      newImage.size = img.size
      newImage.userId = id
      newImage.path = `uploads/${imgName}`
      newImage.isProfile = isProfile

      if (isProfile) {
        const currentProfileImage = await Image.query()
          .where('userId', id)
          .where('isProfile', 'true')
          .first()

        if (currentProfileImage) {
          currentProfileImage.isProfile = false
          await currentProfileImage.save()
        }
      }

      await img.move(Application.tmpPath('uploads'), {
        name: imgName,
        overwrite: false,
      })
      await newImage.save()
    }
  }
}
