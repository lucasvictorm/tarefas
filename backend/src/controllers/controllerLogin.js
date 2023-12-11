const loginService = require('../services/loginService.js');


class controllerLogin {

    async login (req, res) {
        const user = await loginService.login(req.body);
        let logged = false;
        
        if(user){
            logged = true
            
            return res.status(201).json({user, logged})
        }else{
            return res.status(200).json({message: "Usuário e/ou senha inválidos."})
        }
        
    }
    
    async createLogin(req, res){
        loginService.createLogin(req.body)
        return res.status(201).send({message: 'Usuário criado com sucesso.'})
    }

}

module.exports = new controllerLogin;