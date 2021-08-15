import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserService } from 'App/Services/UserService'

export default class AuthController {
  private userService: UserService

  /**
   *
   */
  constructor() {
    this.userService = new UserService()
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const notificationToken = request.input('notificationToken')

    try {
      const t = await auth.use('api').attempt(email, password)

      if (auth.user) this.userService.updateNotificationToken(auth.user?.id, notificationToken)

      return { user: t.user, type: t.type, token: t.token }
    } catch (e) {
      return response.unauthorized({ message: 'Dados inválidos' })
    }
  }
}
