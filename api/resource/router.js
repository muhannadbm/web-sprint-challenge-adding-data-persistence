// build your `/api/resources` router here
const express = require('express')
const resourceRouter = express.Router()
const Resource = require('./model')

resourceRouter.post('/', async (req, res, next)=>{
    try{
        let result = await Resource.insert(req.body)
        res.json(result) 
        }
    catch(e) {
        next(e)
    }
})

resourceRouter.get('/', async (req, res)=>{
    let result = await Resource.getAll()
    res.json(result)
})



// eslint-disable-next-line
resourceRouter.use((err, req, res, next) => { // we plug it AFTER the endpoints
    res.status(err.status || 500).json({
      message: err.message,
      customMessage: 'Something bad inside the resources router!'
    })
  });

  module.exports = resourceRouter
