const loginService = require('../services/loginService.js');

class controllerLogin {

    async login (req, res) {
        const userId = await loginService.login(req.body);
        let logged = false;
        if(userId.length > 0){
            logged = true
            return res.status(200).send(logged)
        }else{
            return res.status(200).send(logged)
        }
    }

    async createLogin(req, res){
        loginService.createLogin(req.body)
        return res.status(201).send({message: 'Usuário criado com sucesso.'})
    }

}

module.exports = new controllerLogin;