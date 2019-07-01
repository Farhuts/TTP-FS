import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {
  AuthLoginForm,
  AuthSignupForm,
  UserHome,
  AllStocks,
  TransactionsList,
  OwnedStocks
} from './components'
import {me} from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        <Route exact path="/login" component={AuthLoginForm} />
        <Route exact path="/signup" component={AuthSignupForm} />
        {isLoggedIn && (
          <Switch>
            <Route path="/home" component={UserHome} />
            <Route path="/stocks" component={AllStocks} />
            <Route path="/all" component={TransactionsList} />
            <Route path="/portfolio" component={OwnedStocks} />
          </Switch>
        )}
        <Route component={AuthLoginForm} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))
