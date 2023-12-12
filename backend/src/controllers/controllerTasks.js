const tasksService = require('../services/tasksService');

class Tasks{
    async getTasks(req, res){
        const id = req.params.id;
        
        const tasks = await tasksService.getTasks(id)
        
        return res.status(200).json(tasks);
    }

    async createTask(req, res){
        const body = req.body;
        
        await tasksService.createTask(body)
        
        return res.status(201).json({message: 'Tarefa criada com sucesso'});
    }

    async updateTask(req, res){
        const body = req.body;
        body.task_id = req.params.id;
        console.log(body);
        await tasksService.updateTask(body);
        
        return res.status(201).json({message: 'Tarefa criada com sucesso'});
    }
}

module.exports = new Tasks