import React from 'react'

const SignupForm = ({displayName, handleSubmit, name, error}) => {
  return (
    <div className="flex">
      <form
        className="auth-form"
        id="signup"
        onSubmit={handleSubmit}
        name={name}
      >
        <label htmlFor="userName">
          <small>Name</small>
        </label>
        <input name="userName" type="text" required />
        <label htmlFor="email">
          <small>Email</small>
        </label>
        <input name="email" type="text" required />
        <label htmlFor="password">
          <small>Password</small>
        </label>
        <input name="password" type="password" required />
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
export default SignupForm
