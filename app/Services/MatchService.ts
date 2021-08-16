import Match from 'App/Models/Match'

export class MatchService {
  public async getMatchesByUserId(userId: number) {
    return await Match.query().where('userOneId', userId).orWhere('userTwoId', userId)
  }
}
