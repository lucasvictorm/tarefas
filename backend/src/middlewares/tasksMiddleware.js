class tasksMiddleware{
    async verifydata(req, res, next){
        const body = req.body;

        if(!body.task_name | !body.task_date | !body.task_user){
            return res.status(400).json({message: 'Informações faltando.'})
        }

        next()

    }

    async verifyUpdate(req, res, next){
        const body = req.body;
        const id = req.params.id;

        if(!body.task_name | !body.task_status){
            return res.status(400).json({message: 'Informações faltando.'})
        }

        if(!id){
            return res.status(400).json({message: 'Informações faltando.'})
        }

        next()

    }

    async verifyDelete(req, res, next){
        
        const id = req.params.id;

        if(!id){
            return res.status(400).json({message: 'Informações faltando.'})
        }

        next()

    }
}

module.exports = new tasksMiddleware