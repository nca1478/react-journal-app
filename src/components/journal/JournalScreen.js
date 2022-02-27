import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NotesScreen } from '../notes/NotesScreen'
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {
  const { active, notes } = useSelector((state) => state.notes)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (notes) {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }, [notes])

  if (loading) {
    return (
      <div className="preloader-container">
        <div className="preloader"></div>
      </div>
    )
  }

  return (
    <div className="journal__main-content animate__animated animate__fadeIn animate__fast">
      <Sidebar />
      <main>{active ? <NotesScreen /> : <NothingSelected />}</main>
    </div>
  )
}
