import React from 'react'

const LoginForm = ({displayName, handleSubmit, name, error}) => {
  return (
    <div className="flex">
      <form
        className="auth-form"
        id="login"
        onSubmit={handleSubmit}
        name={name}
      >
        <label htmlFor="email">
          <small>Email</small>
        </label>
        <input name="email" type="text" />
        <label htmlFor="password">
          <small>Password</small>
        </label>
        <input name="password" type="password" />
        <button className="displayNameBtn" type="submit">
          {displayName}
        </button>
        {error &&
          error.response && (
            <div className="loginError"> {error.response.data} </div>
          )}
      </form>
    </div>
  )
}
export default LoginForm
