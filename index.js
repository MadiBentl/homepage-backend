const http = require('http')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json()) //this is json-parser
const middleware = require('./util/middleware')
const config = require('./util/config')

const Note = require('./models/Note')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true})
  .then(res => {
     console.log('connected to mongodb')
  }).catch(err => {
    console.log('error connecting to mongodb')
  })


app.use(middleware.requestLogger)

app.get('/api/notes', async (req, res) => {
  const newNotes = await Note.find({})
  console.log(newNotes)
  res.json(newNotes)
})

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

app.get('/api/notes/:id', async (req, res, next) => {
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

app.delete('/api/notes/:id', async (req, res, next) => {
  try{
    await Note.findByIdAndDelete(req.params.id)
    res.status(204).end()
  }catch(err){
    next(err)
  }
})

app.post('/api/notes', async (req, res) => {
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

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
  console.log(`Server Running on Port ${config.PORT}`)
})
