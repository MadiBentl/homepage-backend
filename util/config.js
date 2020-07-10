require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = `mongodb+srv://mbentley:${process.env.MONGODB_PASSWORD}@cluster0.jeyxn.mongodb.net/haro?retryWrites=true&w=majority`

module.exports = {
  MONGODB_URI,
  PORT
}
