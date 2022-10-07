import React from 'react'
import { Container } from 'react-bootstrap'

const CvBuilderExperienceItem = () => {
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
      <label>Period</label>
      <p>
        <b>2021/08 - 2022/08</b>
      </p>
      <label>Position</label>
      <p>
        <b>Maintenance engineer</b>
      </p>
      <label>Company</label>
      <p>
        <b>Ferrero Poland</b>
      </p>
      <label>Location</label>
      <p>
        <b>05-622 Belsk Duży, ul. Szkolna 6</b>
      </p>
      <label>Description</label>
      <p>
        <b>
          -Project implementation: "Analysis of the operation of rolling mill
          bearings with a central lubrication system installed. Determination of
          diagnostic and lubrication procedures."
          <br />
          -Participate in diagnosing bearings and other machine parts using
          vibration, ultrasonic and temperature measurements.
          <br />
          -Developing test reports. <br />
          -Determining lubricant dosages for individual bearings. <br />
          -Determining central lubrication pump settings and progressive
          distributor configurations.
        </b>
      </p>
    </Container>
  )
}

export default CvBuilderExperienceItem
