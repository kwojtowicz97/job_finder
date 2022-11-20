import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import JobOffer from '../components/JobOffer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Offer } from '../types'
import { errorHandler } from '../utils/errorHandler'
import SearchBar from '../components/SearchBar'
import ReactDOM from 'react-dom'
import Pagination from '../components/Pagination'

interface ListOffersResponse {
  offers: Offer[]
  page: number
  pages: number
}

interface Props {
  portalContainer: React.RefObject<HTMLElement>
}

const HomeScreen = ({ portalContainer }: Props) => {
  const [position, setPosition] = useState<string | undefined>('')
  const [location, setLocation] = useState<string | undefined>('')
  const [refetchTrigger, setRefetchTrigger] = useState(false)
  const [showResetButton, setShowResetButton] = useState(false)

  const queryClient = useQueryClient()

  const [pageNumber, setPageNumber] = useState(1)

  const listOffers = async (
    position: string | undefined,
    location: string | undefined
  ) => {
    const { data } = await axios.get(
      `/api/offers/?position=${position}&location=${location}&pageNumber=${pageNumber}`
    )
    return data
  }

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery<
    ListOffersResponse,
    Error
  >([`listOffers`, refetchTrigger], () => listOffers(position, location))

  useEffect(() => {
    refetch()
    window.scrollTo(0, 0)
  }, [pageNumber])

  const resetFiltersHandler = () => {
    setPosition('')
    setLocation('')
    setShowResetButton(false)
    setRefetchTrigger((state) => !state)
  }

  return (
    <>
      {portalContainer.current &&
        ReactDOM.createPortal(
          <SearchBar
            searchBarProps={{ position, location, setPosition, setLocation }}
            refetch={refetch}
            setShowButton={setShowResetButton}
          />,
          portalContainer.current!
        )}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{errorHandler(error)}</Message>
      ) : (
        <>
          <h2>Newest Job Offers</h2>
          {showResetButton && (
            <Button onClick={resetFiltersHandler} className='my-2'>
              Reset filters
            </Button>
          )}
          {isLoading || isFetching ? (
            <Loader />
          ) : isError ? (
            <Message variant='danger'>{errorHandler(error)}</Message>
          ) : (
            <>
              <ListGroup variant='flush'>
                <ListGroup.Item className='p-0 p-lg-3'>
                  {data.offers.map((offer) => (
                    <JobOffer key={offer._id} offer={offer} />
                  ))}
                </ListGroup.Item>
              </ListGroup>
              <Pagination
                totalPagesCount={data.pages}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
              />
            </>
          )}
        </>
      )}
    </>
  )
}

export default HomeScreen
