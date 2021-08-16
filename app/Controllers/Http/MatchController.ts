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
}
