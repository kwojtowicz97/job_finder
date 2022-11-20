import { FormEvent, useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Message from '../components/Message'
import { errorHandler } from '../utils/errorHandler'
import { toastContext, userContext } from '../App'
import Loader from '../components/Loader'
import { countries } from './countries'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const ProfileScreen = () => {
  const navigate = useNavigate()
  const { setUserInfo, userInfo } = useContext(userContext)
  const { setToast } = useContext(toastContext)

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [country, setCountry] = useState<string | undefined>(undefined)
  const [city, setCity] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo?.token}`,
    },
  }

  const getUserData = async () => {
    const { data } = await axios.get('/api/users', config)
    return data
  }

  const { data, isLoading, isError, isSuccess, error } = useQuery(
    ['updateUser'],
    getUserData
  )

  const updateProfile = async () => {
    const { data } = await axios.put(
      '/api/users',
      { email, name, password, phoneNumber, country, city, address },
      config
    )
    return data
  }

  const {
    data: dataUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync,
  } = useMutation(updateProfile)

  useEffect(() => {
    if (isSuccess) {
      setName(data.name)
      setEmail(data.email)
      setUserInfo!(data)
      setPhoneNumber(data.phoneNumber)
      setCountry(data.country)
      setCity(data.city)
      setAddress(data.address)
    }
  }, [isSuccess, data, setUserInfo])

  useEffect(() => {
    if (isSuccessUpdate) {
      setName(dataUpdate.name)
      setEmail(dataUpdate.email)
      setPhoneNumber(dataUpdate.phoneNumber)
      setCountry(dataUpdate.country)
      setCity(dataUpdate.city)
      setAddress(dataUpdate.address)
      setUserInfo!(dataUpdate)
      setToast!({
        trigger: true,
        title: 'Success!',
        message: 'Your profile has been updated!',
      })
    }
  }, [isSuccessUpdate, dataUpdate, setUserInfo, setToast])

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
    await mutateAsync()
  }

  return (
    <>
      <Helmet>
        <title>{`Job finder - Profile`}</title>
      </Helmet>
      isLoading ? (
      <Loader />) : (
      <Container>
        {!userInfo?.company && (
          <Container className='mb-5 p-3 border rounded'>
            <p>
              If you want to add new job offers first you have to create a
              company profile.
            </p>
            <Button onClick={() => navigate('/newcompany')}>
              Create company profile
            </Button>
          </Container>
        )}

        {isError && <Message variant='danger'>{errorHandler(error)}</Message>}
        <Form onSubmit={submitHandler}>
          <Row className='border rounded'>
            <Col className='p-3 pe-5 border-end col-12 col-lg-6'>
              <h2 className='mb-3'>Update account</h2>
              <Form.Group className='mb-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete='off'
                  type='text'
                  placeholder='Enter name'
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete='email'
                  type='email'
                  placeholder='Enter e-mail'
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete='new-password'
                  type='password'
                  placeholder='Enter new password'
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete='new-password'
                  type='password'
                  placeholder='Confirm new password'
                />
              </Form.Group>
            </Col>
            <Col className='p-3 col-12 col-lg-6'>
              <h2 className='mb-3'>Update your personal information</h2>
              <Form.Group className='mb-3'>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type='text'
                  placeholder='Enter your country'
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Country</Form.Label>
                <Form.Select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option disabled selected value={undefined}>
                    Select your country
                  </option>
                  {countries.map((country) => (
                    <option value={country.name}>{country.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type='text'
                  placeholder='Enter your city'
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type='text'
                  placeholder='Enter your city'
                />
              </Form.Group>
            </Col>
          </Row>
          <Container className='d-flex justify-content-center align-items-center'>
            <Button
              type='submit'
              className={`position-relative mt-3 ${
                isLoading ? 'stripes-active' : ''
              }`}
            >
              <span>Update</span>
              <div className='stripes'></div>
            </Button>
          </Container>
        </Form>
      </Container>
      )
    </>
  )
}

export default ProfileScreen
