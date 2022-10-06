import { Button, Col, Form, Row } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import useListAllCompanies from '../hooks/useListAllCompanies'
import { errorHandler } from '../utils/errorHandler'
import { CardCarousel } from '../components/CardCarousel'

const CompaniesScreen = () => {
  const { data, isLoading, error, isError } = useListAllCompanies()

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
            ></Form.Control>
          </Col>
          <Col className='col-3'>
            <Form.Control type='text' placeholder='enter city'></Form.Control>
          </Col>
          <Col className='col-2'>
            <Button>Find company</Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default CompaniesScreen
