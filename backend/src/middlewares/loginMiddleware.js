const { QueryTypes } = require('sequelize');
const db = require('../models/connection.js')

class LoginMiddleware{

    async userVerify(req, res, next){

        const {username} = req.body;
        console.log(username)
        const user = await db.query('SELECT user_username FROM users WHERE user_username = $1', { 
            bind: [username],
            type: QueryTypes.SELECT
        });
        if(user.length > 0){
            console.log(user)
            return res.status(400).json({message: "O usuário já existe.", error: 'user exists'})
        }

        next()

    }
}

module.exports = new LoginMiddleware;