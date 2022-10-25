import React, { FormEvent, useState } from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'
import { EducationItem } from '../../CvBuilderContextProvider'

interface Props {
  show: boolean
  item?: EducationItem
  index?: number
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  setItems:
    | React.Dispatch<React.SetStateAction<[] | EducationItem[]>>
    | undefined
}

const CvBuilderNewEducationItem = ({
  show,
  setShow,
  item,
  index,
  setItems,
}: Props) => {
  const [levelOfEducation, setLevelOfEducation] = useState<string>(
    item?.levelOfEducation || ''
  )
  const [school, setSchool] = useState<string>(item?.school || '')
  const [major, setMajor] = useState<string>(item?.major || '')
  const [startDate, setStartDate] = useState<string>(item?.startDate || '')
  const [endDate, setEndDate] = useState<string>(item?.endDate || '')

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()

    const newEducationItem: EducationItem = {
      school,
      major,
      levelOfEducation,
      startDate,
      endDate,
    }

    if (item && (index || index === 0)) {
      setItems!((prevItems) => {
        alert('edit')
        const list = [...prevItems]
        list[index] = newEducationItem
        return list
      })
    } else {
      setItems!((prevItems) => {
        const items = [...prevItems]
        items.push(newEducationItem)
        return items
      })
    }
    setShow(false)
  }

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Education - new item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-2'>
            <Form.Label className='m-0'>Level of education</Form.Label>
            <Form.Control
              value={levelOfEducation}
              onChange={(e) => setLevelOfEducation(e.target.value)}
              type='text'
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label className='m-0'>School</Form.Label>
            <Form.Control
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              type='text'
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label className='m-0'>Major</Form.Label>
            <Form.Control
              value={major}
              onChange={(e) => setMajor(e.target.value)}
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

export default CvBuilderNewEducationItem
