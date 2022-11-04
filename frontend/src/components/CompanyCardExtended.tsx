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
            <p className='border rounded p-1 m-0 d-inline-block bg-info'>{`${
              company.offersCount
            } job offer${
              company.offersCount > 1 || company.offersCount === 0 ? 's' : ''
            }`}</p>
            <span>
              <i className='fas fa-location-dot mb-2 ms-3' />
              <p className='d-inline ms-1'>{company.city}</p>
            </span>
          </Container>
        </Card.Title>
      </Card.Body>
    </Card>
  )
}

export default CompanyCardExtended
