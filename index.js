const http = require('http')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const notesRouter = require('./controllers/notes')
const taskRouter = require('./controllers/tasks')
app.use(express.json()) //this is json-parser
const middleware = require('./util/middleware')
const config = require('./util/config')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true})
  .then(res => {
     console.log('connected to mongodb')
  }).catch(err => {
    console.log('error connecting to mongodb')
  })

app.use(middleware.requestLogger)
app.use('/api/notes', notesRouter)
app.use('./api/tasks', taskRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
  console.log(`Server Running on Port ${config.PORT}`)
})
