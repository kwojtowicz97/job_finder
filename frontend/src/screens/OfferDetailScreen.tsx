import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Col, Row, Image, Container, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import Map from '../components/Map'
import { Benefits } from '../components/Benefits'
import SaveIcon from '../components/SaveIcon'
import axios from 'axios'
import { Offer } from '../types'
import { errorHandler } from '../utils/errorHandler'
import { userContext } from '../App'
import { LinkContainer } from 'react-router-bootstrap'

const listOfferDetails = async (id: string) => {
  const { data } = await axios.get(`/api/offers/${id}`)
  return data
}

const OfferDetailScreen: React.FC = () => {
  const params = useParams()

  const { userInfo, setUserInfo } = useContext(userContext)

  const {
    data: dataFavourite,
    isSuccess: isSuccessFavourite,
    mutateAsync: mutateAsyncFavourite,
  } = useMutation(async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/users/favourites/${offer!._id}`,
      {},
      config
    )
    return data
  })

  useEffect(() => {
    if (isSuccessFavourite) {
      setUserInfo!(dataFavourite)
    }
  }, [isSuccessFavourite])

  const {
    data: offer,
    isLoading,
    isError,
    error,
  } = useQuery<Offer, Error>(
    [`listOfferDetails:${params.id || undefined}`],
    () => listOfferDetails(params.id || '')
  )

  const MapCallback = useCallback(() => {
    if (offer) {
      return <Map city={offer.company.city} address={offer.company.address} />
    }
    return null
  }, [offer])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{errorHandler(error)}</Message>
      ) : (
        offer && (
          <Container>
            <Row>
              <Col className='col-12 col-md-8'>
                {' '}
                <Container fluid className='border rounded'>
                  <Row>
                    <Col
                      className='border-end d-flex justify-content-center align-items-center'
                      style={{ flex: '0 0 114px' }}
                    >
                      <Image
                        src={offer.company.image}
                        style={{ width: '80px', height: 'auto' }}
                      ></Image>
                    </Col>
                    <Col className='p-3'>
                      <h1 className='fs-3'>
                        <b>{offer.title}</b>
                      </h1>
                      <div className='d-flex align-items-center'>
                        <h2 className='d-inline m-0 fs-5'>
                          {offer.company.name}
                        </h2>
                        <Rating value={offer.company.rating}></Rating>
                      </div>
                    </Col>
                  </Row>
                  <Benefits offer={offer} />
                  <Row className='border-top'>
                    <MapCallback />
                  </Row>
                </Container>
                <Container fluid className=' mt-3 border rounded'>
                  <Row className='d-block'>
                    <Col className='p-4 pe-0'>
                      <span className='d-flex'>
                        <span className='benefit-item d-flex align-items-center justify-content-center'>
                          <i className='fa-solid fa-list-check fs-5'></i>
                        </span>
                        <h3 className='mb-3 ms-2 d-inline'>Responsibilities</h3>
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
                        <h3 className='mb-3 ms-2 d-inline'>Requirements</h3>
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
                        <h3 className='mb-3 ms-2 d-inline'>We Offer</h3>
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
              </Col>
              <Col className='col-12 col-md-4'>
                <Container
                  fluid
                  className='border rounded position-sticky'
                  style={{ top: '24px' }}
                >
                  <Row className='border-bottom'>
                    <LinkContainer
                      style={{ maxWidth: '80%' }}
                      to={`/apply/${offer._id}`}
                    >
                      <Button className='mx-auto p-3 my-4' variant='primary'>
                        Apply Now
                      </Button>
                    </LinkContainer>
                  </Row>
                  <Row className='text-center'>
                    <SaveIcon
                      spanClassName='col-6 p-3 border-end d-block'
                      className='black'
                      reverse
                      isSaved={
                        userInfo?.saved.includes(String(offer._id)) || isLoading
                      }
                      onClick={mutateAsyncFavourite}
                    />
                    <Col className='p-3 offer-sidebar-button'>
                      <span>
                        <i className='fa-solid fa-print ' />
                        <p className='d-inline'> Print</p>
                      </span>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        )
      )}
    </>
  )
}

export default OfferDetailScreen
