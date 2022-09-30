import mongoose from 'mongoose'
import React from 'react'
import { Container } from 'react-bootstrap'
import Rating from './Rating'

export interface Review {
  user: mongoose.Types.ObjectId
  title: string
  contents: string
  rating: number
}

interface Props {
  review: Review
}

const Review = ({ review }: Props) => {
  return (
    <Container>
      <h2>{review.title}</h2>
      <p>{review.contents}</p>
      <Rating value={review.rating} />
    </Container>
  )
}

export default Review
