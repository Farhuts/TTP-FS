import React, {Component} from 'react'
import {getTransactionsThunk} from '../store'
import {connect} from 'react-redux'

class TransactionsList extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getTransactionsThunk()
  }
  render() {
    const transacHistory = this.props.userTransactions.length ? (
      this.props.userTransactions.map(history => (
        <div key={history.id}>
          <h3>
            BUY symbol: {history.symbol}, shares - qty{history.shares}, ${(
              history.price * history.shares
            ).toFixed(2)}
          </h3>
          <h3>bought: {history.date}</h3>
        </div>
      ))
    ) : (
      <div>
        <h2>You don't have transactions yet</h2>
      </div>
    )
    return (
      <div id="margin-top">
        <h1>TRANSACTIONS</h1>
        {transacHistory}
      </div>
    )
  }
}
const mapState = state => ({
  userTransactions: state.transaction
})

const mapDispatch = dispatch => ({
  getTransactionsThunk: () => dispatch(getTransactionsThunk())
})

export default connect(mapState, mapDispatch)(TransactionsList)
