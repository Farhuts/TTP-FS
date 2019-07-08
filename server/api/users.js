const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

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
