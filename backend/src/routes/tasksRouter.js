//const {Router} = require('express');
const tasksRouter = require('express').Router()
const controllerTasks = require('../controllers/controllerTasks');

tasksRouter.get('/:id', controllerTasks.getTasks);

module.exports = tasksRouter
