import React from 'react'
import { Card, Row, Col, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Rating from './Rating'
import { Offer as OfferType } from '../types'
import { off } from 'process'

interface Props {
  offer: OfferType
}

const JobOffer = ({ offer }: Props) => {
  return (
    <Card className='flex-row my-3'>
      <Card.Img className='logo p-3' src='../images/Apple-logo.png' />
      <Card.Body className='ml-auto'>
        <Card.Title>
          <LinkContainer to='/offer/:id'>
            <h2 className='link'>{offer.title}</h2>
          </LinkContainer>
          <LinkContainer to='/company/:id'>
            <span className='link'>{offer.company.name} </span>
          </LinkContainer>
          <Rating value={4.5} />
        </Card.Title>
        <Card.Text>
          <i className='fas fa-location-dot' /> {offer.address}
          <Container>
            <Row>
              <Col sm={12} md={3} className='px-0'>
                <i className='fas fa-file-invoice' /> {offer.contractType}
              </Col>
              <Col sm={12} md={3} className='px-0'>
                <i className='fas fa-clock' /> {offer.time}
              </Col>
              <Col sm={12} md={3} className='px-0'>
                <i className='fas fa-chart-line' /> {offer.experience}
              </Col>
            </Row>
          </Container>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default JobOffer
