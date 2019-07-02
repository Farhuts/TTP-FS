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
    let date
    const transacHistory = this.props.userTransactions.length ? (
      this.props.userTransactions.map(history => {
        if (history.createdAt) date = history.createdAt.slice(0, 10)
        return (
          <div key={history.id}>
            <tbody>
              <tr>
                <td>{history.symbol}</td>
                <td>{history.name}</td>
                <td>{history.shares}</td>
                <td>$ {(history.price * history.shares).toFixed(2)}</td>
                <td>{date}</td>
              </tr>
            </tbody>
          </div>
        )
      })
    ) : (
      <div className="H2transaction">
        <h2>You have no transactions yet.</h2>
      </div>
    )
    return (
      <div id="margin-top">
        <h1 className="h1portfolio">TRANSACTION HISTORY</h1>
        <div className="transactions-flex">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Company Name</th>
                  <th>Shares</th>
                  <th>Price</th>
                  <th>Date</th>
                </tr>
              </thead>
              {transacHistory}
            </table>
          </div>
        </div>
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
