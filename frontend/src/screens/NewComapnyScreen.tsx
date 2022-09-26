import React, { FormEvent, useState } from 'react'
import { countries } from './countries'
import { Button, Col, Container, Form } from 'react-bootstrap'
import useUploadFile from '../hooks/useUploadFile'
import { usePostNewCompany } from '../hooks/usePostNewCompany'

export const NewComapnyScreen: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [logoURL, setLogoURL] = useState<string | undefined>('')

  const { data, isLoading, isSuccess, mutateAsync } = usePostNewCompany()

  const { isSending, isSend, sendFileHandler } = useUploadFile(setLogoURL)

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    mutateAsync({
      name,
      country,
      city,
      address,
      description,
      phoneNumber,
      image: logoURL,
    })
  }
  return (
    <Container
      className='px-3 pt-3 mx-auto mw-sm-100'
      style={{ minWidth: '300px', maxWidth: '50%' }}
    >
      <Form onSubmit={submitHandler}>
        <Col>
          <h2 className='mb-3'>Create Your Company Profile</h2>
          <Form.Group className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type='text'
              autoComplete='off'
              placeholder='Enter your company name'
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Country</Form.Label>
            <Form.Select
              value={country}
              defaultValue={undefined}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value={undefined}>Select your country</option>
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
          <Form.Group className='mb-3'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              type='text'
              autoComplete='off'
              placeholder='Enter your city'
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type='text'
              autoComplete='off'
              placeholder='Enter your city'
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Company Logo</Form.Label>
            <Form.Control type='file' onChange={sendFileHandler} />
          </Form.Group>
          <Container className='d-flex justify-content-around'>
            <Button
              type='submit'
              className={`position-relative ${
                isLoading ? 'stripes-active' : ''
              }`}
            >
              <span>Create</span>
              <div className='stripes'></div>
            </Button>
          </Container>
        </Col>
      </Form>
    </Container>
  )
}
