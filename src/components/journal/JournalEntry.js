import React from 'react'

export const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: 'cover',
          backgroundImage:
            'url(https://cdn.pixabay.com/photo/2018/08/20/20/00/sky-3619815_1280.jpg)',
        }}
      ></div>
      <div className="journal__entry-body">
        <p className="journal__entry-title">New Day</p>
        <p className="journal__entry-content">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
          sequi.
        </p>
      </div>

      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>28</h4>
      </div>
    </div>
  )
}
