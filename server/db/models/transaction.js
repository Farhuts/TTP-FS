const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transactions', {
  symbol: {
    type: Sequelize.STRING
  },
  shares: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
  date: {
    type: Sequelize.STRING
  }
})

module.exports = Transaction
