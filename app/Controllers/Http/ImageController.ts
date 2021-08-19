import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ImageService } from 'App/Services/ImageService'

export default class ImageController {
  private imageService: ImageService

  constructor() {
    this.imageService = new ImageService()
  }

  public async getImageById({ request, response }: HttpContextContract) {
    const imgId: number = request.param('id')

    const imgPath = await this.imageService.getImageById(imgId)

    return response.download(imgPath)
  }
}
