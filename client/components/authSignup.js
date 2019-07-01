import React, {Component} from 'react'
import {connect} from 'react-redux'
import SignupForm from './signup'
import {auth} from '../store'

class AuthSignupForm extends Component {
  constructor(props) {
    super(props)
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const formName = evt.target.name
    const userInfoSignup = {}
    userInfoSignup.userName = evt.target.userName.value
    userInfoSignup.email = evt.target.email.value
    userInfoSignup.password = evt.target.password.value
    this.props.authDispatch(userInfoSignup, formName)
  }

  render() {
    const {error} = this.props
    return (
      <div>
        <SignupForm
          error={error}
          name="signup"
          handleSubmit={this.handleSubmit}
          displayName="SIGN UP"
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

export default connect(mapState, mapDispatch)(AuthSignupForm)
