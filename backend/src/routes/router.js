const express = require('express');
const loginRouter = require('./loginRouter.js');
const tasksRouter = require('./tasksRouter.js')


const router = express.Router();

router.use('/login', loginRouter);
router.use('/tasks', tasksRouter);

module.exports = router;