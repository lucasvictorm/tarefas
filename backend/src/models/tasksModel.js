const mysql = require('./connection.js');

class TasksModel{
    async getTasks(id){
        const [tasks] = await mysql.execute('SELECT * from tasks where task_user=?',[id]);
        
        return tasks;
    }

    async createTask(task_name, task_date, task_user){
        const[task] = await mysql.execute('INSERT INTO tasks (task_name, task_date, task_status, task_user) VALUES (?, ?, ?, ?)', [task_name, task_date, 'pendente', task_user]);
        return task;
    }

    async updateTask(task_name, task_status ,task_id){
        const[task] = await mysql.execute('UPDATE tasks SET task_name=?, task_status=? WHERE task_id=?', [task_name, task_status, task_id]);
        return task;
    }

    async deleteTask(task_id){
        const[task] = await mysql.execute('DELETE FROM tasks WHERE task_id=?', [task_id]);
        return task;
    }
}

module.exports = new TasksModel;