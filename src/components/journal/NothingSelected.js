import React from 'react'
import { Footer } from './Footer'

export const NothingSelected = () => {
  return (
    <>
      <div className="nothing__main-content">
        <p>
          Select something
          <br />
          or create an entry!
        </p>

        <i className="fa-regular fa-star fa-4x mt-5"></i>
      </div>
      <Footer />
    </>
  )
}
