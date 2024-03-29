import Swal from 'sweetalert2'
import { db } from '../firebase/firebase-config'
import { fileUpload } from '../helpers/fileUpload'
import { loadNotes } from '../helpers/loadNotes'
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
    dispatch(addNewNote(doc.id, newNote))
  }
}

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid) // load notes from firebase (helper)
    dispatch(setNotes(notes)) // set notes to store
  }
}

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth

    if (!note.url) {
      delete note.url
    }

    const noteToFirestore = { ...note }
    delete noteToFirestore.id

    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore)
    dispatch(refreshNote(note.id, note))

    Swal.fire({
      icon: 'success',
      title: 'La nota ha sido guardada',
      timer: 2000,
    })
  }
}

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes

    Swal.fire({
      title: 'Subiendo...',
      text: 'Por favor espere...',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading()
      },
    })

    const fileUrl = await fileUpload(file)
    activeNote.url = fileUrl
    dispatch(startSaveNote(activeNote))

    Swal.close()
  }
}

export const startDeleteNote = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid

    await db.doc(`${uid}/journal/notes/${id}`).delete()
    dispatch(deleteNote(id))
  }
}

export const addNewNote = (id, note) => {
  return {
    type: types.notesAddNew,
    payload: { id, ...note },
  }
}

export const deleteNote = (id) => {
  return {
    type: types.notesDelete,
    payload: id,
  }
}

export const refreshNote = (id, note) => {
  return {
    type: types.notesUpdated,
    payload: { id, note: { id, ...note } },
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

export const noteLogout = () => {
  return {
    type: types.notesLogoutCleaning,
  }
}
