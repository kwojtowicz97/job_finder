import React from 'react'
import { Container, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import usePostOffer from '../hooks/usePostNewOffer'

const NewOfferScreen: React.FC = () => {
  const navigate = useNavigate()
  const {
    applicationStates: {
      title,
      setTitle,
      address,
      setAddress,
      contractType,
      setContractType,
      experience,
      setExperience,
      responsibilities,
      setResponsibilities,
      requirements,
      setRequirements,
      benefits,
      setBenefits,
      expiresAt,
      setExpiresAt,
      time,
      setTime,
      responsibiltyInput,
      setResponsibiltyInput,
      requirementInput,
      setRequirementInput,
      benefitsInput,
      setBenefitsInput,
    },
    submitHandler,
  } = usePostOffer()

  const addResponsibilityHandler = () => {
    if (responsibiltyInput) {
      setResponsibilities((state) => [...state, responsibiltyInput])
    }
    setResponsibiltyInput('')
  }
  const deleteResponsibilityHadler = (i: number) => {
    setResponsibilities((state) => state.filter((_, index) => i !== index))
  }

  const addRequirementHandler = () => {
    if (requirementInput) {
      setRequirements((state) => [...state, requirementInput])
    }
    setRequirementInput('')
  }

  const deleteRequirementsHandler = (i: number) => {
    setRequirements((state) => state.filter((_, index) => i !== index))
  }

  const addBenefitHandler = () => {
    if (benefitsInput) {
      setBenefits((state) => [...state, benefitsInput])
    }
    setBenefitsInput('')
  }

  const deleteBenefitsHandler = (i: number) => {
    setBenefits((state) => state.filter((_, index) => i !== index))
  }

  return (
    <Container>
      <h2 className='mt-3 mb-3'>New job offer</h2>
      <Form
        onSubmit={submitHandler}
        className='mx-auto'
        style={{ maxWidth: '700px' }}
      >
        <Form.Group className='my-2'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type='text'
          />
        </Form.Group>
        <Form.Group className='my-2'>
          <Form.Label>Localization</Form.Label>
          <Form.Control
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type='text'
          />
        </Form.Group>
        <Form.Group className='my-2'>
          <Form.Label>Contract type</Form.Label>
          <Form.Control
            required
            value={contractType}
            onChange={(e) => setContractType(e.target.value)}
            type='text'
          />
        </Form.Group>
        <Form.Group className='my-2'>
          <Form.Label>Form of employment</Form.Label>
          <Form.Control
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            type='text'
          />
        </Form.Group>
        <Form.Group className='my-2'>
          <Form.Label>Experience</Form.Label>
          <Form.Control
            required
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            type='text'
          />
        </Form.Group>
        <Form.Group className='my-2'>
          <Form.Label>Expires at</Form.Label>
          <Form.Control
            required
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            type='date'
          />
        </Form.Group>
        <h4>Responsibilities</h4>
        {responsibilities.length > 0 && (
          <ul className='mx-0 px-0'>
            {responsibilities.map((res, i) => (
              <li className='new-offer-list-item p-1 px-3 my-1 rounded' key={i}>
                <span className='d-flex my-1 justify-content-between align-items-center'>
                  <span>{res}</span>
                  <i
                    onClick={() => deleteResponsibilityHadler(i)}
                    role='button'
                    style={{ color: 'red' }}
                    className='fa-sharp fa-solid fa-xmark me-2 fs-4'
                  ></i>
                </span>
              </li>
            ))}
          </ul>
        )}
        <Form.Group className='my-2'>
          <Form.Control
            placeholder='add new requirement'
            value={responsibiltyInput}
            onBlur={addResponsibilityHandler}
            onChange={(e) => setResponsibiltyInput(e.target.value)}
            type='text'
          />
        </Form.Group>
        <h4>Requirements</h4>
        {requirements.length > 0 && (
          <ul className='mx-0 px-0'>
            {requirements.map((res, i) => (
              <li className='new-offer-list-item p-1 px-3 my-1 rounded' key={i}>
                <span className='d-flex justify-content-between align-items-center'>
                  <span>{res}</span>
                  <i
                    onClick={() => deleteRequirementsHandler(i)}
                    role='button'
                    style={{ color: 'red' }}
                    className='fa-sharp fa-solid fa-xmark me-2 fs-4'
                  ></i>
                </span>
              </li>
            ))}
          </ul>
        )}
        <Form.Group className='my-2'>
          <Form.Control
            placeholder='add new requirement'
            value={requirementInput}
            onBlur={addRequirementHandler}
            onChange={(e) => setRequirementInput(e.target.value)}
            type='text'
          />
        </Form.Group>
        <h4>Benefits</h4>
        {benefits.length > 0 && (
          <ul className='mx-0 px-0'>
            {benefits.map((res, i) => (
              <li className='new-offer-list-item p-1 px-3 my-1 rounded' key={i}>
                <span className='d-flex justify-content-between align-items-center'>
                  <span>{res}</span>
                  <i
                    onClick={() => deleteBenefitsHandler(i)}
                    role='button'
                    style={{ color: 'red' }}
                    className='fa-sharp fa-solid fa-xmark me-2 fs-4'
                  ></i>
                </span>
              </li>
            ))}
          </ul>
        )}
        <Form.Group className='my-2'>
          <Form.Control
            placeholder='add new requirement'
            value={benefitsInput}
            onBlur={addBenefitHandler}
            onChange={(e) => setBenefitsInput(e.target.value)}
            type='text'
          />
        </Form.Group>
        <Container className='d-flex justify-content-center'>
          <Button variant='info' className='mx-3'>
            Preview
          </Button>
          <Button variant='success' className='mx-3' type='submit'>
            Add
          </Button>
        </Container>
      </Form>
    </Container>
  )
}

export default NewOfferScreen
