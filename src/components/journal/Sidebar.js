import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'
import { startNewNote } from '../../actions/notes'
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {
  const dispatch = useDispatch()
  const { name } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(startLogout())
  }

  const handleAddNew = () => {
    dispatch(startNewNote())
  }

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="fa-regular fa-moon"></i>
          <span> {name}</span>
        </h3>
        <button className="btn" onClick={handleLogout}>
          Salir
        </button>
      </div>

      <div className="journal__new-entry" onClick={handleAddNew}>
        <i className="fa-regular fa-calendar fa-5x"></i>
        <p className="mt-5">Nueva Entrada</p>
      </div>

      <JournalEntries />
    </aside>
  )
}
