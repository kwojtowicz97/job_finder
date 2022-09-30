import { userInfo } from 'os'
import React, { useContext, useState } from 'react'
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
  const { data, isLoading, isError, error } = useGetCompanyDetails(params.id)

  const [isEditing, setIsEditing] = useState<boolean>(false)

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant='danger'>{errorHandler(error)}</Message>
  ) : (
    <>
      {isEditing ? (
        <Row className='mb-3'>
          <CompanyScreenEditCompany
            setIsEditing={setIsEditing}
            initialState={data}
          />
        </Row>
      ) : (
        <Row>
          <Col>
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
                  <Rating className='fs-4' value={data.company.rating}></Rating>
                </Container>
                {userInfo?.company?._id === params.id && (
                  <Button onClick={() => setIsEditing(true)}>Edit</Button>
                )}
              </Container>
              <Container className='p-3 mt-3'>
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
          <Col className='d-flex align-items-center'>
            <Container fluid>
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
            <ListGroup variant='flush'>
              <ListGroup.Item>
                {data.offers.map((offer) => (
                  <JobOffer key={offer._id} offer={offer} />
                ))}
              </ListGroup.Item>
            </ListGroup>
          </Tab>
          <Tab eventKey='reviews' title='Reviews'>
            <NewReview />
            {data.company.reviews.map((review) => (
              <Review review={review} />
            ))}
          </Tab>
        </Tabs>
      </Row>
    </>
  )
}
export default CompanyScreen
