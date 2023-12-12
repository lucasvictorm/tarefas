const tasksModel = require('../models/tasksModel');

class TasksService{
    async getTasks(id){
        const tasks = tasksModel.getTasks(id);
        return tasks;
    }

    async createTask(body){
        const {task_name, task_date, task_user} = body
        const task = await tasksModel.createTask(task_name, task_date, task_user);
        return task;
    }
}

module.exports = new TasksService