import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

interface Props {
  isSaved: boolean
  onClick: any
  reverse?: boolean
  className?: string
  spanClassName?: string
  disabled?: string | false
}

const SaveIcon = ({
  isSaved,
  onClick,
  reverse,
  className,
  spanClassName,
  disabled,
}: Props) => {
  const [isHover, setIsHover] = useState(false)
  const navigate = useNavigate()

  const disabledHandler = () => {
    if (disabled) {
      navigate(disabled)
    }
  }

  return (
    <button
      className={spanClassName + ' bg-transparent border-0'}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={disabled ? disabledHandler : onClick}
    >
      {!reverse ? (
        <span>
          <span className={`fav-text  ${className}`}>
            {!isSaved ? 'Save ' : 'Saved! '}
          </span>
          <i
            className={`${
              isHover || isSaved ? 'fa-solid fav-star fav-saved' : 'fa-regular'
            } fa-star`}
          />
        </span>
      ) : (
        <>
          <i
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={disabled ? disabledHandler : onClick}
            className={`${
              isHover || isSaved ? 'fa-solid fav-star fav-saved' : 'fa-regular'
            } fa-star`}
          />
          <span className={`fav-text  ${className}`}>
            {!isSaved ? ' Save' : ' Saved!'}
          </span>
        </>
      )}
    </button>
  )
}

export default SaveIcon
