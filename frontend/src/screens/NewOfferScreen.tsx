import { timeEnd } from 'console'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Container, Button, Form, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../App'
import NewOfferPreview, { OfferPreview } from '../components/NewOfferPreview'
import usePostOffer from '../hooks/usePostNewOffer'

const NewOfferScreen: React.FC = () => {
  const navigate = useNavigate()

  const titleRef = useRef(null)
  const localizationRef = useRef(null)
  const addressRef = useRef(null)
  const expiresInRef = useRef(null)
  const contractRef = useRef(null)
  const timeRef = useRef(null)
  const experienceRef = useRef(null)
  const locationRef = useRef(null)
  const responsibilitiesRef = useRef(null)
  const requirementsRef = useRef(null)
  const benefitsRef = useRef(null)

  const { userInfo } = useContext(userContext)

  const {
    applicationStates: {
      title,
      setTitle,
      address,
      setAddress,
      localization,
      setLocalization,
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
    postOffer: { isSuccess, isLoading, data },
  } = usePostOffer()

  useEffect(() => {
    if (isSuccess) {
      navigate(`/offer/${data._id}`)
    }
  }, [isSuccess])

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

  const dataForPreview: OfferPreview = {
    title,
    address,
    localization,
    expiresAt,
    benefits,
    company: userInfo!.company!,
    contractType,
    experience,
    requirements,
    responsibilities,
    time,
    refs: {
      titleRef,
      localizationRef,
      addressRef,
      expiresInRef,
      contractRef,
      timeRef,
      experienceRef,
      locationRef,
      responsibilitiesRef,
      requirementsRef,
      benefitsRef,
    },
  }

  return (
    <Row>
      <Col className='col-12 col-lg-6'>
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
                ref={titleRef}
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type='text'
              />
            </Form.Group>
            <Form.Group className='my-2'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                ref={addressRef}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type='text'
              />
            </Form.Group>
            <Form.Group className='my-2'>
              <Form.Label>Expires at</Form.Label>
              <Form.Control
                ref={expiresInRef}
                required
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                type='date'
              />
            </Form.Group>
            <Form.Group className='my-2'>
              <Form.Label>Contract type</Form.Label>
              <Form.Control
                ref={contractRef}
                required
                value={contractType}
                onChange={(e) => setContractType(e.target.value)}
                type='text'
              />
            </Form.Group>
            <Form.Group className='my-2'>
              <Form.Label>Form of employment</Form.Label>
              <Form.Control
                ref={timeRef}
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                type='text'
              />
            </Form.Group>
            <Form.Group className='my-2'>
              <Form.Label>Experience</Form.Label>
              <Form.Select
                ref={experienceRef}
                required
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
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
            </Form.Group>
            <Form.Group className='my-2'>
              <Form.Label>Localization</Form.Label>
              <Form.Control
                ref={localizationRef}
                required
                value={localization}
                onChange={(e) => setLocalization(e.target.value)}
                type='text'
              />
            </Form.Group>

            <h4>Responsibilities</h4>
            {responsibilities.length > 0 && (
              <ul className='mx-0 px-0'>
                {responsibilities.map((res, i) => (
                  <li
                    className='new-offer-list-item p-1 px-3 my-1 rounded'
                    key={i}
                  >
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
                ref={responsibilitiesRef}
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
                  <li
                    className='new-offer-list-item p-1 px-3 my-1 rounded'
                    key={i}
                  >
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
                ref={requirementsRef}
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
                  <li
                    className='new-offer-list-item p-1 px-3 my-1 rounded'
                    key={i}
                  >
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
                ref={benefitsRef}
                placeholder='add new requirement'
                value={benefitsInput}
                onBlur={addBenefitHandler}
                onChange={(e) => setBenefitsInput(e.target.value)}
                type='text'
              />
            </Form.Group>
            <Container className='d-flex justify-content-center'>
              <Button variant='success' className='m-3' type='submit'>
                Add
              </Button>
            </Container>
          </Form>
        </Container>
      </Col>
      <Col>
        <NewOfferPreview offer={dataForPreview} />
      </Col>
    </Row>
  )
}

export default NewOfferScreen
