import Application from '@ioc:Adonis/Core/Application'
import Image from 'App/Models/Image'

export class ImageService {
  public async getImageById(id: number) {
    const img = await Image.find(id)

    if (img?.path) {
      return Application.tmpPath(img?.path)
    }

    throw new Error('ops')
  }
}
