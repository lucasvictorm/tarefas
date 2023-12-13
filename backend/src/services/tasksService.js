const tasksModel = require('../models/tasksModel');

class TasksService{
    async getTasks(id){
        const tasks = tasksModel.getTasks(id);
        return tasks;
    }

    async getPendentTasks(id){
        const tasks = tasksModel.getPendentTasks(id);
        return tasks;
    }

    async createTask(body){
        const {task_name, task_date, task_user} = body;
        const task = await tasksModel.createTask(task_name, task_date, task_user);
        return task;
    }

    async updateTask(body){
        const {task_name, task_status, task_id} = body;
        const task = await tasksModel.updateTask(task_name, task_status, task_id);
        return task;
    }

    async deleteTask(task_id){
        const task = await tasksModel.deleteTask(task_id);
        return task;
    }
}

module.exports = new TasksService