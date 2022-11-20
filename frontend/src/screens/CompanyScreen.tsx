import { useContext, useState } from 'react'
import {
  Button,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { LinkContainer } from 'react-router-bootstrap'
import { useParams } from 'react-router-dom'
import { userContext } from '../App'
import JobOffer from '../components/JobOffer'
import Loader from '../components/Loader'
import Map from '../components/Map'
import Message from '../components/Message'
import NewReview from '../components/NewReview'
import Rating from '../components/Rating'
import Review from '../components/Review'
import useGetCompanyDetails from '../hooks/useGetCompanyDetails'
import { errorHandler } from '../utils/errorHandler'
import CompanyScreenEditCompany from './CompanyScreenEditCompany'

const CompanyScreen = () => {
  const params = useParams()
  const { userInfo } = useContext(userContext)
  const { data, isLoading, isError, error, refetch } = useGetCompanyDetails(
    params.id
  )

  const [isEditing, setIsEditing] = useState<boolean>(false)

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant='danger'>{errorHandler(error)}</Message>
  ) : (
    <>
      <Helmet>
        <title>{`Job finder - ${data.company.name}`}</title>
      </Helmet>
      {isEditing ? (
        <Row className='mb-3'>
          <CompanyScreenEditCompany
            setIsEditing={setIsEditing}
            initialState={data}
          />
        </Row>
      ) : (
        <Row>
          <Col className='col-12 col-md-6'>
            <Container>
              <Container className='d-flex align-items-center '>
                <Image
                  src={data.company.image}
                  className='d-inline rounded cover p-3 shadow-lg'
                  style={{
                    aspectRatio: '1/1',
                    maxWidth: '120px',
                    objectFit: 'contain',
                  }}
                ></Image>
                <Container className='d-flex flex-column ms-3'>
                  <h1>{data.company.name}</h1>
                  <Rating
                    className={`${
                      userInfo?.company?._id === params.id ? '' : 'fs-4'
                    }`}
                    value={data.company.rating}
                  ></Rating>
                </Container>
              </Container>
              <Container className='p-3 pt-1'>
                {userInfo?.company?._id === params.id && (
                  <Button className='my-2' onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>
                )}
                <h5>
                  <b>Address</b>
                </h5>
                <p>
                  {`${data.company.country}, ${data.company.city}`}
                  <br />
                  {data.company.address}
                </p>
                <h5>
                  <b>E-mail</b>
                </h5>
                <p>sample@example.com</p>
                <h5>
                  <b>Phone number</b>
                </h5>
                <p>{data.company.phoneNumber}</p>
              </Container>
            </Container>
          </Col>
          <Col className='col-12 col-md-6 p-0 p-md-2 d-flex align-items-center'>
            <Container className='p-0 p-md-2' fluid>
              <Map
                shadow
                city={data.company.city}
                address={data.company.address}
              />
            </Container>
          </Col>
          <p>{data.company.description}</p>
        </Row>
      )}
      <Row>
        <Tabs defaultActiveKey='offers' id='uncontrolled-tab-example'>
          <Tab eventKey='offers' title='Offers'>
            {data.offers.length !== 0 ? (
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  {data.offers.map((offer) => (
                    <JobOffer key={offer._id} offer={offer} />
                  ))}
                </ListGroup.Item>
              </ListGroup>
            ) : (
              <Message className='my-3' variant='info'>
                There are no job offers yet
              </Message>
            )}
          </Tab>
          <Tab eventKey='reviews' title='Reviews'>
            {userInfo?.company?._id === data.company._id ? (
              <></>
            ) : !userInfo ? (
              <p className='my-2'>
                <LinkContainer
                  role='button'
                  to={`/login?redirect=/company/${data.company._id}`}
                >
                  <a className='nav-link d-inline text-info'>Login</a>
                </LinkContainer>{' '}
                to send a review
              </p>
            ) : !data.company.reviews.some(
                (review) => review.user === userInfo?._id
              ) ? (
              <NewReview id={params.id!} refetch={refetch} />
            ) : (
              <p className='py-2'>You have already reviewed the company</p>
            )}
            {data.company.reviews.length > 0 ? (
              data.company.reviews
                .reverse()
                .map((review) => <Review key={review._id} review={review} />)
            ) : (
              <Message className='my-3' variant='info'>
                There are no company reviews yet
              </Message>
            )}
          </Tab>
        </Tabs>
      </Row>
    </>
  )
}
export default CompanyScreen
