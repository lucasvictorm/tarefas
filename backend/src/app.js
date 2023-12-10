const express = require('express');
const router = require('./routes/router.js');
const cors = require('cors');
const app = express()

app.use(express.json())
app.use(router)
app.use(cors());

module.exports = app;