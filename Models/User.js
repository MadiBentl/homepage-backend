const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  user: String,
  notes: [Note],
  tasks: [Task]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('User', userSchema)
