import React, { ReactNode } from 'react'
import { Alert } from 'react-bootstrap'

interface Props {
  variant: string
  children: ReactNode
  className?: string
}

/**
 * Message component used to format alerts throughout different pages
 */
const Message = ({ variant, children, className }: Props) => {
  return (
    <Alert className={className} data-testid='message-alert' variant={variant}>
      {children}
    </Alert>
  )
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
