import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { FetchedCompanyData } from '../hooks/useGetCompanyDetails'
import useUpdateCompany from '../hooks/useUpdateCompany'
import { countries } from './countries'

interface Props {
  initialState: FetchedCompanyData
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const CompanyScreenEditCompany = ({ initialState, setIsEditing }: Props) => {
  const params = useParams()
  const {
    applicationStates,
    sendFileHandler,
    submitHandler,
    updateCompanyMutation,
  } = useUpdateCompany(params.id!, initialState)

  return (
    <Form onSubmit={submitHandler}>
      <h2 className='mb-3'>Edit Your Company Profile</h2>
      <Row>
        <Col>
          <Form.Group className='mb-3'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={applicationStates.name}
              onChange={(e) => applicationStates.setName(e.target.value)}
              type='text'
              autoComplete='off'
              placeholder='Enter your company name'
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Company Logo</Form.Label>
            <Form.Control type='file' onChange={sendFileHandler} />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              value={applicationStates.phoneNumber}
              onChange={(e) => applicationStates.setPhoneNumber(e.target.value)}
              type='text'
              autoComplete='off'
              placeholder='Enter your city'
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className='mb-3'>
            <Form.Label>Country</Form.Label>
            <Form.Select
              value={applicationStates.country}
              defaultValue={undefined}
              onChange={(e) => applicationStates.setCountry(e.target.value)}
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
              value={applicationStates.city}
              onChange={(e) => applicationStates.setCity(e.target.value)}
              type='text'
              autoComplete='off'
              placeholder='Enter your city'
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={applicationStates.address}
              onChange={(e) => applicationStates.setAddress(e.target.value)}
              type='text'
              autoComplete='off'
              placeholder='Enter your city'
              required
            />
          </Form.Group>
        </Col>
        <Form.Group className='mb-3'>
          <Form.Label>Description</Form.Label>
          <textarea
            className='w-100 border rounded'
            style={{
              borderColor: 'var(--bs-gray-400)',
              padding: '0.375rem 0.75rem',
              resize: 'none',
            }}
            rows={4}
            value={applicationStates.description}
            onChange={(e) => applicationStates.setDescription(e.target.value)}
            required
          ></textarea>
        </Form.Group>

        <Container className='d-flex justify-content-center align-items-center my-auto'>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          <Button
            type='submit'
            className={`position-relative ${
              updateCompanyMutation.isLoading ? 'stripes-active' : ''
            }`}
          >
            <span className='px-5'>Save</span>
            <div className='stripes'></div>
          </Button>
        </Container>
      </Row>
    </Form>
  )
}

export default CompanyScreenEditCompany
