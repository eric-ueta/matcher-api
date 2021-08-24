import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserService } from 'App/Services/UserService'
import { NewUser } from 'Contracts/dtos/user/newUser'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import User from 'App/Models/User'

export default class UserController {
  private UserService: UserService

  constructor() {
    this.UserService = new UserService()
  }

  public async index({ response }: HttpContextContract) {
    const users = await this.UserService.getAll()

    response.send(users)
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    try {
      console.log(request.body())
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

  public async show({ request, response, auth }: HttpContextContract) {
    const user = await this.UserService.getUser(auth.user?.id)

    response.send(user)
  }

  public async updateBasePreferences({ request, response, auth }: HttpContextContract) {
    const data = request.only(['minimumAge', 'maximumAge', 'gender', 'interestIds', 'about'])

    console.log(data)
    if (!auth.user) return response.status(401)

    const userId = auth.user.id

    this.UserService.updateBasePreferences(
      userId,
      data.minimumAge,
      data.maximumAge,
      data.gender,
      data.interestIds,
      data.about
    )

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

  public async addImage({ request, response, auth }: HttpContextContract) {
    const img = request.file('image')
    const isProfile: boolean = request.input('isProfile')

    const user = auth.user

    if (!user) return response.internalServerError()

    await this.UserService.addImage(user?.id, img, isProfile)

    return response.status(204)
  }

  public async edit({}: HttpContextContract) {}

  public async update({ request, auth, response }: HttpContextContract) {
    const data = request.only([
      'about',
      'phone',
      'gender',
      'maximumAge',
      'minimumAge',
      'interestIds',
    ])

    const user = await User.query().preload('preference').where('id', auth.user.id).firstOrFail()

    user.about = data.about
    user.phone = data.phone

    await user?.save()
    await user?.load('preference')

    user.preference.maximumAge = data.maximumAge
    user.preference.minimumAge = data.minimumAge
    user.preference.gender = data.gender

    await user.preference.related('interests').detach() // ¯\_(ツ)_/¯
    await user.preference.related('interests').attach(data.interestIds)

    await user?.preference.save()
  }

  public async destroy({}: HttpContextContract) {}
}
