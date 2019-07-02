import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {userInfo} from '../store'

class UserHome extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.userInfoThunk()
  }
  render() {
    const {userName, email, balance} = this.props.user
    return (
      <div id="margin-top" className="flex-parentUserHome">
        <div className="flex-childUserHome">
          <h2 className="h2-userHome">Welcome {userName}!</h2>
          <h3>Your current balance is {balance} USD</h3>
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
  uodatedBalance: state
})

const mapDispatch = dispatch => ({
  userInfoThunk: () => dispatch(userInfo())
})

export default connect(mapState, mapDispatch)(UserHome)
