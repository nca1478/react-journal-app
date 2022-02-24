import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NotesScreen = () => {
  const { active: note } = useSelector((state) => state.notes)
  const [formValues, handleInputChange, reset] = useForm(note)
  const { body, title } = formValues
  const activeId = useRef(note.id)

  useEffect(() => {
    // when note changes, reset form
    if (note.id !== activeId.current) {
      reset(note)
      activeId.current = note.id
    }
  }, [note, reset])

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          name="title"
          placeholder="Some awesome title"
          className="notes__title-input"
          value={title}
          onChange={handleInputChange}
          autoComplete="off"
        />

        <textarea
          name="body"
          placeholder="What happened today"
          className="notes__textarea"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        {note.url && (
          <div className="notes__image">
            <img
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
              alt="note_image"
            />
          </div>
        )}
      </div>
    </div>
  )
}
