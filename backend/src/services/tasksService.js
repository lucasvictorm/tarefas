const tasksModel = require('../models/tasksModel');

class TasksService{
    async getTasks(id){
        const tasks = tasksModel.getTasks(id);
        return tasks;
    }
}

module.exports = TasksService