import City from 'App/Models/City'

export class CityService {
  public async getAll() {
    return await City.query()
  }
}
