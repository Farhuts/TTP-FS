import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {userInfo, getUserStocksThunk} from '../store'

class UserHome extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getUserStocksThunkDispatch()
    this.props.userInfoThunk()
  }
  render() {
    let userHomeBalanceClass, shares
    const {userName, balance} = this.props.user
    const today = Date().slice(0, 16)
    const userTransaction = this.props.transactionUserHome.userStocksArr
    const ownStocks =
      userTransaction && userTransaction.length ? (
        userTransaction.map((stock, idx) => {
          if (stock.shares === 1) shares = 'share'
          else shares = 'shares'
          if (idx % 2 === 0) userHomeBalanceClass = 'userHomeBalanceClassGrey'
          else userHomeBalanceClass = 'userHomeBalanceClassStandart'
          return (
            <div className={userHomeBalanceClass} key={stock.name}>
              <img src="assets/stock-icon4.png" />
              <h3>
                {' '}
                {stock.name} - {stock.shares} {shares}
              </h3>
            </div>
          )
        })
      ) : (
        <div>You do not own shares yet</div>
      )
    return (
      <div id="margin-top" className="flex-parentUserHome">
        <div className="flex-childUserHome">
          <h2 className="h2-userHome">
            Welcome {userName}! | Today is {today}
          </h2>
          <h3 className="green">Your current balance is {balance} USD</h3>
          <hr />
          <h3>You own:</h3>
          <h3 className="ownStocksH3">{ownStocks}</h3>
          <div className="user-btns">
            <Link to="/stocks">
              <button className="stockBtn">Buy Stocks</button>
            </Link>
            <Link to="/portfolio">
              <button className="portfolioBtn">Portfolio</button>
            </Link>
            <Link to="/transactions">
              <button className="transactionsBtn">Transactions</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  transactionUserHome: state.transaction
})

const mapDispatch = dispatch => ({
  userInfoThunk: () => dispatch(userInfo()),
  getUserStocksThunkDispatch: () => dispatch(getUserStocksThunk())
})

export default connect(mapState, mapDispatch)(UserHome)
