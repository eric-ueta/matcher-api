import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import State from 'App/Models/State'

export default class StateSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'code'

    await State.updateOrCreateMany(uniqueKey, [
      { name: 'Acre', code: 'AC' },
      { name: 'Alagoas', code: 'AL' },
      { name: 'Amazonas', code: 'AM' },
      { name: 'Amapá', code: 'AP' },
      { name: 'Bahia', code: 'BA' },
      { name: 'Ceará', code: 'CE' },
      { name: 'Distrito Federal', code: 'DF' },
      { name: 'Espírito Santo', code: 'ES' },
      { name: 'Goiás', code: 'GO' },
      { name: 'Maranhão', code: 'MA' },
      { name: 'Minas Gerais', code: 'MG' },
      { name: 'Mato Grosso do Sul', code: 'MS' },
      { name: 'Mato Grosso', code: 'MT' },
      { name: 'Pará', code: 'PA' },
      { name: 'Paraíba', code: 'PB' },
      { name: 'Pernambuco', code: 'PE' },
      { name: 'Piauí', code: 'PI' },
      { name: 'Paraná', code: 'PR' },
      { name: 'Rio de Janeiro', code: 'RJ' },
      { name: 'Rio Grande do Norte', code: 'RN' },
      { name: 'Rondônia', code: 'RO' },
      { name: 'Roraima', code: 'RR' },
      { name: 'Rio Grande do Sul', code: 'RS' },
      { name: 'Santa Catarina', code: 'SC' },
      { name: 'Sergipe', code: 'SE' },
      { name: 'São Paulo', code: 'SP' },
      { name: 'Tocantins', code: 'TO' },
    ])
  }
}
