import mongoose from 'mongoose'
import React from 'react'
import { Container } from 'react-bootstrap'
import Rating from './Rating'

export interface Review {
  _id: string
  user: string
  title: string
  contents: string
  rating: number
}

interface Props {
  review: Review
}

const Review = ({ review }: Props) => {
  return (
    <Container className='w-100 border rounded p-3 mt-2 mb-2'>
      <Rating className='fs-5' value={review.rating} />
      <p className='m-0 mt-1'>{review.contents}</p>
    </Container>
  )
}

export default Review
