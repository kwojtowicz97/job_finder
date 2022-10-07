import React from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'

interface Props {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const CvBuilderNewEducationItem = ({ show, setShow }: Props) => {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Education - new item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-2'>
            <Form.Label className='m-0'>Level of education</Form.Label>
            <Form.Control type='text' />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label className='m-0'>School</Form.Label>
            <Form.Control type='text' />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label className='m-0'>Degree</Form.Label>
            <Form.Control type='text' />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label className='m-0'>Start date</Form.Label>
            <Form.Control type='date' />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label className='m-0'>End date</Form.Label>
            <Form.Control type='date' />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label className='m-0'>Description</Form.Label>
            <textarea
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

export default CvBuilderNewEducationItem
