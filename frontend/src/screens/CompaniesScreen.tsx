import { Button, Col, Form, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import useListAllCompanies from '../hooks/useListAllCompanies'
import { errorHandler } from '../utils/errorHandler'
import { CardCarousel } from '../components/CardCarousel'
import CompanyCardExtended from '../components/CompanyCardExtended'
import { useState } from 'react'

const CompaniesScreen = () => {
  const [companySearch, setCompanySearch] = useState('')
  const [locationSearch, setLoacationSearch] = useState('')

  const { data, isLoading, error, isError, refetch } = useListAllCompanies({
    companySearch,
    locationSearch,
  })

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant='danger'>{errorHandler(error)}</Message>
  ) : (
    <>
      <h2>
        <b>Most job offers</b>
      </h2>
      <CardCarousel
        companies={data.sort((a, b) => (a.rating > b.rating ? 1 : -1))}
      />
      <hr />
      <h2>
        <b>Most loved</b>
      </h2>
      <CardCarousel
        companies={data.sort((a, b) =>
          a.offersCount > b.offersCount ? -1 : 1
        )}
      />
      <h1 className='text-center mt-3'>
        <b>Search for Companies</b>
      </h1>
      <Form className='m-3'>
        <Row className='justify-content-center'>
          <Col className='col-5'>
            <Form.Control
              type='text'
              placeholder='enter company name'
              value={companySearch}
              onChange={(e) => setCompanySearch(e.target.value)}
            ></Form.Control>
          </Col>
          <Col className='col-3'>
            <Form.Control
              type='text'
              placeholder='enter city'
              value={locationSearch}
              onChange={(e) => setLoacationSearch(e.target.value)}
            ></Form.Control>
          </Col>
          <Col className='col-2'>
            <Button onClick={() => refetch()}>Find company</Button>
          </Col>
        </Row>
      </Form>
      {data
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((company) => (
          <CompanyCardExtended company={company} />
        ))}
    </>
  )
}

export default CompaniesScreen
