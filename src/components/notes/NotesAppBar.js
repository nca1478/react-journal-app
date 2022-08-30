import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes'
import moment from 'moment'

export const NotesAppBar = () => {
  const dispatch = useDispatch()
  const { active } = useSelector((state) => state.notes)
  const noteDate = moment(active.date)

  const handleSave = () => {
    dispatch(startSaveNote(active))
  }

  const handlePictureUpload = () => {
    document.querySelector('#fileSelector').click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      dispatch(startUploading(file))
    }
  }

  return (
    <div className="notes__appbar">
      <span>{noteDate.format('LL')}</span>

      <input
        type="file"
        name="file"
        id="fileSelector"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <div>
        <button className="btn" onClick={handlePictureUpload}>
          Subir Foto
        </button>

        <button className="btn" onClick={handleSave}>
          Guardar
        </button>
      </div>
    </div>
  )
}
