import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import { errorHandler } from '../utils/errorHandler'
import { toastContext, userContext } from '../App'
import { UserInfo } from '../types/User'
import { LinkContainer } from 'react-router-bootstrap'

interface LoginUserData {
  email: string
  password: string
}

interface LoginResponse extends UserInfo {}

const loginUser = async (user: LoginUserData) => {
  const { data } = await axios.post('/api/users/login', user)
  return data
}

const RegisterScreen = () => {
  const navigate = useNavigate()
  const { setUserInfo } = useContext(userContext)
  const { setToast } = useContext(toastContext)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const loginDemoUser = async () => {
    setEmail('user@example.com')
    setPassword('abcd1234')
  }

  const loginDemoCompany = async () => {
    setEmail('company@example.com')
    setPassword('abcd1234')
  }

  const { data, isLoading, isError, isSuccess, error, mutateAsync } =
    useMutation<LoginResponse, Error, LoginUserData>(
      ['loginResponse'],
      loginUser
    )

  useEffect(() => {
    if (isSuccess) {
      setUserInfo!(data)
      setToast &&
        setToast({
          trigger: true,
          title: `Hello ${data.name}!`,
          message: 'You have beed logged in!',
        })
      navigate('/')
    }
  }, [isSuccess, data, navigate])

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault()
    mutateAsync({ email, password })
  }

  return (
    <Container>
      {isError && <Message variant='danger'>{errorHandler(error)}</Message>}
      <Row className='border rounded'>
        <Col className='p-3'>
          <h2 className='mb-3'>Sing Up</h2>
          <Form onSubmit={submitHandler}>
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
                autoComplete='password'
                type='password'
                placeholder='Enter password'
              />
            </Form.Group>
            <Button
              type='submit'
              className={`position-relative w-100 ${
                isLoading ? 'stripes-active' : ''
              }`}
            >
              <span>Login</span>
              <div className='stripes'></div>
            </Button>
            <Form.Text className='margin-auto'>
              <Container className='text-center '>
                <a
                  role='button'
                  onClick={loginDemoCompany}
                  className='text-decoration-none mx-2'
                >
                  <Form.Text>Login as a demo company</Form.Text>
                </a>

                <a
                  role='button'
                  onClick={loginDemoUser}
                  className='text-decoration-none mx-2'
                >
                  <Form.Text>Login as a demo user</Form.Text>
                </a>

                <LinkContainer to='/register'>
                  <a className='text-decoration-none mx-2'>
                    <Form.Text>Create a new account</Form.Text>
                  </a>
                </LinkContainer>
              </Container>
            </Form.Text>
          </Form>
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
