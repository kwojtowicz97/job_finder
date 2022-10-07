import React from 'react'
import { Container } from 'react-bootstrap'

const CvBuilderEducationItem = () => {
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
      <label>Level of education</label>
      <p>
        <b>Bechelor</b>
      </p>
      <label>School</label>
      <p>
        <b>Warsaw University od Technology</b>
      </p>
      <label>Major</label>
      <p>
        <b>Mechanical engineering</b>
      </p>
      <label>Period</label>
      <p>
        <b>2017/10 - 2020/06</b>
      </p>
    </Container>
  )
}

export default CvBuilderEducationItem
