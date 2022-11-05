import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { Offer } from '../types'

interface Props {
  offer: Offer
}

export const Benefits = ({ offer }: Props) => {
  const isExpired = offer.expiresIn < 0
  const isExpireInLessThanDay = offer.expiresIn / 24 < 1
  const expiresIn = isExpired
    ? 'Expired'
    : !isExpireInLessThanDay
    ? `Expires in ${Math.round(offer.expiresIn)} hours`
    : `Expires in ${Math.round(offer.expiresIn / 24)} days`
  return (
    <Row className='border-top d-flex flex-wrap justify-content-between p-0 p-lg-3'>
      <Container
        style={{ maxWidth: '40%' }}
        className='d-flex align-items-center m-2 ps-0 ps-lg-3'
      >
        <span className='benefit-item d-flex align-items-center justify-content-center'>
          <i className='fa-solid fa-location-dot'></i>
        </span>
        <span className='ms-3'>{offer.company.city}</span>
      </Container>
      <Container
        style={{ maxWidth: '40%' }}
        className='d-flex align-items-center m-2 ps-0 ps-lg-3'
      >
        <span className='benefit-item d-flex align-items-center justify-content-center'>
          <i className='fa-solid fa-clock'></i>
        </span>
        <span
          className={`ms-3${isExpired ? ' text-danger font-weight-bold' : ''}`}
        >
          {expiresIn}
        </span>
      </Container>
      <Container
        style={{ maxWidth: '40%' }}
        className='d-flex align-items-center m-2 ps-0 ps-lg-3'
      >
        <span className='benefit-item d-flex align-items-center justify-content-center'>
          <i className='fa-solid fa-file-invoice'></i>
        </span>
        <span className='ms-3'>{offer.contractType}</span>
      </Container>
      <Container
        style={{ maxWidth: '40%' }}
        className='d-flex align-items-center m-2 ps-0 ps-lg-3'
      >
        <span className='benefit-item d-flex align-items-center justify-content-center'>
          <i className='fa-solid fa-business-time '></i>
        </span>
        <span className='ms-3'>{offer.time}</span>
      </Container>
      <Container
        style={{ maxWidth: '40%' }}
        className='d-flex align-items-center m-2 ps-0 ps-lg-3'
      >
        <span className='benefit-item d-flex align-items-center justify-content-center'>
          <i className='fa-solid fa-chart-line'></i>
        </span>
        <span className='ms-3'>{offer.experience}</span>
      </Container>
      <Container
        style={{ maxWidth: '40%' }}
        className='d-flex align-items-center m-2 ps-0 ps-lg-3'
      >
        <span className='benefit-item d-flex align-items-center justify-content-center'>
          <i className='fa-solid fa-building-user'></i>
        </span>
        <span className='ms-3'>Remote</span>
      </Container>
    </Row>
  )
}
