import { FormEvent, useContext, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import { errorHandler } from '../utils/errorHandler'
import { toastContext, userContext } from '../App'
import { UserInfo } from '../types/User'
import { countries } from './countries'

interface RegisterUserData {
  name: string
  email: string
  password: string
  phoneNumber: string
  country: string | undefined
  city: string
  address: string
}

interface RegisterResponse extends UserInfo {}

const registerUser = async (user: RegisterUserData) => {
  const { data } = await axios.post('/api/users', user)
  return data
}

const RegisterScreen = () => {
  const navigate = useNavigate()
  const { setUserInfo } = useContext(userContext)
  const { setToast } = useContext(toastContext)

  const [nextStep, setNextStep] = useState<boolean>(false)

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [country, setCountry] = useState<string | undefined>(undefined)
  const [city, setCity] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const { data, isLoading, isError, isSuccess, error, mutateAsync } =
    useMutation<RegisterResponse, Error, RegisterUserData>(
      ['registerResponse'],
      registerUser
    )

  useEffect(() => {
    if (isSuccess) {
      setUserInfo!(data)
      setToast &&
        setToast({
          trigger: true,
          title: `Hello ${name}`,
          message: 'Your account has beed created!',
        })
      navigate('/')
    }
  }, [isSuccess, data, name, setToast, setUserInfo, navigate])

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
    if (password === confirmPassword) {
      await mutateAsync({
        name,
        email,
        password,
        phoneNumber,
        country,
        city,
        address,
      })
    }
  }

  const firstStepSubmitHandler = (e: FormEvent) => {
    e.preventDefault()
    const confirm = document.getElementById('cPassword') as HTMLInputElement
    if (password !== confirmPassword) {
      confirm.setCustomValidity('Passwords do not match')
    } else {
      setNextStep(true)
    }
  }

  return (
    <Container>
      {isError && <Message variant='danger'>{errorHandler(error)}</Message>}
      <Row className='border rounded'>
        <Col className='p-3'>
          <Row>
            <Form id='form' onSubmit={firstStepSubmitHandler}>
              <Col hidden={nextStep} className='col-12'>
                <h2 className='mb-3'>Sing Up</h2>
                <Form.Group className='mb-3'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete='off'
                    type='text'
                    placeholder='Enter name'
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete='email'
                    type='email'
                    placeholder='Enter e-mail'
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete='new-password'
                    type='password'
                    placeholder='Enter password'
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    id='cPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete='new-password'
                    type='password'
                    placeholder='Confirm password'
                    required
                  />
                </Form.Group>

                <Button type='submit'>Next</Button>
              </Col>
            </Form>
            <Form onSubmit={submitHandler}>
              <Col hidden={!nextStep}>
                <h2 className='mb-3'>Your Presonal Data</h2>
                <Form.Group className='mb-3'>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type='text'
                    autoComplete='off'
                    placeholder='Enter your phone number'
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Country</Form.Label>
                  <Form.Select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  >
                    <option disabled value={undefined}>
                      Select your country
                    </option>
                    {countries.map((country) => (
                      <option key={country.name} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    type='text'
                    autoComplete='off'
                    placeholder='Enter your city'
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type='text'
                    autoComplete='off'
                    placeholder='Enter your city'
                    required
                  />
                </Form.Group>
                <Container className='d-flex justify-content-around'>
                  <Button onClick={() => setNextStep(false)}>Go Back</Button>
                  <Button
                    type='submit'
                    className={`position-relative ${
                      isLoading ? 'stripes-active' : ''
                    }`}
                  >
                    <span>Register</span>
                    <div className='stripes'></div>
                  </Button>
                </Container>
              </Col>
            </Form>
          </Row>
        </Col>
        <Col
          className='rounded-end d-none d-lg-block'
          style={{
            backgroundImage: 'url("register-side-photo.jpeg")',
            backgroundSize: 'cover',
          }}
        />
      </Row>
    </Container>
  )
}

export default RegisterScreen
