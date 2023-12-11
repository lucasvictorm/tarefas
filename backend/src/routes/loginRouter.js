const {Router} = require('express');
const controllerLogin = require('../controllers/controllerLogin.js');
const loginMiddleware = require('../middlewares/loginMiddleware.js')
const loginRouter = Router();

loginRouter.post('/entrar', controllerLogin.login)
loginRouter.post('/', loginMiddleware.userVerify, controllerLogin.createLogin)

module.exports = loginRouter;