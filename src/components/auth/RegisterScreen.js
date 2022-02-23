import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'

export const RegisterScreen = () => {
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
    if (name.trim().length === 0) {
      console.error('Name is required')
      return false
    } else if (!validator.isEmail(email)) {
      console.error('Email is not valid')
      return false
    } else if (password.length < 1) {
      console.error('Password is required')
      return false
    } else if (password2.length < 1) {
      console.error('Password confirm is required')
      return false
    } else if (password !== password2 || password.length < 5) {
      console.error(
        'Password should be at least 6 characters and match each other'
      )
      return false
    }
    return true
  }

  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form onSubmit={handleRegister}>
        <div className="auth__alert-error">Hola Mundo</div>
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
