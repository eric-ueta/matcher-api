import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [
      rules.required(),
      rules.unique({
        table: 'user',
        column: 'email',
        caseInsensitive: true,
        whereNot: { emailToken: null },
      }),
      rules.maxLength(255),
      rules.email(),
    ]),
    name: schema.string({}, [rules.required()]),
    password: schema.string({}, [rules.required()]),
    phone: schema.number(),
    birth: schema.date({}, [rules.required()]),
    cityId: schema.number(),
    gender: schema.string({}, [rules.required()]),
  })

  public messages = {
    'email.unique': 'E-mail já cadastrado',
  }
}
