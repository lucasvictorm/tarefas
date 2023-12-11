const loginModel = require('../models/loginModel');

class LoginService{

    async login(body){
        const {username, password} = body;

        const userId = await loginModel.login(username, password);
        
        return userId;


    }

    async createLogin(body){
        const {username, password, name} = body;
        const user = await loginModel.createLogin(username, password, name)
        return user
    }


}

module.exports = new LoginService;