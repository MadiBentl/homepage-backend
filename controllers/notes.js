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

notesRouter.put('/:id', async (req, res, next) => {
  try{
    const editedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {new: true} )
    res.json(editedNote)
  }catch(err){
    next(err)
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
  const note = new Note({
    content: body.content || '',
    important: body.important || false,
    location: body.location
  })
  console.log('note', note)

  note.save().then(result => {
    res.json(result)
  })
})

module.exports = notesRouter
