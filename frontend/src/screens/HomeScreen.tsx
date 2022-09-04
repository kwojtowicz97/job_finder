import React from 'react'
import { ListGroup, Card, Button } from 'react-bootstrap'
import JobOffer from '../components/JobOffer'

const HomeScreen = () => {
  return (
    <>
      <h2>Newest Job Offers</h2>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <JobOffer />
          <JobOffer />
          <JobOffer />
          <JobOffer />
        </ListGroup.Item>
      </ListGroup>
    </>
  )
}

export default HomeScreen
