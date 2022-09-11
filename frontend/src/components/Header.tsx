import React from 'react'
import { useContext } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
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
              {userInfo ? (
                <NavDropdown title={userInfo.name}>
                  <NavDropdown.Item>First</NavDropdown.Item>
                  <NavDropdown.Item>Second</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <a>Login</a>
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

// {
//   /* <NavDropdown >
//                 <LinkContainer to={`${userInfo ? '/profile' : '/login'}`}>
//                   <Nav.Link>
//                     <i className='fa-solid fa-user'></i>{' '}
//                     {userInfo ? userInfo.name : 'Login'}
//                   </Nav.Link>
//                 </LinkContainer>
//               </NavDropdown> */
// }
