
const tasksRouter = require('express').Router()
const controllerTasks = require('../controllers/controllerTasks.js');
const tasksMiddleware = require('../middlewares/tasksMiddleware.js')

tasksRouter.get('/:id', controllerTasks.getAllTasks);
tasksRouter.get('/pendents/:id', controllerTasks.getPendentTasks);
tasksRouter.get('/completed/:id', controllerTasks.getPendentTasks);
tasksRouter.post('/', tasksMiddleware.verifydata, controllerTasks.createTask);
tasksRouter.put('/:id', tasksMiddleware.verifyUpdate, controllerTasks.updateTask);
tasksRouter.delete('/:id', tasksMiddleware.verifyDelete,controllerTasks.deleteTask);

module.exports = tasksRouter;
