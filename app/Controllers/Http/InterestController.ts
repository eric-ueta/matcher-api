import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { InterestService } from 'App/Services/IntererestService'

export default class InterestController {
  private interestService: InterestService

  /**
   *
   */
  constructor() {
    this.interestService = new InterestService()
  }

  public async index({ request, response }: HttpContextContract) {
    const interests = await this.interestService.getInterests()

    response.send(interests)
  }

  public async show({}: HttpContextContract) {}
}
