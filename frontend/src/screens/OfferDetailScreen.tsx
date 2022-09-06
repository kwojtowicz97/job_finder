import React, { useEffect } from 'react'
import { Col, Row, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { AppDispatch } from '../store'
import { ReduxState } from '../types/ReduxState'
import { listOfferDetails } from '../actions/offerActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

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
          <>
            <Row>
              <Col>
                <Image src={offer.company.image}></Image>
              </Col>
              <Col></Col>
            </Row>
            <Row></Row>
          </>
        )
      )}
    </>
  )
}

export default OfferDetailScreen
