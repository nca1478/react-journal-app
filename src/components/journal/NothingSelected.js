import React from 'react'
import { Footer } from './Footer'

export const NothingSelected = () => {
  return (
    <>
      <div className="nothing__main-content">
        <p>
          Seleccionar algo
          <br />o crear una entrada!
        </p>

        <i className="fa-regular fa-star fa-4x mt-5"></i>
      </div>
      <Footer />
    </>
  )
}
