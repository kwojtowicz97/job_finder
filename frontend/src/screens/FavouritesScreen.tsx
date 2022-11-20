import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import { ListGroup } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { userContext } from '../App'
import JobOffer from '../components/JobOffer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Offer } from '../types'
import { errorHandler } from '../utils/errorHandler'

type FetchedData = { offers: Offer[]; page: number; pages: number }

const FavouritesScreen = () => {
  const { userInfo } = useContext(userContext)
  const { isLoading, isError, error, data } = useQuery<any, Error, FetchedData>(
    ['listOffers'],
    async () => {
      const { data } = await axios.get('/api/offers/all')
      return data
    }
  )

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{errorHandler(error)}</Message>
      ) : (
        <>
          <h2>Favourites</h2>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <Message variant='danger'>{errorHandler(error)}</Message>
          ) : (
            <>
              <Helmet>
                <title>Job finder - Saved job offers</title>
              </Helmet>
              {userInfo && userInfo.saved.length > 0 ? (
                <ListGroup variant='flush'>
                  <ListGroup.Item className='p-0 p-lg-3'>
                    {data.offers
                      .filter((offer) => userInfo?.saved.includes(offer._id))
                      .map((offer) => (
                        <JobOffer key={offer._id} offer={offer} />
                      ))}
                  </ListGroup.Item>
                </ListGroup>
              ) : (
                <Message className='my-3' variant='info'>
                  You don't have any favourites job offers yet.
                </Message>
              )}
            </>
          )}
        </>
      )}
    </>
  )
}

export default FavouritesScreen
