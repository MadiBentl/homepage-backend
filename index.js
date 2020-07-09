const http = require('http')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
app.use(express.json()) //this is json-parser

const mongoUrl = `mongodb+srv://mbentley:${process.env.MONGODB_PASSWORD}@cluster0.jeyxn.mongodb.net/haro?retryWrites=true&w=majority`

const Note = require('./models/Note')

mongoose.connect(mongoUrl, { useNewUrlParser: true})
  .then(res => {
     console.log('connected to mongodb')
  }).catch(err => {
    console.log('error connecting to mongodb')
  })

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true
  }
]

app.get('/api/notes', async (req, res) => {
  const newNotes = await Note.find({})
  console.log(newNotes)
  res.json(newNotes)
})

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  if (note){
    res.json(note)
  }else{
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)

  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const body = req.body
  if (!body.content){
    return res.status(400).json({error: 'content missing'})
  }
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
  const note = {
    id: maxId + 1,
    content: body.content,
    important: body.important || false,
    date: new Date()
  }

  notes = notes.concat(note)
  res.json(note)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`)
})
