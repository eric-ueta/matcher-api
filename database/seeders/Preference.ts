import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Preference from 'App/Models/Preference'
import { PreferenceFactory } from 'Database/factories'

export default class PreferenceSeeder extends BaseSeeder {
  public async run() {
    const preferences = await PreferenceFactory.createMany(0)

    const preferenceArrayArray = preferences.map((preference) => {
      return {
        gender: preference.gender,
        maximumAge: preference.maximumAge,
        minimumAge: preference.minimumAge,
      }
    })

    await Preference.createMany(preferenceArrayArray)
  }
}
