import React, { FormEvent, useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'

interface Props {
  setItems: React.Dispatch<React.SetStateAction<string[]>>
}

const NewHobbyItem = ({ setItems }: Props) => {
  const [input, setInput] = useState<string>('')

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    setItems((prevItems) => {
      const items = [...prevItems]
      items.push(input)
      return items
    })
    setInput('')
  }

  return (
    <Form onSubmit={submitHandler} className='px-5'>
      <Form.Group className='text-center'>
        <Form.Control
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type='submit' variant='info' className='my-3'>
          Add hobby
        </Button>
      </Form.Group>
    </Form>
  )
}

export default NewHobbyItem
