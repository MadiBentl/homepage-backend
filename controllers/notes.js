const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', async (req, res, next) => {
  const user = await User.findOne({ googleId: req.body.id})
  try {
    const newNotes = await Note.find({user})
    console.log(newNotes)
    res.json(newNotes)
  } catch(err) {
    next(err)
  }

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
  const body = req.body.content
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  console.log('decodedToken', decodedToken)

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
