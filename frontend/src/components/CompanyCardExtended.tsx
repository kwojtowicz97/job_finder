import React from 'react'
import { Card, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Company } from '../types/Company'
import Rating from './Rating'

interface Props {
  company: Company
}

const CompanyCardExtended = ({ company }: Props) => {
  return (
    <Card className='flex-row my-3'>
      <Card.Img
        className='logo m-3 p-0 align-self-start align-self-md-center'
        src={company.image}
        alt={`${company.name} logo`}
      />
      <Card.Body className='ml-auto ps-0'>
        <Card.Title>
          <div className='d-flex flex-row align-items-center'>
            <LinkContainer role='button' to={`/company/${company._id}`}>
              <a className='nav-link'>
                <h2 className='link text-info'>{company.name}</h2>
              </a>
            </LinkContainer>
          </div>
          <Rating className='d-none d-sm-inline' value={company.rating} />
          <Container className='mt-2 ps-0 fs-6'>
            <p className='border rounded p-1 m-0 d-inline-block bg-info'>{`${company.offersCount} job offers`}</p>
            <span>
              <i className='fas fa-location-dot mb-2 ms-3' />
              <p className='d-inline ms-1'>{company.city}</p>
            </span>
          </Container>
        </Card.Title>
        {/* <Container className='w100 p-0'>
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
        </Container> */}
      </Card.Body>
    </Card>
  )
}

export default CompanyCardExtended
