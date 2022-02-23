import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'

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
    console.log(name, email, password, password2)
  }

  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form onSubmit={handleRegister}>
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
