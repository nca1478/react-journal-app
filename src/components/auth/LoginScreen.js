import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {
  const dispatch = useDispatch() // hook for execute actions
  const { loading } = useSelector((state) => state.ui) // hook for access to store
  const [formValues, handleInputChange] = useForm({
    email: '',
    password: '',
  })
  const { email, password } = formValues
  const emailRef = useRef()

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(startLoginEmailPassword(email, password))
  }

  const handleHandleGoogleLogin = () => {
    dispatch(startGoogleLogin())
  }

  return (
    <div className="animate__animated animate__fadeIn animate__fast">
      <h2 className="auth__title text-center">Journal App</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          className="auth__input"
          placeholder="Ingrese email"
          name="email"
          ref={emailRef}
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />

        <input
          type="password"
          className="auth__input"
          placeholder="Ingrese contraseña"
          name="password"
          value={password}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          Login
        </button>

        <div className="auth__social-networks">
          <div className="google-btn" onClick={handleHandleGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Login con Google</b>
            </p>
          </div>
        </div>

        <Link to="/auth/register" className="link">
          Crear nueva cuenta
        </Link>
      </form>
    </div>
  )
}
