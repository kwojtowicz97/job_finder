import React, { useContext, useEffect, useState } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import { toastContext } from '../App'

export const ToastMessage = () => {
  const { toast, setToast } = useContext(toastContext)
  const [show, setShow] = useState(true)

  // setTimeout(() => setShow(true), 500)

  // useEffect(() => {
  //   return setShow(false)
  // }, [])

  return show ? (
    <ToastContainer position='bottom-end' className='position-fixed p-3'>
      <Toast
        onClose={() => setToast && setToast({ trigger: false })}
        show={toast.trigger}
        delay={5000}
        animation={true}
        autohide
      >
        <Toast.Header>
          <strong className='me-auto'>{toast.title}</strong>
        </Toast.Header>
        <Toast.Body>{toast.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  ) : (
    <></>
  )
}
