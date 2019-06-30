const router = require('express').Router()
const {User, Transaction} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'balance']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/home', async (req, res, next) => {
  try {
    const findUser = req.user.id
    const user = await User.findOne({
      where: {id: findUser}
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})
