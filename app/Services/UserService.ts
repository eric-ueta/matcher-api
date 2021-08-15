import Mail from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'
import { NewUser } from 'Contracts/dtos/user/newUser'
import { makeId } from 'App/Utils/Hash'
import Env from '@ioc:Adonis/Core/Env'
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
      await Mail.send((message) => {
        message
          .from(Env.get('DEFAULT_EMAIL'))
          .to(Env.get('DEFAULT_EMAIL'))
          .subject('Bem-vindo ao Matcher!')
          .htmlView('emails/confirm_email', {
            url: `http://0.0.0.0:3333/confirm_email?token=${mailHash}`,
          })
      })
    } catch (exc) {
      console.log(exc)
    }

    return newUser
  }
}
