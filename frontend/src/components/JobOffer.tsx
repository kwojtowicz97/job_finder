import React from 'react'
import { Card, Row, Col, Image, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Rating from './Rating'

const JobOffer = () => {
  return (
    <Card className='flex-row my-3'>
      <Card.Img
        className='logo p-3'
        src={require('../images/Apple-logo.png')}
      />
      <Card.Body className='ml-auto'>
        <Card.Title>
          <LinkContainer to='/offer/:id'>
            <h2 className='offer-link'>Inżynier ds. Sprzedaży</h2>
          </LinkContainer>
          Apple Inc. <Rating value={4.5} />
        </Card.Title>
        <Card.Text>
          <i className='fas fa-location-dot' /> Cupertino, LA
          <Container>
            <Row>
              <Col sm={12} md={3} className='px-0'>
                <i className='fas fa-file-invoice' /> Contract Of Employment
              </Col>
              <Col sm={12} md={3} className='px-0'>
                <i className='fas fa-clock' /> Full Time
              </Col>
              <Col sm={12} md={3} className='px-0'>
                <i className='fas fa-chart-line' /> Manager
              </Col>
            </Row>
          </Container>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default JobOffer
