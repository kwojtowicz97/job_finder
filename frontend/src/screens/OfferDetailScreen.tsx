import React, { useEffect } from 'react'
import { Col, Row, Image, Container } from 'react-bootstrap'
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

const OfferDetailScreen: React.FC = () => {
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()

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
          <>
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
                    <h2 className='d-inline m-0 fs-5'>{offer.company.name}</h2>
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
              <Row>
                <Col className='col-sm-12 col-md-6 border-end p-4 pe-0'>
                  <span className='d-flex'>
                    <span className='benefit-item d-flex align-items-center justify-content-center'>
                      <i className='fa-solid fa-list-check fs-4'></i>
                    </span>
                    <h3 className='mb-3 ms-2 d-inline'>Responsibilities</h3>
                  </span>
                  <ul style={{ listStyleType: 'none', padding: '0' }}>
                    {offer.responsibilities.map((item) => (
                      <li className='my-4'>
                        <span>
                          <i className='fa-solid fa-play me-1' />
                          <p className='d-inline'>{item}</p>
                        </span>
                      </li>
                    ))}
                  </ul>
                </Col>
                <Col className='col-sm-12 col-md-6 p-4 pe-0'>
                  <span className='d-flex'>
                    <span className='benefit-item d-flex align-items-center justify-content-center'>
                      <i className='fa-regular fa-circle-check fs-4'></i>
                    </span>
                    <h3 className='mb-3 ms-2 d-inline'>Requirements</h3>
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
              </Row>
            </Container>
          </>
        )
      )}
    </>
  )
}

export default OfferDetailScreen
