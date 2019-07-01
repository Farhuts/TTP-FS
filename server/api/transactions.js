const router = require('express').Router()
const {User, Transaction} = require('../db/models')
module.exports = router

router.post('/stocks', async (req, res, next) => {
  try {
    const symbol = req.body.symbol
    const name = req.body.name
    const shares = req.body.shares
    const price = req.body.price
    const date = req.body.date
    const userId = req.body.userId

    const findUser = await User.findOne({
      where: {id: userId}
    })

    let newBalance = findUser.balance - shares * price
    let updateUserBalance = await findUser.update({
      id: userId,
      balance: newBalance
    })
    const transactionDetails = await Transaction.create({
      symbol,
      shares,
      price,
      date,
      userId,
      name
    })
    res.json({updateUserBalance, transactionDetails})
  } catch (err) {
    next(err)
  }
})

router.get('/all', async (req, res, next) => {
  try {
    const userId = req.user.id
    const allTransactions = await Transaction.findAll({
      where: {userId}
    })
    res.json(allTransactions)
  } catch (err) {
    next(err)
  }
})

router.get('/portfolio', async (req, res, next) => {
  try {
    const userId = req.user.id
    const allTransactions = await Transaction.findAll({
      where: {userId},
      attributes: ['symbol', 'shares', 'price', 'date']
    })
    res.json(allTransactions)
  } catch (err) {
    next(err)
  }
})
