import React, { useContext, useEffect, useState } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import { toastContext } from '../App'

export const ToastMessage = () => {
  const { toast, setToast } = useContext(toastContext)
  const [show, setShow] = useState(false)

  setTimeout(() => setShow(true), 500)

  useEffect(() => {
    return setShow(false)
  }, [])

  return show ? (
    <ToastContainer position='bottom-end' className='position-fixed pe-3'>
      <Toast
        onClose={() => setToast && setToast({ trigger: false })}
        show={toast.trigger}
        delay={5000}
        animation
        autohide
      >
        <Toast.Header>
          <strong className='me-auto'>Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
      </Toast>
    </ToastContainer>
  ) : (
    <></>
  )
}
