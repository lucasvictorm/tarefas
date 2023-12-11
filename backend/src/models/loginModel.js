const mysql = require('./connection.js');

class LoginModel{
    async login(username, password){
        const [userData] = await mysql.execute('SELECT user_id, user_name FROM users where user_username=? and user_password=?', [username, password])
        const user = userData[0];
        return user;
    }

    async createLogin(username, password, name){
        const [user] = await mysql.execute('INSERT INTO users (user_username, user_password, user_name) VALUES(?, ?, ?)', [username, password, name])

        return user;


    }
}

module.exports = new LoginModel;