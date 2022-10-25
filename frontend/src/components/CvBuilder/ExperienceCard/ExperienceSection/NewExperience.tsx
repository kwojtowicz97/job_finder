import { index } from '@typegoose/typegoose'
import React, { FormEvent, useState } from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'
import { JobExperienceItem } from '../../CvBuilderContextProvider'

interface Props {
  show: boolean
  item?: JobExperienceItem
  index?: number
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  setItems:
    | React.Dispatch<React.SetStateAction<[] | JobExperienceItem[]>>
    | undefined
}

const CvBuilderNewExperience = ({
  show,
  setShow,
  setItems,
  item,
  index,
}: Props) => {
  const [startDate, setStartDate] = useState<string>(item?.startDate || '')
  const [endDate, setEndDate] = useState<string>(item?.endDate || '')
  const [position, setPosition] = useState<string>(item?.position || '')
  const [company, setCompany] = useState<string>(item?.company || '')
  const [location, setLocation] = useState<string>(item?.location || '')
  const [description, setDescription] = useState<string>(
    item?.description || ''
  )

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    const newExperienceItem: JobExperienceItem = {
      position,
      company,
      location,
      description,
      endDate,
      startDate,
    }

    if (item && (index || index === 0)) {
      setItems!((prevItems) => {
        const list = [...prevItems]
        list[index] = newExperienceItem
        return list
      })
    } else {
      setItems!((prevItems) => {
        const items = [...prevItems]
        items.push(newExperienceItem)
        return items
      })
    }

    setShow(false)
  }

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Job experience - new item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-2'>
            <Form.Label className='m-0'>Position*</Form.Label>
            <Form.Control
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              type='text'
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label className='m-0'>Company</Form.Label>
            <Form.Control
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              type='text'
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label className='m-0'>Location</Form.Label>
            <Form.Control
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type='text'
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label className='m-0'>Start date</Form.Label>
            <Form.Control
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              type='date'
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label className='m-0'>End date</Form.Label>
            <Form.Control
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              type='date'
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label className='m-0'>Description</Form.Label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-100 border rounded'
              style={{
                borderColor: 'var(--bs-gray-400)',
                padding: '0.375rem 0.75rem',
                resize: 'none',
              }}
              rows={4}
              required
            ></textarea>
          </Form.Group>
          <Container className='d-flex justify-content-around'>
            <Button onClick={() => setShow(false)} variant='danger'>
              Cancel
            </Button>
            <Button type='submit' variant='info'>
              Add
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CvBuilderNewExperience
