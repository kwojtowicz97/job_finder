import React from 'react'
import { ListGroup } from 'react-bootstrap'
import JobApplication from '../components/JobApplication'
import JobApplicationGroup from '../components/JobApplicationsGroup'
import Loader from '../components/Loader'
import Message from '../components/Message'
import useGetRecievedJobApplications from '../hooks/useGetRecievedJobApplications'
import { errorHandler } from '../utils/errorHandler'

const RecievedJobApplicationsScreen = () => {
  const { data, isFetching, isError, isLoading, error } =
    useGetRecievedJobApplications()

  return (
    <>
      {isLoading || isFetching ? (
        <Loader />
      ) : isError ? (
        <Message variant='danger'>{errorHandler(error)}</Message>
      ) : (
        <>
          <h2>Recieved Job Applications</h2>
          {Object.entries(data).length > 0 ? (
            <ListGroup variant='flush'>
              {data.map((application) => (
                <JobApplicationGroup
                  key={application._id}
                  application={application}
                />
              ))}
            </ListGroup>
          ) : (
            <Message className='my-3' variant='info'>
              You haven't created any job offers yet
            </Message>
          )}
        </>
      )}
    </>
  )
}

export default RecievedJobApplicationsScreen
