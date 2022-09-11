import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

interface Props {
  isSaved: boolean
  onClick: any
  reverse?: boolean
  className?: string
  spanClassName?: string
}

const SaveIcon = ({
  isSaved,
  onClick,
  reverse,
  className,
  spanClassName,
}: Props) => {
  const [isHover, setIsHover] = useState(false)
  return (
    <button
      className={spanClassName + ' bg-transparent border-0'}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClick}
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
            onClick={onClick}
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
