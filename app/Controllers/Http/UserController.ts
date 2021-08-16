import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserService } from 'App/Services/UserService'
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

  public async updateBasePreferences({ request, response, auth }: HttpContextContract) {
    const data = request.only(['minimumAge', 'maximumAge', 'gender'])

    if (!auth.user) return response.status(401)

    const userId = auth.user.id

    this.UserService.updateBasePreferences(userId, data.minimumAge, data.maximumAge, data.gender)

    response.status(204)
  }

  public async updateInterests({ request, response, auth }: HttpContextContract) {
    const data = request.only(['interestIds'])

    if (!auth.user) return response.status(401)

    const userId = auth.user.id

    await this.UserService.updateInterests(userId, data.interestIds)

    response.status(204)
  }

  public async getCandidates({ request, response, auth }: HttpContextContract) {
    const user = auth.user

    if (!user) return response.send(500)

    const candidates = await this.UserService.getCandidates(user)

    response.send(candidates)
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
