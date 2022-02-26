import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { activeNote } from '../../actions/notes'
import noImage from '../../assets/img/no-image.jpg'

export const JournalEntry = (note) => {
  const { id, date, title, body, url } = note
  const dispatch = useDispatch()
  const noteDate = moment(date)

  const handleEntryClick = () => {
    dispatch(activeNote(id, note))
  }

  return (
    <div
      className="journal__entry pointer animate__animated animate__fadeIn animate__fast"
      onClick={handleEntryClick}
    >
      <div
        className="journal__entry-picture"
        style={{ backgroundImage: `url(${url ? url : noImage})` }}
      ></div>
      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>

      <div className="journal__entry-date-box">
        <span>{noteDate.format('dddd')}</span>
        <h4>{noteDate.format('Do')}</h4>
      </div>
    </div>
  )
}
