import React, { useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { ApplicationByOffer } from '../hooks/useGetRecievedJobApplications'
import { JobApplication as TJobApplication } from '../types/JobApplication'
import JobApplication from './JobApplication'
import Message from './Message'

export interface Props {
  application: ApplicationByOffer
}

const JobApplicationsGroup = ({ application }: Props) => {
  return (
    <Container className='w-100 border rounded mb-3'>
      <Row className='border-bottom p-3'>
        <LinkContainer role='button' to={`/offer/${application._id}`}>
          <a className='nav-link'>
            <h2 className='link text-info m-0'>{application.offerTitle}</h2>
          </a>
        </LinkContainer>
      </Row>
      {application.applications.length === 0 && (
        <Message className='my-3' variant='info'>
          No job applications yet
        </Message>
      )}
      {application.applications.map((application) => (
        <JobApplication application={application} />
      ))}
    </Container>
  )
}

export default JobApplicationsGroup
