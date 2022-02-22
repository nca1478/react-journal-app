import React from 'react'
import { Link } from 'react-router-dom'

export const RegisterScreen = () => {
  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form>
        <input
          type="text"
          className="auth__input"
          placeholder="Name"
          name="name"
          autoComplete="off"
        />

        <input
          type="text"
          className="auth__input"
          placeholder="Email"
          name="email"
          autoComplete="off"
        />

        <input
          type="password"
          className="auth__input"
          placeholder="Password"
          name="password"
        />

        <input
          type="password"
          className="auth__input"
          placeholder="Confirm password"
          name="password2"
        />

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link to="/auth/login" className="link">
          Already registered?
        </Link>
      </form>
    </>
  )
}
