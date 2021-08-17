/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.post('/user', 'UserController.store')
    Route.post('/login', 'AuthController.login')

    Route.get('/state', 'StateController.index')
    Route.get('/state/:id', 'StateController.getCities')

    Route.get('/interest', 'InterestController.index')

    Route.group(() => {
      Route.get('/user/:id', 'UserController.show')
      Route.get('/users', 'UserController.index')
      Route.get('/user/candidate/all', 'UserController.getCandidates')

      Route.put('/user/preference', 'UserController.updateBasePreferences')
      Route.put('/user/interest', 'UserController.updateInterests')

      Route.get('/match', 'MatchController.index')
    }).middleware(['auth'])
  }).prefix('/v1')
}).prefix('/api')

Route.get('/', async () => {
  return { worked: 'true' }
})
