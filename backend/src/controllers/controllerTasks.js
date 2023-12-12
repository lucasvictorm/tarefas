const tasksService = require('../services/tasksService');

class Tasks{
    async getTasks(req, res){
        const id = req.params.id;
        
        const tasks = await tasksService.getTasks(id)
        
        return res.status(200).json(tasks);
    }
}

module.exports = new Tasks