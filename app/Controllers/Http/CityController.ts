import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CityService } from 'App/Services/CityService'

export default class CityController {
  private cityService: CityService

  constructor() {
    this.cityService = new CityService()
  }

  public async index({ response }: HttpContextContract) {
    const cities = await this.cityService.getAll()

    response.send(cities)
  }
}
