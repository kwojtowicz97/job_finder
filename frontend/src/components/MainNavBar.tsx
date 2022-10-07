import { useContext } from 'react'
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { userContext } from '../App'

const expand = 'sm'

const MainNavBar = () => {
  const { userInfo } = useContext(userContext)
  return (
    <Navbar
      key={expand}
      bg='info'
      className='m-0 py-1 fs-5 shadow'
      expand={expand}
    >
      <Container fluid>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Container>
              <Nav className='flex-grow-1 pe-3'>
                <LinkContainer to='/'>
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
                  <>
                    <LinkContainer to={`/send-applications`}>
                      <Nav.Link>Send job applications</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to={`/cv-builder`}>
                      <Nav.Link>CV builder</Nav.Link>
                    </LinkContainer>
                  </>
                )}
              </Nav>
            </Container>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default MainNavBar
