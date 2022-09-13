import React from 'react'
import { useContext } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { toastContext, userContext } from '../App'

const Header = () => {
  const { userInfo, setUserInfo } = useContext(userContext)
  const { setToast } = useContext(toastContext)

  return (
    <header>
      <Navbar bg='ligth' expand='lg' className='shadow-sm py-0 '>
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
              {userInfo ? (
                <>
                  <i className='fa-solid fa-star fav-saved align-self-center fs-5 me-3 position-relative'>
                    <div
                      style={{
                        position: 'absolute',
                        left: '55%',
                        bottom: '50%',
                        fontSize: '0.6rem',
                        width: '20px',
                        height: '20px',
                        background: 'var(--bs-info)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '50%',
                        color: '#000000',
                      }}
                    >
                      {userInfo.saved.length}
                    </div>
                  </i>
                  <NavDropdown title={userInfo.name}>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item
                      onClick={() => {
                        localStorage.removeItem('userData')
                        setUserInfo && setUserInfo(null)
                        setToast &&
                          setToast({
                            trigger: true,
                            message: 'You have been logged out',
                            title: 'Logout',
                          })
                      }}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <a className='text-decoration-none nav-link'>Login</a>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
