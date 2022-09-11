import React from 'react'
import { ListGroup } from 'react-bootstrap'
import JobOffer from '../components/JobOffer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Offer } from '../types'
import { errorHandler } from '../actions/errorHandler'

interface ListOffersResponse {
  offers: Offer[]
  page: number
  pages: number
}

const listOffers = async () => {
  const { data } = await axios.get('/api/offers')
  return data
}

const HomeScreen: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery<
    ListOffersResponse,
    Error
  >(['listOffers'], listOffers)

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{errorHandler(error)}</Message>
      ) : (
        <>
          <h2>Newest Job Offers</h2>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              {data.offers.map((offer) => (
                <JobOffer key={offer._id} offer={offer} />
              ))}
            </ListGroup.Item>
          </ListGroup>
        </>
      )}
    </>
  )
}

export default HomeScreen
