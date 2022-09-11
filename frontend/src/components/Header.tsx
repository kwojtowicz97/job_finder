import React from 'react'
import { useContext } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { userContext } from '../App'

const Header = () => {
  const { userInfo } = useContext(userContext)
  return (
    <header>
      <Navbar bg='ligth' expand='lg'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <h1>
                <b>Job Finder</b>
              </h1>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <LinkContainer to='/profile'>
                <Nav.Link>
                  <i className='fa-solid fa-user'></i>{' '}
                  {userInfo ? userInfo.name : 'Profile'}
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
