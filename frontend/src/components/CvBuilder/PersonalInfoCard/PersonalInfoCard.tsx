import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { countries } from '../../../screens/countries'

const CvBuilderPersonalInfo = () => {
  return (
    <Form className='p-3'>
      <h2>Basic info</h2>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control type='text' />
      </Form.Group>
      <Form.Group>
        <Form.Label>Date of birth</Form.Label>
        <Form.Control type='date' />
      </Form.Group>
      <h2>Domicle</h2>
      <Form.Group>
        <Form.Label>Country</Form.Label>
        <Form.Select required>
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
        <Form.Control type='text' />
      </Form.Group>
      <h2>Contact details</h2>
      <Form.Group>
        <Form.Label>Phone number</Form.Label>
        <Form.Control type='text' />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type='text' />
      </Form.Group>
      <Button>Next</Button>
    </Form>
  )
}

export default CvBuilderPersonalInfo
