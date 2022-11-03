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
    // <header>
    //   <Navbar bg='ligth' expand='lg' className='shadow-sm py-0 '>
    //     <Container>
    // <LinkContainer to='/'>
    //   <Navbar.Brand>
    //     <h1>
    //       <b>Job Finder</b>
    //     </h1>
    //   </Navbar.Brand>
    // </LinkContainer>
    // <Nav className='ms-auto'>
    //   {userInfo ? (
    //     <>
    //       <i className='fa-solid fa-star fav-saved align-self-center fs-5 me-3 position-relative d-none d-lg-block'>
    //         <div
    //           style={{
    //             position: 'absolute',
    //             left: '55%',
    //             bottom: '50%',
    //             fontSize: '0.6rem',
    //             width: '20px',
    //             height: '20px',
    //             background: 'var(--bs-info)',
    //             display: 'flex',
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //             borderRadius: '50%',
    //             color: '#000000',
    //           }}
    //         >
    //           {userInfo.saved.length}
    //         </div>
    //       </i>
    //       <NavDropdown title={userInfo.name}>
    // <LinkContainer to='/profile'>
    //   <NavDropdown.Item>Profile</NavDropdown.Item>
    // </LinkContainer>
    // {userInfo.company && (
    //   <LinkContainer to={`/company/${userInfo.company._id}`}>
    //     <NavDropdown.Item>Your Company</NavDropdown.Item>
    //   </LinkContainer>
    // )}

    // <NavDropdown.Item
    //   onClick={() => {
    //     localStorage.removeItem('userData')
    //     setUserInfo && setUserInfo(null)
    //     setToast &&
    //       setToast({
    //         trigger: true,
    //         message: 'You have been logged out',
    //         title: 'Logout',
    //       })
    //   }}
    // >
    //   Logout
    // </NavDropdown.Item>
    //       </NavDropdown>
    //     </>
    //   ) : (
    // <LinkContainer to='/login'>
    //   <a className='text-decoration-none nav-link'>Login</a>
    // </LinkContainer>
    //   )}
    // </Nav>
    //     </Container>
    //   </Navbar>
    // </header>
    <Navbar bg='light' expand='lg'>
      <Container style={{ maxWidth: '2000px' }} fluid>
        <LinkContainer to='/'>
          <Navbar.Brand>
            <b>Job Finder</b>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav className='my-2 my-lg-0 w-100'>
            <LinkContainer onClick={() => setShow(false)} to='/'>
              <Nav.Link>Job offers</Nav.Link>
            </LinkContainer>

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
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer className='ms-lg-auto' to='/login'>
                <a className='text-decoration-none nav-link'>Login</a>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
