import React, {Component} from 'react'
import {connect} from 'react-redux'
import LoginForm from './login'
import {auth} from '../../store'

class AuthLoginForm extends Component {
  constructor(props) {
    super(props)
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const formName = evt.target.name
    const userInfoLogin = {}
    userInfoLogin.email = evt.target.email.value
    userInfoLogin.password = evt.target.password.value
    this.props.authDispatch(userInfoLogin, formName)
  }

  render() {
    const {error} = this.props
    return (
      <div>
        <LoginForm
          error={error}
          name="login"
          handleSubmit={this.handleSubmit}
          displayName="LOGIN"
        />
      </div>
    )
  }
}

const mapState = state => ({
  error: state.user.error
})

const mapDispatch = dispatch => ({
  authDispatch: (userInfo, formName) => dispatch(auth(userInfo, formName))
})

export default connect(mapState, mapDispatch)(AuthLoginForm)
