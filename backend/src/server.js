const app = require('./app.js')
const dotenv = require('dotenv');
const connection = require('./models/connection.js')
dotenv.config()

const port = process.env.PORT


app.listen(port, console.log('Servidor rodando na porta ' + port))