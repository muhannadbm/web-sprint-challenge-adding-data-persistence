// build your `/api/projects` router here
const express = require('express')
const projectRouter = express.Router()
const project = require('./model')

projectRouter.post('/', async (req, res, next)=>{
    try{
    let result = await project.insert(req.body)
    res.json(result)
}
catch(e) {
    next(e)
}
})

projectRouter.get('/', async (req, res)=>{
    let result = await project.getAll()
    
    res.json(result)
})



// eslint-disable-next-line
projectRouter.use((err, req, res, next) => { // we plug it AFTER the endpoints
    res.status(err.status || 500).json({
      message: err.message,
      customMessage: 'Something bad inside the projects router!'
    })
  });

  module.exports = projectRouter
