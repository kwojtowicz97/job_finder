import React, { FormEvent, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

interface Props {
  searchBarProps: {
    position: string | undefined
    setPosition: React.Dispatch<React.SetStateAction<string | undefined>>
    location: string | undefined
    setLocation: React.Dispatch<React.SetStateAction<string | undefined>>
  }
  refetch: Function
}

const SearchBar = ({ searchBarProps, refetch }: Props) => {
  const navigate = useNavigate()
  const { position, location, setPosition, setLocation } = searchBarProps
  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (position || location)
      navigate(`/?position=${position}&location=${location}`)
    refetch()
  }

  return (
    <Form
      onSubmit={submitHandler}
      className='d-flex py-5 px-3 bg-info shadow mb-3'
    >
      <Row className='w-100 d-flex align-items-center'>
        <Col className='col-2'>
          <h2 className='text-end fs-2'>
            <b>Search</b>
          </h2>
        </Col>
        <Col className='col-5'>
          <Form.Control
            type='text'
            placeholder='positions, companies, keywords'
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </Col>
        <Col className='col-4'>
          <Form.Control
            type='text'
            placeholder='city, country'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Col>
        <Col className='col-1'>
          <Button type='submit'>Search</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default SearchBar
