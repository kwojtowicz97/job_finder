import React from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'

interface Props {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const CvBuilderNewLanguageItem = ({ show, setShow }: Props) => {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Language - new item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-2'>
            <Form.Label className='m-0'>Language</Form.Label>
            <Form.Control type='text' />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label className='m-0'>Level</Form.Label>
            <Form.Control type='text' />
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

export default CvBuilderNewLanguageItem
