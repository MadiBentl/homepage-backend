const http = require('http')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const notesRouter = require('./controllers/notes')
const taskRouter = require('./controllers/tasks')
const loginRouter = require('./controllers/user')
app.use(express.json()) //this is json-parser
const middleware = require('./util/middleware')
const config = require('./util/config')
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))

mongoose.set('useFindAndModify', false);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true})
  .then(res => {
     console.log('connected to mongodb')
  }).catch(err => {
    console.log('error connecting to mongodb')
  })

app.use(middleware.requestLogger)
app.use('/api/notes', notesRouter)
app.use('/api/tasks', taskRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const PORT = config.PORT || 3001
app.listen(config.PORT, () => {
  console.log(`Server Running on Port ${config.PORT}`)
})
