import React from 'react'
import { Container } from 'react-bootstrap'

const CvBuilderLanguageItem = () => {
  return (
    <Container className='border rounded p-3 my-1'>
      <Container fluid className='d-flex justify-content-end'>
        <i
          role='button'
          className='job-experience-item-button fa-solid fa-pen-to-square'
        ></i>
        <i
          role='button'
          className='job-experience-item-button fa-solid fa-trash ms-3'
        ></i>
      </Container>
      <label>Language</label>
      <p>
        <b>English</b>
      </p>
      <label>Level</label>
      <p>
        <b>Advanced (C1)</b>
      </p>
    </Container>
  )
}

export default CvBuilderLanguageItem
