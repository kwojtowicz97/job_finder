import React, { useContext, useEffect, useState } from 'react'
import { Card, Row, Col, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Rating from './Rating'
import { Offer as OfferType } from '../types'
import SaveIcon from './SaveIcon'
import { userContext } from '../App'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface Props {
  offer: OfferType
}

const JobOffer = ({ offer }: Props) => {
  const { userInfo, setUserInfo } = useContext(userContext)

  const { data, isSuccess, mutateAsync } = useMutation(async () => {
    console.log(userInfo)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.token}`,
      },
    }
    console.log(config)
    const { data } = await axios.put(
      `/api/users/favourites/${offer._id}`,
      {},
      config
    )
    return data
  })

  const clickHandler = () => {
    mutateAsync()
  }

  useEffect(() => {
    if (isSuccess) {
      setUserInfo!(data)
    }
  }, [isSuccess])

  return (
    <Card className='flex-row my-3'>
      <Card.Img
        className='logo m-3 p-0 align-self-start align-self-md-center'
        src={offer.company.image}
        alt={`${offer.company.name} logo`}
      />
      <Card.Body className='ml-auto ps-0'>
        <Card.Title>
          <div className='d-flex flex-row align-items-center'>
            <LinkContainer role='button' to={`/offer/${offer._id}`}>
              <a className='nav-link'>
                <h2 className='link text-info'>{offer.title}</h2>
              </a>
            </LinkContainer>
            <span
              style={{ color: '#feb903' }}
              className='ms-auto fs-6 algin-middle'
            >
              <i className='pe-1 fa-solid fa-circle-exclamation' />
              <span className='d-none d-sm-inline'>Recommended For You!</span>
            </span>
          </div>
          <span className='mb-2'>
            <LinkContainer role='button' to={`/company/${offer.company._id}`}>
              <a className='nav-link'>
                <p className='link'>{offer.company.name} </p>
              </a>
            </LinkContainer>
          </span>
          <Rating className='d-none d-sm-inline' value={offer.company.rating} />
        </Card.Title>
        <Container className='w100 p-0'>
          <i className='fas fa-location-dot mb-2' /> {offer.address}
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
                <SaveIcon
                  isSaved={userInfo?.saved.includes(String(offer._id)) || false}
                  onClick={clickHandler}
                />
              </Col>
            </Row>
          </Container>
        </Container>
      </Card.Body>
    </Card>
  )
}

export default JobOffer
