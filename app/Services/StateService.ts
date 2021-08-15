import State from 'App/Models/State'

export class StateService {
  public async getStates() {
    return await State.query()
  }

  public async getCitiesById(id: number) {
    return await State.query().preload('cities').where('id', id)
  }
}
