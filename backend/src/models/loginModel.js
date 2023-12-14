const { QueryTypes } = require('sequelize');
const db = require('./connection.js');

class LoginModel{
    async login(username, password){
        
        const userData = await db.query('SELECT user_id, user_name FROM users where user_username = $1 and user_password = $2', {
            bind: [username, password],
            type: QueryTypes.SELECT
        })
        
        
        const user = userData[0];
        return user;
    }

    async createLogin(username, password, name){
        await db.query('INSERT INTO users (user_username, user_password, user_name) VALUES($1, $2, $3)', { 
            bind: [username, password, name],
            type: QueryTypes.INSERT
        })

        const userInfo = await db.query('SELECT user_id from users WHERE user_username = $1',  { 
            bind: [username],
            type: QueryTypes.SELECT
        });
        const user = userInfo[0]
        
        return user;


    }
}

module.exports = new LoginModel;