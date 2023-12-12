class tasksMiddleware{
    async verifydata(req, res, next){
        const body = req.body;

        if(!body.task_name | !body.task_date | !body.task_user){
            return res.status(400).json({message: 'Informações faltando.'})
        }

        next()

    }
}

module.exports = new tasksMiddleware