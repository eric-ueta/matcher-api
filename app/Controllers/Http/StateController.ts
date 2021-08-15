import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StateService } from 'App/Services/StateService'

export default class StateController {
  private stateService: StateService

  constructor() {
    this.stateService = new StateService()
  }

  public async index({ request, response }: HttpContextContract) {
    const states = await this.stateService.getStates()

    response.send(states)
  }

  public async getCities({ request, response }: HttpContextContract) {
    const id = request.param('id')

    const stateWithCities = await this.stateService.getCitiesById(id)

    response.send(stateWithCities)
  }
}
