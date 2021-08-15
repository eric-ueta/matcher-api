import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserService } from 'App/Services/UserService'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { NewUser } from 'Contracts/dtos/user/newUser'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UserController {
  private UserService: UserService

  constructor() {
    this.UserService = new UserService()
  }

  public async index({}: HttpContextContract) {}

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload: NewUser = await request.validate(CreateUserValidator)

      const newUser = await this.UserService.registerUser(payload)

      if (newUser) {
        response.send(newUser)
      } else {
        response.status(500).send({})
      }
    } catch (error) {
      response.badRequest(error.messages)
    }
  }

  public async show({ request, response }: HttpContextContract) {
    const id: number = request.param('id')

    const user = await this.UserService.getUser(id)

    response.send(user)
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
