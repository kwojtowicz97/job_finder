import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { Offer } from '../types'
import { OfferPreview, Refs } from '../components/NewOfferPreview'

interface Props {
  offer: Offer | OfferPreview
  refs?: Refs
}

export const Benefits = ({ offer, refs }: Props) => {
  const expiresInn =
    (new Date(offer.expiresAt!).getTime() - new Date().getTime()) / 3600000
  const isExpired = expiresInn < 0
  const isExpireInLessThanDay = expiresInn / 24 < 1
  const expiresIn = isExpired
    ? 'Expired'
    : !isExpireInLessThanDay
    ? `Expires in ${Math.round(expiresInn / 24)} days`
    : `Expires in ${Math.round(expiresInn)} hours`
  return (
    <Row className='border-top d-flex flex-wrap justify-content-between p-0 p-lg-3'>
      <Container
        role={refs && 'button'}
        onClick={() => refs?.titleRef?.current?.focus()}
        style={{ maxWidth: '40%' }}
        className='d-flex align-items-center m-2 ps-0 ps-lg-3'
      >
        <span className='benefit-item d-flex align-items-center justify-content-center'>
          <i className={`fa-solid fa-location-dot `}></i>
        </span>
        <span className={`ms-3 ${!offer.address ? 'text-muted' : ''}`}>
          {offer.address || 'Address'}
        </span>
      </Container>
      <Container
        role={refs && 'button'}
        onClick={() => refs?.expiresInRef?.current?.focus()}
        style={{ maxWidth: '40%' }}
        className='d-flex align-items-center m-2 ps-0 ps-lg-3'
      >
        <span className='benefit-item d-flex align-items-center justify-content-center'>
          <i className='fa-solid fa-clock'></i>
        </span>
        <span className={`ms-3 ${!expiresInn ? 'text-muted' : ''}`}>
          {expiresInn ? expiresIn : 'Expires in'}
        </span>
      </Container>
      <Container
        role={refs && 'button'}
        onClick={() => refs?.contractRef?.current?.focus()}
        style={{ maxWidth: '40%' }}
        className='d-flex align-items-center m-2 ps-0 ps-lg-3'
      >
        <span className='benefit-item d-flex align-items-center justify-content-center'>
          <i className='fa-solid fa-file-invoice'></i>
        </span>
        <span className={`ms-3 ${!offer.contractType ? 'text-muted' : ''}`}>
          {offer.contractType || 'Contract type'}
        </span>
      </Container>
      <Container
        role={refs && 'button'}
        onClick={() => refs?.timeRef?.current?.focus()}
        style={{ maxWidth: '40%' }}
        className='d-flex align-items-center m-2 ps-0 ps-lg-3'
      >
        <span className='benefit-item d-flex align-items-center justify-content-center'>
          <i className='fa-solid fa-business-time '></i>
        </span>
        <span className={`ms-3 ${!offer.time ? 'text-muted' : ''}`}>
          {offer.time || 'Time'}
        </span>
      </Container>
      <Container
        role={refs && 'button'}
        onClick={() => refs?.experienceRef?.current?.focus()}
        style={{ maxWidth: '40%' }}
        className='d-flex align-items-center m-2 ps-0 ps-lg-3'
      >
        <span className='benefit-item d-flex align-items-center justify-content-center'>
          <i className='fa-solid fa-chart-line'></i>
        </span>
        <span className={`ms-3 ${!offer.experience ? 'text-muted' : ''}`}>
          {offer.experience || 'Experience'}
        </span>
      </Container>
      <Container
        role={refs && 'button'}
        onClick={() => refs?.localizationRef?.current?.focus()}
        style={{ maxWidth: '40%' }}
        className='d-flex align-items-center m-2 ps-0 ps-lg-3'
      >
        <span className='benefit-item d-flex align-items-center justify-content-center'>
          <i className='fa-solid fa-building-user'></i>
        </span>
        <span className={`ms-3 ${!offer.localization ? 'text-muted' : ''}`}>
          {offer.localization || 'Location'}
        </span>
      </Container>
    </Row>
  )
}
