const mysql = require('./connection.js');

class TasksModel{
    async getTasks(id){
        const [tasksList] = await mysql.execute('SELECT task_id, task_name, task_date, task_status from tasks where task_user=?',[id]);
        console.log(tasksList)
        const tasks = tasksList[0];
        return tasks;
    }
}

module.exports = new TasksModel;