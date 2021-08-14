import { Encryption } from '@adonisjs/core/build/standalone'
import { appKey } from 'Config/app'

export const Crypt = new Encryption({ secret: appKey, algorithm: 'aes-256-cbc' })

export default Crypt
