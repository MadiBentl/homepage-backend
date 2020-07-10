const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (req, res) => {
  const newNotes = await Note.find({})
  console.log(newNotes)
  res.json(newNotes)
})

notesRouter.get('/:id', async (req, res, next) => {
  console.log(req.params)
  let note = {}
  try{
    note = await Note.findById(req.params.id)
  }catch(err){
    next(err)
  }

  if (note){
    res.json(note)
  }else{
    res.status(404).end()
  }
})

notesRouter.delete('/:id', async (req, res, next) => {
  try{
    await Note.findByIdAndDelete(req.params.id)
    res.status(204).end()
  }catch(err){
    next(err)
  }
})

notesRouter.post('/', async (req, res) => {
  const body = req.body
  if (!body.content){
    return res.status(400).json({error: 'content missing'})
  }
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  })

  note.save().then(result => {
    res.json(result)
  })
})

module.exports = notesRouter
