import React, { useState } from 'react'
import { useContext } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { toastContext, userContext } from '../App'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { userInfo, setUserInfo } = useContext(userContext)
  const [show, setShow] = useState(false)
  const { setToast } = useContext(toastContext)
  const navigate = useNavigate()

  const logoutHandler = () => {
    localStorage.removeItem('userData')
    localStorage.removeItem('jobExperienceItems')
    localStorage.removeItem('hobbyItems')
    localStorage.removeItem('educationItems')
    localStorage.removeItem('languagesItems')
    localStorage.removeItem('skillsItems')
    localStorage.removeItem('email')
    localStorage.removeItem('city')
    localStorage.removeItem('name')
    localStorage.removeItem('phoneNumber')
    setUserInfo && setUserInfo(null)
    setToast &&
      setToast({
        trigger: true,
        message: 'You have been logged out',
        title: 'Logout',
      })
    navigate('/')
  }

  return (
    <Navbar collapseOnSelect bg='light' expand='lg'>
      <Container style={{ maxWidth: '2000px' }} fluid>
        <Nav
          className='my-2 my-lg-0 w-100 d-contents'
          style={{ display: 'contents' }}
        >
          <LinkContainer to='/'>
            <Nav.Link>
              <Navbar.Brand>
                <b style={{ color: '#1abc9d' }}>Job Finder</b>
              </Navbar.Brand>
            </Nav.Link>
          </LinkContainer>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            {/* <LinkContainer onClick={() => setShow(false)} to='/'>
              <Nav.Link>Job offers</Nav.Link>
            </LinkContainer> */}

            <LinkContainer to='/companies'>
              <Nav.Link>Companies</Nav.Link>
            </LinkContainer>
            {userInfo?.company ? (
              <>
                <LinkContainer to={`/company/${userInfo.company._id}`}>
                  <Nav.Link>Your company</Nav.Link>
                </LinkContainer>
                <LinkContainer to={`/recieved-applications`}>
                  <Nav.Link>Recieved Job Applications</Nav.Link>
                </LinkContainer>
                <LinkContainer to={`/newoffer`}>
                  <Nav.Link>Create Job Offer</Nav.Link>
                </LinkContainer>
              </>
            ) : (
              userInfo && (
                <>
                  <LinkContainer to={`/send-applications`}>
                    <Nav.Link>Send job applications</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to={`/cv-builder`}>
                    <Nav.Link>CV builder</Nav.Link>
                  </LinkContainer>
                </>
              )
            )}
            {userInfo ? (
              <NavDropdown
                menuVariant='end'
                title={userInfo.name}
                id='basic-nav-dropdown'
                className='ms-lg-auto'
              >
                <Container className='m-0 ms-lg-0 ms-2'>
                  <LinkContainer to='/profile'>
                    <Nav.Link>Profile</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/favourites'>
                    <Nav.Link>Favourites</Nav.Link>
                  </LinkContainer>

                  <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                </Container>
              </NavDropdown>
            ) : (
              <LinkContainer className='ms-lg-auto' to='/login'>
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header
