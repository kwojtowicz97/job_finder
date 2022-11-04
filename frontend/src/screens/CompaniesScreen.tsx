import { Button, Col, Form, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import useListAllCompanies from '../hooks/useListAllCompanies'
import { errorHandler } from '../utils/errorHandler'
import { CardCarousel } from '../components/CardCarousel'
import CompanyCardExtended from '../components/CompanyCardExtended'
import { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'

const CompaniesScreen = () => {
  const [companySearch, setCompanySearch] = useState('')
  const [locationSearch, setLoacationSearch] = useState('')

  const [pageNumber, setPageNumber] = useState(1)

  const { data, isLoading, isFetching, error, isError, refetch } =
    useListAllCompanies({
      companySearch,
      locationSearch,
      pageNumber,
    })

  useEffect(() => {
    refetch()
    window.scrollTo(0, 0)
  }, [pageNumber])

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant='danger'>{errorHandler(error)}</Message>
  ) : (
    <>
      <h2>
        <b>Most job offers</b>
      </h2>
      <CardCarousel sortBy='offersCount' companies={data.companies} />
      <hr />
      <h2>
        <b>Most loved</b>
      </h2>
      <CardCarousel sortBy='rating' companies={data.companies} />
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
      {isLoading || isFetching ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{errorHandler(error)}</Message>
      ) : (
        <>
          {data.companies
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((company) => (
              <CompanyCardExtended company={company} />
            ))}
          <Pagination
            totalPagesCount={data.pages}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </>
      )}
    </>
  )
}

export default CompaniesScreen
