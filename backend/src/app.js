const express = require('express');
const router = require('./routes/router.js');
const cors = require('cors');
const app = express()
app.use(
    express.urlencoded({
      extended: true,
    })
  )
app.use(express.json())
app.use(cors());
app.use(router)


module.exports = app;