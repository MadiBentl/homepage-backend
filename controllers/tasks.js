const taskRouter = require('express').Router()
const Task = require('../models/Tasklist')

taskRouter.get('/', async (req, res) => {
  const tasks = await Task.find({})
  return res.json(tasks)
})

taskRouter.put('/:id', async (req, res, next) => {
  try{
    const editedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true} )
    res.json(editedTask)
  }catch(err){
    next(err)
  }
})

taskRouter.delete('/:id', async (req, res, next) => {
  try{
    await Task.findByIdAndDelete(req.params.id)
    res.status(204).end()
  }catch(err){
    next(err)
  }
})

taskRouter.post('/', async (req, res) => {
  const body = req.body
  const task = new Task({
    content: body.content,
    complete: false
  })

  task.save().then(result => {
    res.json(result)
  })
})

module.exports = taskRouter
