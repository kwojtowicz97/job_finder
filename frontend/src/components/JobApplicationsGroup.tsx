import React, { useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { ApplicationsByOffer } from '../hooks/useGetRecievedJobApplications'
import { JobApplication as TJobApplication } from '../types/JobApplication'
import JobApplication from './JobApplication'

export interface Props {
  applicationGroup: {
    applications: TJobApplication[]
    offerTitle: string
    _id: string
  }
}

enum Status {
  New = 'New',
  Opened = 'Opened',
  Considering = 'Considering',
  Rejected = 'Rejected',
  Accepted = 'Accepted',
}

const JobApplicationsGroup = ({ applicationGroup }: Props) => {
  const [status, setStatus] = useState<Status>(Status.New)
  return (
    <Container className='w-100 border rounded mb-3'>
      <Row className='border-bottom p-3'>
        <LinkContainer role='button' to={`/offer/${applicationGroup._id}`}>
          <a className='nav-link'>
            <h2 className='link text-info m-0'>
              {applicationGroup.offerTitle}
            </h2>
          </a>
        </LinkContainer>
      </Row>
      {applicationGroup.applications.map((application) => (
        <JobApplication application={application} />
      ))}
    </Container>
  )
}

export default JobApplicationsGroup
