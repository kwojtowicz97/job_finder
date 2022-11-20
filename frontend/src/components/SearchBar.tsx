import React, { FormEvent, useState } from 'react'
import { Button, Col, Form, Offcanvas, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

interface Props {
  searchBarProps: {
    position: string | undefined
    setPosition: React.Dispatch<React.SetStateAction<string | undefined>>
    location: string | undefined
    setLocation: React.Dispatch<React.SetStateAction<string | undefined>>
  }
  setShowButton: React.Dispatch<React.SetStateAction<boolean>>
  refetch: Function
}

const SearchBar = ({ searchBarProps, refetch, setShowButton }: Props) => {
  const navigate = useNavigate()
  const { position, location, setPosition, setLocation } = searchBarProps
  const [show, setShow] = useState(false)
  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (!position && !location) return
    if (position || location)
      navigate(`/?position=${position}&location=${location}`)
    setShowButton(true)
    refetch()
  }

  const offcanvasToggleHandler = () => {
    setShow((prev) => !prev)
  }

  return (
    <>
      <i
        onClick={offcanvasToggleHandler}
        style={{
          bottom: '30px',
          right: '30px',
          borderRadius: '50%',
          zIndex: 100,
          background: '#000cde',
          width: '50px',
          height: '50px',
          color: 'white',
        }}
        className='d-flex fs-5 justify-content-center align-items-center fa-solid fa-magnifying-glass position-fixed shadow-sm d-lg-none d-block'
      ></i>
      <Offcanvas placement='bottom' show={show} onHide={offcanvasToggleHandler}>
        <Offcanvas.Header className='pb-0' closeButton>
          <Offcanvas.Title>Search</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form onSubmit={submitHandler}>
            <Form.Control
              className='my-1'
              type='text'
              placeholder='position'
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
            <Form.Control
              className='my-1'
              type='text'
              placeholder='city, country'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button className='d-block mx-auto mt-3' type='submit'>
              Search
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
      <Form
        onSubmit={submitHandler}
        style={{ maxWidth: '2000px' }}
        className='mx-auto d-flex py-5 px-3 shadow-sm mb-3 d-none d-lg-block'
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
              placeholder='position'
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
    </>
  )
}

export default SearchBar
