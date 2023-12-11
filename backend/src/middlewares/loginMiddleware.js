const mysql = require('../models/connection.js')

class LoginMiddleware{

    async userVerify(req, res, next){

        const {username} = req.body;
        const [user] = await mysql.execute('SELECT user_username FROM users WHERE user_username=?', [username]);
        if(user.length > 0){
            console.log(user)
            return res.status(400).json({message: "O usuário já existe.", error: 'user exists'})
        }

        next()

    }
}

module.exports = new LoginMiddleware;