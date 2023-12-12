const mysql = require('./connection.js');

class TasksModel{
    async getTasks(id){
        const [tasks] = await mysql.execute('SELECT task_id, task_name, task_date, task_status from tasks where task_user=?',[id]);
        
        return tasks;
    }

    async createTask(task_name, task_date, task_user){
        const[task] = await mysql.execute('INSERT INTO tasks (task_name, task_date, task_status, task_user) VALUES (?, ?, ?, ?)', [task_name, task_date, 'pendente', task_user]);
        return [task]
    }
}

module.exports = new TasksModel;