import React from 'react'
import '../styles/CaptionText.css'
const CaptionText = ({caption}) => {
  return (
  <>
    <p className='cutoff-text'>{caption}</p>
    <input className='expand-btn' type='checkbox'/>
  </>
  )
}

export default CaptionText