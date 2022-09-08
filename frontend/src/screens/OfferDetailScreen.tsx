import React, { useEffect, useState } from 'react'
import { Col, Row, Image, Container, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AppDispatch } from '../store'
import { ReduxState } from '../types/ReduxState'
import { listOfferDetails } from '../actions/offerActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import Map from '../components/Map'
import { Benefits } from '../components/Benefits'
import SaveIcon from '../components/SaveIcon'

const OfferDetailScreen: React.FC = () => {
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()

  const [isSaved, setIsSaved] = useState(false)

  const saveClickHandler = () => {
    setIsSaved((state) => !state)
  }

  const { offer, loading, error } = useSelector(
    (state: ReduxState) => state.offerDetail
  )

  useEffect(() => {
    params.id && dispatch(listOfferDetails(params.id))
  }, [params.id, dispatch])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
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
                    <Map
                      city={offer.company.city}
                      address={offer.company.address}
                    />
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
                          <li className='my-2'>
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
                          <li className='my-2'>
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
                          <li className='my-2'>
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
                    <Button
                      className='mx-auto p-3 my-4'
                      variant='primary'
                      style={{ maxWidth: '80%' }}
                    >
                      Apply Now
                    </Button>
                  </Row>
                  <Row className='text-center'>
                    <SaveIcon
                      spanClassName='col-6 p-3 border-end d-block'
                      className='black'
                      reverse
                      isSaved={isSaved}
                      onClick={saveClickHandler}
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
