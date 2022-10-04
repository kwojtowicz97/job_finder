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
                <Nav.Link href='/'>Job offers</Nav.Link>
                <Nav.Link href='/companies'>Companies</Nav.Link>
                {userInfo?.company && (
                  <>
                    <Nav.Link href={`/company/${userInfo.company._id}`}>
                      Your company
                    </Nav.Link>
                    <Nav.Link href={`/recieved-applications`}>
                      Recieved Job Applications
                    </Nav.Link>
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
