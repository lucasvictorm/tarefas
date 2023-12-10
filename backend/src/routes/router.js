const express = require('express');
const loginRouter = require('./loginRouter.js');


const router = express.Router();

router.use('/login', loginRouter);

module.exports = router;