import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Interest from 'App/Models/Interest'

export default class InterestSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'description'

    await Interest.updateOrCreateMany(uniqueKey, [
      {
        description: 'Tatuagem',
      },
      {
        description: 'Leitura',
      },
      {
        description: 'Esporte',
      },
      {
        description: 'Academia',
      },
      {
        description: 'Dança',
      },
      {
        description: 'Viajar',
      },
      {
        description: 'Música',
      },
      {
        description: 'Games',
      },
      {
        description: 'Arte',
      },
      {
        description: 'Jardinagem',
      },
      {
        description: 'Teatro',
      },
    ])
  }
}
