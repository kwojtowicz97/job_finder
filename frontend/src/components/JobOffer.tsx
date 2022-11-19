import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useContext, useEffect } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { userContext } from '../App'
import { Offer as OfferType } from '../types'
import Rating from './Rating'
import SaveIcon from './SaveIcon'

interface Props {
  offer: OfferType
}

const JobOffer = ({ offer }: Props) => {
  const { userInfo, setUserInfo } = useContext(userContext)

  const { data, isSuccess, isLoading, mutateAsync } = useMutation(async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/users/favourites/${offer._id}`,
      {},
      config
    )
    return data
  })

  useEffect(() => {
    if (isSuccess) {
      setUserInfo!(data)
    }
  }, [isSuccess])

  const isExpired = offer.expiresIn < 0
  const backgroundColor = isExpired ? '#e9e9e9' : 'white'

  return (
    <Card
      style={{ background: backgroundColor }}
      className='flex-row my-2 my-lg-3'
    >
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
              {isExpired ? (
                <i className='text-danger pe-1 fa-solid fa-circle-exclamation' />
              ) : (
                <i className='pe-1 fa-solid fa-circle-exclamation' />
              )}
              {isExpired ? (
                <span className='text-danger d-none d-sm-inline'>Expired</span>
              ) : (
                <span className='d-none d-sm-inline'>Recommended For You!</span>
              )}
            </span>
          </div>
          <span className='mb-2'>
            <LinkContainer role='button' to={`/company/${offer.company._id}`}>
              <a className='nav-link d-inline'>
                <p className='link d-inline'>{offer.company.name} </p>
              </a>
            </LinkContainer>
            <Rating
              className='d-none d-sm-inline'
              value={offer.company.rating}
            />
          </span>
        </Card.Title>
        <Container className='ms-0 w100 p-0'>
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
                {userInfo && (
                  <SaveIcon
                    isSaved={
                      userInfo?.saved.includes(String(offer._id)) || isLoading
                    }
                    onClick={mutateAsync}
                  />
                )}
              </Col>
            </Row>
          </Container>
        </Container>
      </Card.Body>
    </Card>
  )
}

export default JobOffer
