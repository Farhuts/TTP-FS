import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {userInfo} from '../store'

import TransactionsList from './transactionsList'

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
      <div>
        <h3>
          Welcome, {email} {userName}
        </h3>
        <h4>Your balance is {balance} USD</h4>
        <Link to="/stocks">
          <button>Explore Stocks</button>
        </Link>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  userInfoThunk: () => dispatch(userInfo())
})

export default connect(mapState, mapDispatch)(UserHome)
