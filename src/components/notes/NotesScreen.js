import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleteNote } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { Footer } from '../journal/Footer'
import { NotesAppBar } from './NotesAppBar'

export const NotesScreen = () => {
  const dispatch = useDispatch()
  const { active: note } = useSelector((state) => state.notes)
  const [formValues, handleInputChange, reset] = useForm(note)
  const { body, title, id } = formValues
  const activeId = useRef(note.id)

  useEffect(() => {
    // when note changes, reset form
    if (note.id !== activeId.current) {
      reset(note)
      activeId.current = note.id
    }
  }, [note, reset])

  useEffect(() => {
    // update activeNote when formValues changes
    dispatch(activeNote(formValues.id, { ...formValues }))
  }, [formValues, dispatch])

  const handleDelete = () => {
    dispatch(startDeleteNote(id))
  }

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          name="title"
          placeholder="Algún título asombroso"
          className="notes__title-input"
          value={title}
          onChange={handleInputChange}
          autoComplete="off"
        />

        <textarea
          name="body"
          placeholder="Que está pasando hoy"
          className="notes__textarea"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {note.url && (
          <div className="notes__image">
            <img src={note.url} alt="note_image" />
          </div>
        )}
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Eliminar
      </button>
      <Footer />
    </div>
  )
}
