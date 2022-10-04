import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { userContext } from '../App'
import Rating from './Rating'
import RatingSelector from './RatingSelector'

interface Props {
  id: string
  refetch: any
}

const NewReview = ({ id, refetch }: Props) => {
  const { userInfo } = useContext(userContext)
  const [reviewContents, setReviewContents] = useState<string>('')
  const [value, setValue] = useState<number>(0)

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo?.token}`,
    },
  }

  const { isSuccess, error, mutateAsync } = useMutation(
    ['new-review'],
    async () => {
      const { data } = await axios.post(
        `/api/reviews/${id}`,
        { reviewContents, rating: value },
        config
      )
      return data
    }
  )

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    mutateAsync()
  }

  useEffect(() => {
    if (isSuccess) {
      refetch()
    }
  }, [isSuccess])

  return (
    <Form onSubmit={submitHandler} className='mt-3 mb-5'>
      <RatingSelector className='fs-4' value={value} setValue={setValue} />
      <Form.Group>
        <textarea
          value={reviewContents}
          onChange={(e) => setReviewContents(e.target.value)}
          className='w-100 border rounded mt-1'
          style={{
            borderColor: 'var(--bs-gray-400)',
            padding: '0.375rem 0.75rem',
            resize: 'none',
          }}
          placeholder='Write your opionion about the company. Your review will be anonymous.'
        />
      </Form.Group>
      <Button type='submit'>Add review</Button>
    </Form>
  )
}

export default NewReview
