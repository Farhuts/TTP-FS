const User = require('./user')
const Transaction = require('./transaction')

Transaction.belongsTo(User)
User.hasMany(Transaction)

module.exports = {
  User,
  Transaction
}
