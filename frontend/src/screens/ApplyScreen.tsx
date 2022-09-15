import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
import usePostCV from '../hooks/usePostCV'
import usePostApplication from '../hooks/usePostApplication'
import useGetOfferDetails from '../hooks/useGetOfferDetails'

export const ApplyScreen = () => {
  const navigate = useNavigate()
  const params = useParams()

  const { applicationStates, submitHandler } = usePostApplication(
    params.id || ''
  )

  const { sendCvHandler, isSending, isSend } = usePostCV(
    params.id || '',
    applicationStates.setCvFile!
  )

  const getApplicationData = useGetOfferDetails(params.id)

  return (
    <>
      {getApplicationData.isLoading ? (
        <Loader />
      ) : getApplicationData.isError ? (
        <Message variant='danger'>{getApplicationData.error.message}</Message>
      ) : (
        <Container fluid>
          <Button onClick={() => navigate(-1)}>Back to the offer</Button>
          <h2 className='mt-3 mb-3'>
            You are applying for the position of{' '}
            <strong>{getApplicationData.data.title}</strong> in{' '}
            <strong>{getApplicationData.data.company.name}</strong>
          </h2>
          <Form
            className='px-3 pt-3 mx-auto mw-sm-100'
            style={{ minWidth: '300px', maxWidth: '50%' }}
            onSubmit={submitHandler}
          >
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormControl
                type='text'
                placeholder='Enter your name'
                value={applicationStates.name}
                onChange={(e) => applicationStates.setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup className='mt-3'>
              <FormLabel>Email</FormLabel>
              <FormControl
                type='text'
                placeholder='Enter your email'
                value={applicationStates.email}
                onChange={(e) => applicationStates.setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup className='mt-3'>
              <FormLabel>Phone Number</FormLabel>
              <FormControl
                type='text'
                placeholder='Enter your phone number'
                value={applicationStates.phoneNumber}
                onChange={(e) =>
                  applicationStates.setPhoneNumber(e.target.value)
                }
              />
            </FormGroup>
            <FormGroup className='mt-3'>
              <FormLabel>Country</FormLabel>
              <FormControl
                type='text'
                placeholder='Enter your country'
                value={applicationStates.country}
                onChange={(e) => applicationStates.setCountry(e.target.value)}
              />
            </FormGroup>
            <FormGroup className='mt-3'>
              <FormLabel>City</FormLabel>
              <FormControl
                type='text'
                placeholder='Enter your city'
                value={applicationStates.city}
                onChange={(e) => applicationStates.setCity(e.target.value)}
              />
            </FormGroup>

            <FormGroup className='mt-3'>
              <FormLabel>Experience</FormLabel>
              <Form.Select
                value={applicationStates.experience}
                onChange={(e) =>
                  applicationStates.setExperience(e.target.value)
                }
              >
                <option disabled value={undefined}>
                  Select your experience
                </option>
                <option value='No experience'>No experience</option>
                <option value='0-1 years'>0-1 years</option>
                <option value='1-3 years'>1-3 years</option>
                <option value='3-5 years'>3-5 years</option>
                <option value='5+ years'>5+ years</option>
              </Form.Select>
            </FormGroup>
            {isSending ? (
              <Loader />
            ) : isSend ? (
              <p>{applicationStates.cvFile}</p>
            ) : (
              <FormGroup className='mt-3'>
                <FormLabel>CV</FormLabel>
                <FormControl type='file' onChange={(e) => sendCvHandler(e)} />
              </FormGroup>
            )}

            <Button className='mt-3 w-100' type='submit'>
              Apply
            </Button>
          </Form>
        </Container>
      )}
    </>
  )
}
