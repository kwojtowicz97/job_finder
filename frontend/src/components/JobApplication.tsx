import { useQueryClient } from '@tanstack/react-query'
import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { userContext } from '../App'
import useUpdateStatusOfJobApplication from '../hooks/useUpdateStatusOfJobApplication'
import { JobApplication as TJobApplication } from '../types/JobApplication'

export interface Props {
  application: TJobApplication
}

export enum Status {
  New = 'New',
  Opened = 'Opened',
  Considering = 'Considering',
  Rejected = 'Rejected',
  Accepted = 'Accepted',
}

enum StatusColors {
  New = 'gray',
  Opened = 'orange',
  Considering = 'blue',
  Rejected = 'red',
  Accepted = 'green',
}

const JobApplication = ({
  application: {
    _id,
    name,
    email,
    phoneNumber,
    country,
    city,
    experience,
    cvFile,
    status: fetchedStatus,
  },
}: Props) => {
  // const [status, setStatus] = useState<Status>(fetchedStatus)

  const { userInfo } = useContext(userContext)

  const { isSuccess, mutateAsync } = useUpdateStatusOfJobApplication(_id)

  const changeStatusHandler = (e: any) => {
    mutateAsync({ status: e.target.value })
  }

  const queryClient = useQueryClient()

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries(['listRecievedJobApplications'])
    }
  }, [isSuccess])

  return (
    <Row className='job-application p-3 border-bottom'>
      <Col>
        <label>Name</label>
        <p>
          <b>{name}</b>
        </p>
        <label>Email</label>
        <p>
          <b>{email}</b>
        </p>
        <label>Phone number</label>
        <p>
          <b>{phoneNumber}</b>
        </p>
      </Col>
      <Col>
        <label>Location</label>
        <p>
          <b>{`${country}, ${city}`}</b>
        </p>
        <label>Experience</label>
        <p>
          <b>{experience}</b>
        </p>
        <label>CV</label>
        <p>
          <a download href={cvFile}>{`${name}-CV.pdf`}</a>
        </p>
      </Col>
      {userInfo?.company ? (
        <>
          <Col className='d-flex align-items-center'>
            <label>Select status</label>
            <br />
            <Form.Select value={fetchedStatus} onChange={changeStatusHandler}>
              <option disabled value={Status.New}>
                {Status.New}
              </option>
              <option value={Status.Opened}>{Status.Opened}</option>
              <option value={Status.Considering}>{Status.Considering}</option>
              <option value={Status.Accepted}>{Status.Accepted}</option>
              <option value={Status.Rejected}>{Status.Rejected}</option>
            </Form.Select>
          </Col>
        </>
      ) : (
        <Col>
          <label>Status</label>
          <p style={{ color: StatusColors[fetchedStatus] }}>
            <b>{fetchedStatus}</b>
          </p>
        </Col>
      )}
    </Row>
  )
}

export default JobApplication
