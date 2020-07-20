const mongoose = require('mongoose')

const taskListSchema = new mongoose.Schema({
  content: String!,
  complete: Boolean!
})

taskListSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Task', taskListSchema)
