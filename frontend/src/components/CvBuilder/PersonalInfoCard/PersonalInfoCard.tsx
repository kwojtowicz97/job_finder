import React, { useContext, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { countries } from '../../../screens/countries'
import { cvBuilderContext } from '../CvBuilderContextProvider'

const CvBuilderPersonalInfo = () => {
  const {
    personalInfoCardState: {
      name,
      setName,
      dateOfBirth,
      setDateOfBirth,
      country,
      setCountry,
      city,
      setCity,
      phoneNumber,
      setPhoneNumber,
      email,
      setEmail,
    },
  } = useContext(cvBuilderContext)

  return (
    <Form className='p-3'>
      <h2>Basic info</h2>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          value={name}
          onChange={(e) => setName!(e.target.value)}
          type='text'
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Date of birth</Form.Label>
        <Form.Control
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth!(e.target.value)}
          type='date'
        />
      </Form.Group>
      <h2>Domicle</h2>
      <Form.Group>
        <Form.Label>Country</Form.Label>
        <Form.Select
          value={country}
          onChange={(e) => setCountry!(e.target.value)}
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
      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control
          value={city}
          onChange={(e) => setCity!(e.target.value)}
          type='text'
        />
      </Form.Group>
      <h2>Contact details</h2>
      <Form.Group>
        <Form.Label>Phone number</Form.Label>
        <Form.Control
          value={phoneNumber}
          onChange={(e) => setPhoneNumber!(e.target.value)}
          type='text'
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          value={email}
          onChange={(e) => setEmail!(e.target.value)}
          type='text'
        />
      </Form.Group>
      <Container className='text-end'>
        <Button variant='info' className='my-3 ms-auto'>
          Next
        </Button>
      </Container>
    </Form>
  )
}

export default CvBuilderPersonalInfo
