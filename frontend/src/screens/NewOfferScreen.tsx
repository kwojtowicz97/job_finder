import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { Col, Row, Image, Container, Button, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import Map from '../components/Map'
import { Benefits } from '../components/Benefits'
import SaveIcon from '../components/SaveIcon'
import axios from 'axios'
import { Offer } from '../types'
import { errorHandler } from '../utils/errorHandler'
import { userContext } from '../App'
import { LinkContainer } from 'react-router-bootstrap'

const NewOfferScreen: React.FC = () => {
  const { userInfo } = useContext(userContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo || !userInfo.company) {
      navigate('/')
    }
  }, [])

  return (
    <>
      <Container>
        <Form>
          <Form.Group>
            <Form.Label>Offer name</Form.Label>
            <Form.Control type='text'></Form.Control>
          </Form.Group>
        </Form>
      </Container>
    </>
  )
}

export default NewOfferScreen
