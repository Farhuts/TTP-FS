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
    const findStock = await Transaction.findOne({
      where: {userId}
    })

    console.log('findStock======>', findStock.shares)

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

router.get('/transactions', async (req, res, next) => {
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
    const portfolioStocks = []
    const allTransactions = await Transaction.findAll({
      where: {userId},
      attributes: ['symbol', 'shares']
    })
    const checkDublicates = {}
    allTransactions.map(stock => {
      if (!checkDublicates[stock.dataValues.symbol])
        checkDublicates[stock.dataValues.symbol] = Number(
          stock.dataValues.shares
        )
      else
        checkDublicates[stock.dataValues.symbol] += Number(
          stock.dataValues.shares
        )
    })

    for (let key in checkDublicates) {
      if (checkDublicates.hasOwnProperty(key)) {
        let innerObj = {}
        innerObj.symbol = key
        innerObj.shares = checkDublicates[key]
        portfolioStocks.push(innerObj)
      }
    }
    console.log('portfolioStocks', portfolioStocks)
    res.json({allTransactions, portfolioStocks})
  } catch (err) {
    next(err)
  }
})
