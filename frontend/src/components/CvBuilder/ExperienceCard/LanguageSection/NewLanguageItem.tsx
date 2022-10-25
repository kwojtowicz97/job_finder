import React, { FormEvent, useState } from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'
import { LanguagesItem } from '../../CvBuilderContextProvider'

interface Props {
  show: boolean
  item?: LanguagesItem
  index?: number
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  setItems:
    | React.Dispatch<React.SetStateAction<[] | LanguagesItem[]>>
    | undefined
}

const CvBuilderNewLanguageItem = ({
  show,
  setShow,
  item,
  setItems,
  index,
}: Props) => {
  const [language, setLanguage] = useState(item?.language || '')
  const [level, setLevel] = useState(item?.level || '')

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    const newLanguageItem: LanguagesItem = {
      language,
      level,
    }
    if (item && (index || index === 0)) {
      setItems!((prevItems) => {
        const list = [...prevItems]
        list[index] = newLanguageItem
        return list
      })
    } else {
      setItems!((prevItems) => {
        const items = [...prevItems]
        items.push(newLanguageItem)
        return items
      })
    }
    setShow(false)
  }

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Language - new item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-2'>
            <Form.Label className='m-0'>Language</Form.Label>
            <Form.Control
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              type='text'
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label className='m-0'>Level</Form.Label>
            <Form.Control
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              type='text'
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

export default CvBuilderNewLanguageItem
