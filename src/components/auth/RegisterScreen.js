import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { removeError, setError } from '../../actions/ui'
import { useDispatch, useSelector } from 'react-redux'

export const RegisterScreen = () => {
  const dispatch = useDispatch()
  const { msgError } = useSelector((state) => state.ui)
  const [formValues, handleInputChange] = useForm({
    name: '',
    email: '',
    password: '',
    password2: '',
  })
  const { name, email, password, password2 } = formValues
  const nameRef = useRef()

  useEffect(() => {
    nameRef.current.focus()
  }, [])

  const handleRegister = (e) => {
    e.preventDefault()

    if (isFormValid()) {
      console.log('Correct Form')
    }
  }

  const isFormValid = () => {
    let error = ''
    if (name.trim().length === 0) {
      error = 'Name is required'
    } else if (!validator.isEmail(email)) {
      error = 'Email is not valid'
    } else if (password.trim().length < 1) {
      error = 'Password is required'
    } else if (password2.trim().length < 1) {
      error = 'Password confirm is required'
    } else if (password !== password2 || password.length < 5) {
      error = 'Password should be at least 6 characters and match each other'
    }

    if (error.length > 0) {
      dispatch(setError(error))
      return false
    }

    dispatch(removeError())
    return true
  }

  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form onSubmit={handleRegister}>
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <input
          type="text"
          className="auth__input"
          placeholder="Name"
          name="name"
          ref={nameRef}
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />

        <input
          type="text"
          className="auth__input"
          placeholder="Email"
          name="email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />

        <input
          type="password"
          className="auth__input"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />

        <input
          type="password"
          className="auth__input"
          placeholder="Confirm password"
          name="password2"
          value={password2}
          onChange={handleInputChange}
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
