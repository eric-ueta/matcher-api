import User from 'App/Models/User'

export class MatchService {
  public async getMatchesByUserId(userId) {
    const matches = await User.query()
      .whereHas('matchesStarted', (match) => {
        match
          .wherePivot('userTwoId', userId)
          .wherePivot('userTwoLiked', true)
          .wherePivot('userOneLiked', true)
      })
      .orWhereHas('matchesRelated', (match) => {
        match
          .wherePivot('userOneId', userId)
          .wherePivot('userTwoLiked', true)
          .wherePivot('userOneLiked', true)
      })
      .preload('images')

    return matches
  }

  public async postMatch(userId, candidateId, like) {
    try {
      const user = await User.find(userId)

      const matchesRelated = await user
        ?.related('matchesRelated')
        .pivotQuery()
        .wherePivot('userOneId', candidateId)

      if (matchesRelated?.length > 0) {
        user?.related('matchesRelated').sync({
          [candidateId]: {
            userTwoLiked: like,
          },
        })
      } else {
        user?.related('matchesStarted').attach({
          [candidateId]: {
            userOneLiked: like,
          },
        })
      }

      return true
    } catch (e) {
      return false
    }
  }
}
