import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { MatchService } from 'App/Services/MatchService'

export default class MatchController {
  private matchService: MatchService

  /**
   *
   */
  constructor() {
    this.matchService = new MatchService()
  }

  public async index({ request, response, auth }: HttpContextContract) {
    const userId = auth?.user?.id

    const matches = await this.matchService.getMatchesByUserId(userId as number)

    response.send(matches)
  }

  public async postMatch({ request, response, auth }: HttpContextContract) {
    const data = request.only(['userId', 'like'])

    const userId = auth?.user?.id

    const success = await this.matchService.postMatch(userId, data.userId, data.like)

    if (success) {
      return response.noContent()
    } else {
      return response.internalServerError()
    }
  }
}
