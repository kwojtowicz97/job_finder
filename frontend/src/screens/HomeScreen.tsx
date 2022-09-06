import React, { useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'
import JobOffer from '../components/JobOffer'
import { useDispatch, useSelector } from 'react-redux'
import { listOffers } from '../actions/offerActions'
import { AppDispatch } from '../store'
import { ReduxState } from '../types/ReduxState'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { offers, loading, error } = useSelector(
    (state: ReduxState) => state.offerList
  )

  useEffect(() => {
    dispatch(listOffers())
  }, [dispatch])

  return (
    <>
      <h2>Newest Job Offers</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <ListGroup variant='flush'>
          <ListGroup.Item>
            {offers.map((offer) => (
              <JobOffer key={offer._id} offer={offer} />
            ))}
          </ListGroup.Item>
        </ListGroup>
      )}
    </>
  )
}

export default HomeScreen
