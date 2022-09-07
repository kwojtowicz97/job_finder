import React, { useEffect } from 'react'
import { Col, Row, Image, Container, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AppDispatch } from '../store'
import { ReduxState } from '../types/ReduxState'
import { listOfferDetails } from '../actions/offerActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import Map from '../components/Map'

const OfferDetailScreen: React.FC = () => {
  const params = useParams()
  const dispatch = useDispatch<AppDispatch>()

  const { offer, loading, error } = useSelector(
    (state: ReduxState) => state.offerDetail
  )

  useEffect(() => {
    params.id && dispatch(listOfferDetails(params.id))
  }, [params.id, dispatch, listOfferDetails])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        offer && (
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
            <Row className='border-top d-flex flex-wrap justify-content-between'>
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
            <Row className='border-top'>
              <Map city={offer.company.city} address={offer.company.address} />
            </Row>
          </Container>
        )
      )}
    </>
  )
}

export default OfferDetailScreen
