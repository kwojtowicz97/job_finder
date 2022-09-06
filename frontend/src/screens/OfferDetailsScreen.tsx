import React, { useEffect } from 'react'
import { Button, Col, ListGroup, Row } from 'react-bootstrap'
import JobOffer from '../components/JobOffer'
import { useDispatch, useSelector } from 'react-redux'
import { listOfferDetails } from '../actions/offerActions'
import { AppDispatch } from '../store'
import { ReduxState } from '../types/ReduxState'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

const OfferDetailsScreen = () => {
  const dispatch = useDispatch<AppDispatch>()
  const params = useParams()

  useEffect(() => {
    if (params._id) {
      dispatch(listOfferDetails(params._id))
    }
  }, [dispatch])

  const { loading, error } = useSelector(
    (state: ReduxState) => state.offerDetails
  )

  return (
    <>
      <LinkContainer to='/'>
        <Button variant='primary'>Go Back</Button>
      </LinkContainer>
      <Row>
        <Col></Col>
        <Col></Col>
      </Row>
    </>
  )
}

export default OfferDetailsScreen
