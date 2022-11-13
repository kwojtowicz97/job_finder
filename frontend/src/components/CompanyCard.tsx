import { Container, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Company } from '../types/Company'
import Rating from './Rating'

interface Props {
  company: Company
  extended?: boolean
}

const CompanyCard = ({ company }: Props) => {
  const navigate = useNavigate()
  return (
    <Container style={{ border: '0.1rem' }}>
      <Container
        role='button'
        onClick={() => navigate(`/company/${company._id}`)}
        className='border rounded'
        // style={{ minHeight: '195px' }}
      >
        <Container
          style={{ minHeight: '112px' }}
          className='d-flex align-items-center justify-content-space'
        >
          <Image
            className='logo p-0 align-self-md-center'
            src={company.image}
            alt={`${company.name} logo`}
          />
          <Container>
            <h2>{company.name}</h2>
            <Rating value={company.rating} />
          </Container>
        </Container>
        <Container>
          <p className='border rounded p-1  d-inline-block bg-info'>{`${
            company.offersCount
          } job offer${
            company.offersCount > 1 || company.offersCount === 0 ? 's' : ''
          }`}</p>
          <span>
            <i className='fas fa-location-dot mb-2 ms-3' />
            <p className='d-inline ms-1'>{company.city}</p>
          </span>
        </Container>
      </Container>
    </Container>
  )
}

export default CompanyCard
