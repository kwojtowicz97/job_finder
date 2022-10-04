import React from 'react'
import { ListGroup } from 'react-bootstrap'
import JobApplication from '../components/JobApplication'
import JobApplicationGroup from '../components/JobApplicationsGroup'
import Loader from '../components/Loader'
import Message from '../components/Message'
import useGetRecievedJobApplications from '../hooks/useGetRecievedJobApplications'
import { errorHandler } from '../utils/errorHandler'

const RecievedJobApplicationsScreen = () => {
  const { data, isSuccess, isError, isLoading, error } =
    useGetRecievedJobApplications()

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{errorHandler(error)}</Message>
      ) : (
        <>
          <h2>Recieved Job Applications</h2>
          <ListGroup variant='flush'>
            {Object.entries(data).map(([key, value]) => (
              <JobApplicationGroup applicationGroup={value} />
            ))}
            <ListGroup.Item></ListGroup.Item>
          </ListGroup>
        </>
      )}
    </>
  )
}

export default RecievedJobApplicationsScreen
