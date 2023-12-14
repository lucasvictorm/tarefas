const { QueryTypes } = require('sequelize');
const db = require('./connection.js');

class TasksModel{
    async getAllTasks(id){
        const tasks = await db.query('SELECT * from tasks where task_user=$1',  { 
            bind: [id],
            type: QueryTypes.SELECT
        });
        
        return tasks;
    }

    async getPendentTasks(id){
        const tasks = await db.query("SELECT * from tasks where task_user=$1 AND task_status = 'pendente'", { 
            bind: [id],
            type: QueryTypes.SELECT
        });
        return tasks;
    }

    async getCompletedTasks(id){
        const tasks = await db.query("SELECT * from tasks where task_user=$1 AND task_status = 'concluido'",{ 
            bind: [id],
            type: QueryTypes.SELECT
        });
        return tasks;
    }

    async createTask(task_name, task_date, task_user){
        const task = await db.query('INSERT INTO tasks (task_name, task_date, task_status, task_user) VALUES ($1, $2, $3, $4)', { 
            bind: [task_name, task_date, 'pendente', task_user],
            type: QueryTypes.INSERT
        });
        return task;
    }

    async updateTask(task_name, task_status ,task_id){
        const task = await db.query('UPDATE tasks SET task_name=$1, task_status=$2 WHERE task_id=$3', { 
            bind: [task_name, task_status, task_id],
            type: QueryTypes.UPDATE
        });
        return task;
    }

    async deleteTask(task_id){
        const task = await db.query('DELETE FROM tasks WHERE task_id=$1', {
            bind: [task_id],
            type: QueryTypes.DELETE
        });
        return task;
    }
}

module.exports = new TasksModel;