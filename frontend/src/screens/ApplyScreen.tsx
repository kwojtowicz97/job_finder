import React, { useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Offer } from '../types'
import axios from 'axios'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap'
import { userContext } from '../App'

const listOfferDetails = async (id: string) => {
  const { data } = await axios.get(`/api/offers/${id}`)
  return data
}

export const ApplyScreen = () => {
  const { userInfo } = useContext(userContext)
  const navigate = useNavigate()
  const params = useParams()

  const [name, setName] = useState(userInfo?.name)
  const [email, setEmail] = useState(userInfo?.email)
  const [phoneNumber, setPhoneNumber] = useState(undefined)
  const [localization, setLocalization] = useState(undefined)
  const [experience, setExperience] = useState<string | undefined>(undefined)

  const {
    data: offer,
    isLoading,
    isError,
    error,
  } = useQuery<Offer, Error>(
    [`listOfferDetails:${params.id || undefined}`],
    () => listOfferDetails(params.id || '')
  )
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{error.message}</Message>
      ) : (
        <Container fluid>
          <Button onClick={() => navigate(-1)}>Back to the offer</Button>
          <h2 className='mt-3 mb-3'>
            You are applying for the position of <strong>{offer.title}</strong>{' '}
            in <strong>{offer.company.name}</strong>
          </h2>
          <Form
            className='px-3 pt-3 mx-auto mw-sm-100'
            style={{ minWidth: '300px', maxWidth: '50%' }}
          >
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormControl
                type='text'
                placeholder='Enter your name'
                value={userInfo?.name}
              />
            </FormGroup>
            <FormGroup className='mt-3'>
              <FormLabel>Email</FormLabel>
              <FormControl
                type='text'
                placeholder='Enter your email'
                value={userInfo?.email}
              />
            </FormGroup>
            <FormGroup className='mt-3'>
              <FormLabel>Phone Number</FormLabel>
              <FormControl
                type='tel'
                placeholder='Enter your phone number'
                value={userInfo?.phoneNumber}
              />
            </FormGroup>
            <FormGroup className='mt-3'>
              <FormLabel>Country</FormLabel>
              <FormControl
                type='text'
                placeholder='Enter your country'
                value={userInfo?.country}
              />
            </FormGroup>

            <FormGroup className='mt-3'>
              <FormLabel>Experience</FormLabel>
              <Form.Select value={experience}>
                <option disabled selected value={undefined}>
                  Select your experience
                </option>
                <option value='No experience'>No experience</option>
                <option value='0-1 years'>0-1 years</option>
                <option value='1-3 years'>1-3 years</option>
                <option value='3-5 years'>3-5 years</option>
                <option value='5+ years'>5+ years</option>
              </Form.Select>
            </FormGroup>
            <FormGroup className='mt-3'>
              <FormLabel>CV</FormLabel>
              <FormControl type='file' />
            </FormGroup>
            <Button className='mt-3 w-100' type='submit'>
              Apply
            </Button>
          </Form>
        </Container>
      )}
    </>
  )
}
