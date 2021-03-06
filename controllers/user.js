const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/:id', async (req, res, next) => {
  try{
    let user = await User.findById(req.params.id)
  }catch(err){
    next(err)
  }
  if (user){
    res.json(user)
  }else{
    res.status(404).end()
  }
})

userRouter.get('/', async(req,res) => {
  let users = await User.find({})
  res.json(users)
})
userRouter.post('/', async (req, res) => {
  console.log('body', req.body)
  if (!req.body.user){
    res.json('no username')
  }
  const user = new User({
    googleId: req.body.user
  })

  user.save().then(result => {
    res.json(result)
  })
})

module.exports = userRouter
