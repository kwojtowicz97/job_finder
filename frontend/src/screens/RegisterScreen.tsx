import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import { errorHandler } from '../utils/errorHandler'
import { toastContext, userContext } from '../App'
import { UserInfo } from '../types/User'

interface RegisterUserData {
  name: string
  email: string
  password: string
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

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const { data, isLoading, isError, isSuccess, error, mutateAsync } =
    useMutation<RegisterResponse, Error, RegisterUserData>(
      ['registerResponse'],
      registerUser
    )

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('userInfo', JSON.stringify(data))
      setUserInfo && setUserInfo(data)
      setToast &&
        setToast({
          trigger: true,
          title: `Hello ${name}`,
          message: 'Your account has beed created!',
        })
      navigate('/')
    }
  }, [isSuccess, data, navigate])

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
    if (password === confirmPassword) {
      await mutateAsync({ name, email, password })
    }
  }

  return (
    <Container>
      {isError && <Message variant='danger'>{errorHandler(error)}</Message>}
      <Row className='border rounded'>
        <Col className='p-3'>
          <h2 className='mb-3'>Sing Up</h2>
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
            <Button
              type='submit'
              className={`position-relative w-100 ${
                isLoading ? 'stripes-active' : ''
              }`}
            >
              <span>Register</span>
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

export default RegisterScreen
