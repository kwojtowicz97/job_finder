import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Message from '../components/Message'
import { errorHandler } from '../utils/errorHandler'
import { toastContext, userContext } from '../App'
import Loader from '../components/Loader'
import { countries } from './countries'

const ProfileScreen = () => {
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
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    isSuccess: isSuccessUpdate,
    error: errorUpdate,
    mutateAsync,
  } = useMutation(updateProfile)

  useEffect(() => {
    if (isSuccess) {
      setName(data.name)
      setEmail(data.email)
      setUserInfo!(data)
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (isSuccessUpdate) {
      setName(dataUpdate.name)
      setEmail(dataUpdate.email)
      setUserInfo!(dataUpdate)
      setToast!({
        trigger: true,
        title: 'Success!',
        message: 'Your profile has been updated!',
      })
    }
  }, [isSuccessUpdate, dataUpdate])

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
    await mutateAsync()
  }

  return isLoading ? (
    <Loader />
  ) : (
    <Container>
      {isError && <Message variant='danger'>{errorHandler(error)}</Message>}
      <Row className='border rounded'>
        <Col sm={12} className='p-3'>
          <h2 className='mb-3'>Update account</h2>
          <Form onSubmit={submitHandler}>
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
                placeholder='Enter password'
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete='new-password'
                type='password'
                placeholder='Confirm password'
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type='text'
                placeholder='Enter your country'
              />
            </Form.Group>
            <Form.Group>
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
            <Button
              type='submit'
              className={`position-relative w-100 ${
                isLoading ? 'stripes-active' : ''
              }`}
            >
              <span>Update</span>
              <div className='stripes'></div>
            </Button>
          </Form>
        </Col>
        <Col
          className='rounded-end'
          style={{
            backgroundImage: 'url("register-side-photo.jpeg")',
            backgroundSize: 'cover',
          }}
        />
      </Row>
    </Container>
  )
}

export default ProfileScreen
