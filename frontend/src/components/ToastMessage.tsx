import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'

export const ToastMessage = () => {
  return (
    <ToastContainer position='bottom-end' className='position-fixed pe-3'>
      <Toast bg='secondary' show={true}>
        <Toast.Header>
          <strong>Hello Kamil!</strong>
        </Toast.Header>
        <Toast.Body>Your account has beed created!</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}
