import React from 'react'
import history from '../history'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import AllStocks from './allStocks'

export const UserHome = props => {
  const {email, userName, balance} = props

  return (
    <div>
      <h3>
        Welcome, {email} {userName}
      </h3>
      <h4>Your balance is {balance}USD</h4>
      <Link to="/stocks">
        <button>Explore Stocks</button>
      </Link>
    </div>
  )
}

const mapState = state => ({
  email: state.user.email,
  userName: state.user.userName,
  balance: state.user.balance
})

export default connect(mapState)(UserHome)
