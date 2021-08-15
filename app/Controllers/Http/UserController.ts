import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserService } from 'App/Services/UserService'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { NewUser } from 'Contracts/dtos/user/newUser'

export default class UserController {
  private UserService: UserService

  constructor() {
    this.UserService = new UserService()
  }

  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const userSchema = schema.create({
      email: schema.string({}, [
        rules.required(),
        rules.unique({
          table: 'user',
          column: 'email',
          caseInsensitive: true,
          whereNot: { emailToken: null },
        }),
        rules.maxLength(255),
        rules.email(),
      ]),
      name: schema.string({}, [rules.required()]),
      password: schema.string({}, [rules.required()]),
      phone: schema.number(),
      birth: schema.date({}, [rules.required()]),
      cityId: schema.number(),
      gender: schema.string({}, [rules.required()]),
    })

    try {
      const payload: NewUser = await request.validate({
        schema: userSchema,
        messages: {
          'email.unique': 'E-mail já cadastrado',
        },
      })

      console.log(1)
      const newUser = await this.UserService.registerUser(payload)

      if (newUser) {
        response.send(newUser)
      } else {
        response.status(500).send({ a: 't' })
      }
    } catch (error) {
      response.badRequest(error.messages)
    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
