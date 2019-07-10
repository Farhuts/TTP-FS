const router = require('express').Router()
const {User, Transaction} = require('../db/models')
module.exports = router

router.get('/home', async (req, res, next) => {
  try {
    const findUser = req.user.id
    const user = await User.findOne({
      where: {id: findUser}
    })
    // ********************************************
    const userStocksArr = []
    const checkDublicates = {}

    const userStocks = await Transaction.findAll({
      where: {userId: findUser},
      attributes: ['name', 'shares'],
      order: [['createdAt', 'DESC']]
    })

    userStocks.map(elem => {
      if (!checkDublicates[elem.dataValues.name])
        checkDublicates[elem.dataValues.name] = Number(elem.dataValues.shares)
      else
        checkDublicates[elem.dataValues.name] += Number(elem.dataValues.shares)
    })
    for (let key in checkDublicates) {
      if (checkDublicates.hasOwnProperty(key)) {
        let innerObj = {}
        innerObj.name = key
        innerObj.shares = checkDublicates[key]
        userStocksArr.push(innerObj)
      }
    }
    res.json({user, userStocksArr})
  } catch (err) {
    next(err)
  }
})
