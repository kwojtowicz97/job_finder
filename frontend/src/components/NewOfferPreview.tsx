import React, { useCallback, useContext } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { userContext } from '../App'
import { Company } from '../types/Company'
import { Benefits } from './Benefits'
import Map from './Map'
import Rating from './Rating'

export interface Refs {
  titleRef: React.RefObject<HTMLElement>
  localizationRef: React.RefObject<HTMLElement>
  expiresInRef: React.RefObject<HTMLElement>
  contractRef: React.RefObject<HTMLElement>
  timeRef: React.RefObject<HTMLElement>
  experienceRef: React.RefObject<HTMLElement>
  locationRef: React.RefObject<HTMLElement>
  responsibilitiesRef: React.RefObject<HTMLElement>
  requirementsRef: React.RefObject<HTMLElement>
  benefitsRef: React.RefObject<HTMLElement>
}

export interface OfferPreview {
  title: string
  address: string
  localization: string
  expiresAt: string
  company: Company
  contractType: string
  time: string
  experience: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  refs: Refs
}

interface Props {
  offer: OfferPreview
}

const NewOfferPreview = ({ offer }: Props) => {
  const { userInfo } = useContext(userContext)

  if (!userInfo) {
    return <p>Error</p>
  }
  if (!userInfo.company) {
    return <p>Error</p>
  }

  return (
    <>
      <Container fluid className='border rounded'>
        <Row>
          <Col
            className='border-end d-flex justify-content-center align-items-center'
            style={{ flex: '0 0 114px' }}
          >
            <Image
              src={userInfo.company.image}
              style={{ width: '80px', height: 'auto' }}
            ></Image>
          </Col>
          <Col className='p-3'>
            <h1
              role='button'
              onClick={() => offer.refs.titleRef!.current?.focus()}
              className='fs-3'
            >
              <b className={!offer.title ? 'text-muted' : ''}>
                {offer.title || 'Offer title'}
              </b>
            </h1>
            <div className='d-flex align-items-center'>
              <LinkContainer
                role='button'
                to={`/company/${userInfo.company._id}`}
              >
                <a className='nav-link d-inline'>
                  <h2 className='d-inline m-0 fs-5'>{userInfo.company.name}</h2>
                </a>
              </LinkContainer>

              <Rating className='ms-2' value={userInfo.company.rating}></Rating>
            </div>
          </Col>
        </Row>
        <Benefits offer={offer} refs={offer.refs} />
        <Row className='border-top print-map'>
          <Map city={offer.address} address='' />
        </Row>
      </Container>
      <Container fluid className=' mt-3 border rounded'>
        <Row className='d-block'>
          <Col className='p-4 pe-0'>
            <span className='d-flex'>
              <span className='benefit-item d-flex align-items-center justify-content-center'>
                <i className='fa-solid fa-list-check fs-5'></i>
              </span>
              <h3
                role='button'
                onClick={() => offer.refs.responsibilitiesRef!.current?.focus()}
                className='mb-3 ms-2 d-inline'
              >
                Responsibilities
              </h3>
            </span>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              {offer.responsibilities.map((item) => (
                <li key={item} className='my-2'>
                  <span>
                    <i className='fa-solid fa-play me-1' />
                    <p className='d-inline'>{item}</p>
                  </span>
                </li>
              ))}
            </ul>
          </Col>
          <Col className='p-4 pe-0 border-top'>
            <span className='d-flex'>
              <span className='benefit-item d-flex align-items-center justify-content-center'>
                <i className='fa-solid fa-id-card fs-5'></i>
              </span>
              <h3
                role='button'
                onClick={() => offer.refs.requirementsRef!.current?.focus()}
                className='mb-3 ms-2 d-inline'
              >
                Requirements
              </h3>
            </span>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              {offer.requirements.map((item) => (
                <li key={item} className='my-2'>
                  <span>
                    <i className='fa-solid fa-play me-1' />
                    <p className='d-inline'>{item}</p>
                  </span>
                </li>
              ))}
            </ul>
          </Col>
          <Col className='p-4 pe-0 border-top'>
            <span className='d-flex'>
              <span className='benefit-item d-flex align-items-center justify-content-center'>
                <i className='fa-regular fa-circle-up fs-5'></i>
              </span>
              <h3
                role='button'
                onClick={() => offer.refs.benefitsRef!.current?.focus()}
                className='mb-3 ms-2 d-inline'
              >
                Benefits
              </h3>
            </span>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              {offer.benefits.map((item) => (
                <li key={item} className='my-2'>
                  <span>
                    <i className='fa-solid fa-play me-1' />
                    <p className='d-inline'>{item}</p>
                  </span>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default NewOfferPreview
