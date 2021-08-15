import Interest from 'App/Models/Interest'

export class InterestService {
  public async getInterests() {
    return await Interest.query()
  }
}
