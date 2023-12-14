const {Sequelize} = require('sequelize')
require('dotenv').config()

db_url = process.env.DB_URL


const connection = new Sequelize(db_url);
 
 try {async () =>{
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
 }
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }


module.exports = connection