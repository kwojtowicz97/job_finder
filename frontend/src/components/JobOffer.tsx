import React, { useState } from 'react'
import { Card, Row, Col, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Rating from './Rating'
import { Offer as OfferType } from '../types'
import { off } from 'process'

interface Props {
  offer: OfferType
}

const JobOffer = ({ offer }: Props) => {
  const [isSaved, setIsSaved] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const clickHandler = () => {
    setIsSaved((state) => !state)
  }
  return (
    <Card className='flex-row my-3'>
      <Card.Img
        className='logo m-3 p-0 align-self-start align-self-md-center'
        src='../uploads/Apple-logo.png'
      />
      <Card.Body className='ml-auto ps-0'>
        <Card.Title>
          <LinkContainer to='/offer/:id'>
            <h2 className='link'>{offer.title}</h2>
          </LinkContainer>
          <LinkContainer to='/company/:id'>
            <span className='link'>{offer.company.name} </span>
          </LinkContainer>
          <Rating value={4.5} />
        </Card.Title>
        <Container className='w100 p-0'>
          <i className='fas fa-location-dot' /> {offer.address}
          <Container>
            <Row>
              <Col sm={12} md={3} className='px-0'>
                <i className='fas fa-file-invoice' /> {offer.contractType}
              </Col>
              <Col sm={12} md={3} className='px-0'>
                <i className='fas fa-clock' /> {offer.time}
              </Col>
              <Col
                sm={12}
                md={6}
                className='px-0 d-inline-flex justify-content-between'
              >
                <span>
                  <i className='fas fa-chart-line me-auto' /> {offer.experience}
                </span>
                <span>
                  <span className='fav-text'>
                    {!isSaved ? 'Save ' : 'Saved! '}
                  </span>
                  <i
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    onClick={clickHandler}
                    className={`${
                      isHover || isSaved
                        ? 'fa-solid fav-star fav-saved'
                        : 'fa-regular'
                    } fa-star`}
                  />
                </span>
              </Col>
            </Row>
          </Container>
        </Container>
      </Card.Body>
    </Card>
  )
}

export default JobOffer
