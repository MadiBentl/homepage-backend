const taskRouter = require('express').Router()
const Task = require('../models/Tasklist')
const User = require('../models/User')

taskRouter.get('/', async (req, res) => {
  const tasks = await Task.find({})
  return res.json(tasks)
})

taskRouter.put('/:id', async (req, res, next) => {
  try{
    const editedTask = await Task.findById(req.params.id)
    editedTask.complete = !editedTask.complete
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

  const user = await User.findOne({ googleId: body.user})
  const task = new Task({
    content: body.content,
    user: user._id,
    complete: false
  })
  console.log(task)

  task.save().then(result => {
    res.json(result)
  })
})

module.exports = taskRouter
