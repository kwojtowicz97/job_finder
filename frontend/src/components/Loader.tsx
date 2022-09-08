import { Container, Spinner } from 'react-bootstrap'

/**
 * Loader component that will show a spinner when page is loading
 */
const Loader = () => {
  return (
    <Container fluid className='my-auto'>
      <Spinner
        className='m-auto'
        animation='border'
        role='status'
        style={{
          width: '100px',
          height: '100px',
          margin: 'auto',
          display: 'block',
        }}
        data-testid='spinner'
      >
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </Container>
  )
}

export default Loader
