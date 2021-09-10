// build your `/api/tasks` router here
const express = require('express')
const taskRouter = express.Router()
const task = require('./model')

taskRouter.post('/', async (req, res, next)=>{
    try{
    let result = await task.insert(req.body)
    res.json(result)
}
catch(e){
    next(e)
}
})

taskRouter.get('/', async (req, res)=>{
    let result = await task.getAll()
    
    res.json(result)
})



// eslint-disable-next-line
taskRouter.use((err, req, res, next) => { // we plug it AFTER the endpoints
    res.status(err.status || 500).json({
      message: err.message,
      customMessage: 'Something bad inside the tasks router!'
    })
  });

  module.exports = taskRouter
