const routes = require('express').Router()

routes.use('/auth', require('./auth'))
routes.use('/usuarios', require('./usuarios'))
routes.use('/gabaritos', require('./gabaritos'))
routes.use('/intervalos', require('./intervalos'))
routes.use('/transacoes', require('./transacoes'))
routes.use('/parametro', require('./parametro'))
routes.use('/cartelas', require('./cartelas'))
routes.use('/pedidos', require('./pedidos'))
routes.use('/lotes', require('./lotes'))
routes.use('/series', require('./series'))

module.exports = routes
