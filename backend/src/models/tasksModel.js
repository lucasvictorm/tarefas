const mysql = require('./connection.js');

class TasksModel{
    async getTasks(id){
        const [tasksList] = mysql.execute('SELECT task_id, task_name, task_date, task_status from tasks where user_id=?',[id]);
        const tasks = tasksList[0];
        return tasks;
    }
}

module.exports = new TasksModel;