import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { Offer } from '../types'

interface Props {
  offer: Offer
}

export const Benefits = ({ offer }: Props) => {
  return (
    <Row className='border-top d-flex flex-wrap justify-content-between p-3'>
      <Container
        style={{ maxWidth: '30%' }}
        className='d-flex align-items-center m-2'
      >
        <span className='benefit-item d-flex align-items-center justify-content-center'>
          <i className='fa-solid fa-location-dot'></i>
        </span>
        <span className='ms-3'>{offer.company.city}</span>
      </Container>
      <Container
        style={{ maxWidth: '30%' }}
        className='d-flex align-items-center m-2'
      >
        <span className='benefit-item d-flex align-items-center justify-content-center'>
          <i className='fa-solid fa-clock'></i>
        </span>
        <span className='ms-3'>Expires in 20 days</span>
      </Container>
      <Container
        style={{ maxWidth: '30%' }}
        className='d-flex align-items-center m-2'
      >
        <span className='benefit-item d-flex align-items-center justify-content-center'>
          <i className='fa-solid fa-file-invoice'></i>
        </span>
        <span className='ms-3'>{offer.contractType}</span>
      </Container>
      <Container style={{ maxWidth: '30%' }} className='d-flex m-2'>
        <span className='benefit-item d-flex align-items-center justify-content-center'>
          <i className='fa-solid fa-business-time '></i>
        </span>
        <span className='ms-3'>{offer.time}</span>
      </Container>
      <Container
        style={{ maxWidth: '30%' }}
        className='d-flex align-items-center m-2'
      >
        <span className='benefit-item d-flex align-items-center justify-content-center'>
          <i className='fa-solid fa-chart-line'></i>
        </span>
        <span className='ms-3'>{offer.experience}</span>
      </Container>
      <Container
        style={{ maxWidth: '30%' }}
        className='d-flex align-items-center m-2'
      >
        <span className='benefit-item d-flex align-items-center justify-content-center'>
          <i className='fa-solid fa-building-user'></i>
        </span>
        <span className='ms-3'>Remote</span>
      </Container>
    </Row>
  )
}