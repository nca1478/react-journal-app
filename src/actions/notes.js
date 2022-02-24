import { db } from '../firebase/firebase-config'
import { types } from '../types/types'

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth // getState: access to state
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    }

    const doc = await db.collection(`${uid}/journal/notes`).add(newNote)

    dispatch(activeNote(doc.id, newNote))
  }
}

export const activeNote = (id, note) => {
  return {
    type: types.notesActive,
    payload: {
      id,
      ...note,
    },
  }
}

export const setNotes = (notes) => {
  return {
    type: types.notesLoad,
    payload: notes,
  }
}
