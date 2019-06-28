const router = require('express').Router()
const {User, Transaction} = require('../db/models')
module.exports = router

router.post('/stocks', async (req, res, next) => {
  try {
    const symbol = req.body.symbol
    const shares = req.body.shares
    const price = req.body.price
    const date = req.body.date
    const userId = req.body.userId
    console.log('SHARES', shares)
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
      userId
    })
    res.json({updateUserBalance, transactionDetails})
  } catch (err) {
    next(err)
  }
})
