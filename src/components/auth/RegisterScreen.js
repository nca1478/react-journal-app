import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { useForm } from '../../hooks/useForm'
import { removeError, setError } from '../../actions/ui'
import { startRegisterWithEmailPasswordName } from '../../actions/auth'

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
      dispatch(startRegisterWithEmailPasswordName(email, password, name))
    }
  }

  const isFormValid = () => {
    let error = ''
    if (name.trim().length === 0) {
      error = 'Nombre es requerido'
    } else if (!validator.isEmail(email)) {
      error = 'Email no es válido'
    } else if (password.trim().length < 1) {
      error = 'Contraseña es requerida'
    } else if (password2.trim().length < 1) {
      error = 'Contraseña2 es requerida'
    } else if (password !== password2 || password.length < 5) {
      error =
        'La contraseña debe tener al menos 6 caracteres y coincidir entre sí'
    }

    if (error.length > 0) {
      dispatch(setError(error))
      return false
    }

    dispatch(removeError())
    return true
  }

  return (
    <div className="animate__animated animate__fadeIn animate__fast">
      <h3 className="auth__title text-center">Crear una cuenta</h3>
      <form onSubmit={handleRegister}>
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <input
          type="text"
          className="auth__input"
          placeholder="Nombre"
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
          placeholder="Contraseña"
          name="password"
          value={password}
          onChange={handleInputChange}
        />

        <input
          type="password"
          className="auth__input"
          placeholder="Confirmar Contraseña"
          name="password2"
          value={password2}
          onChange={handleInputChange}
        />

        <button type="submit" className="btn btn-primary btn-block mb-5">
          Registrar
        </button>

        <Link to="/auth/login" className="link">
          ¿Ya está registrado?
        </Link>
      </form>
    </div>
  )
}
