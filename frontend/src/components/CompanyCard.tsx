import { Container, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Company } from '../types/Company'
import Rating from './Rating'

interface Props {
  company: Company
}

const CompanyCard = ({ company }: Props) => {
  const navigate = useNavigate()
  return (
    <Container style={{ border: '0.1rem' }}>
      <Container
        role='button'
        onClick={() => navigate(`/company/${company._id}`)}
        className='border rounded'
        style={{ minHeight: '195px' }}
      >
        <Container
          style={{ minHeight: '112px' }}
          className='d-flex align-items-center justify-content-space'
        >
          <Image
            className='logo p-0 align-self-start align-self-md-center'
            src={company.image}
            alt={`${company.name} logo`}
          />
          <Container>
            <h2>{company.name}</h2>
            <Rating value={company.rating} />
          </Container>
        </Container>
        <Container>
          <i className='fas fa-location-dot mb-2' />
          <p className='d-inline ms-2'>{company.city}</p>
        </Container>
        <p className='border rounded p-1 ms-2 d-inline-block bg-info'>{`${company.offersCount} job offers`}</p>
      </Container>
    </Container>
  )
}

export default CompanyCard
