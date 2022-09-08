import React, { useState } from 'react'
import { Offer } from '../types'

interface Props {
  isSaved: boolean
  onClick: any
  reverse?: boolean
  className?: string
}

const SaveIcon = ({ isSaved, onClick, reverse, className }: Props) => {
  const [isHover, setIsHover] = useState(false)
  return (
    <>
      {!reverse ? (
        <span>
          <span className={`fav-text  ${className}`}>
            {!isSaved ? 'Save ' : 'Saved! '}
          </span>
          <i
            role='button'
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={onClick}
            className={`${
              isHover || isSaved ? 'fa-solid fav-star fav-saved' : 'fa-regular'
            } fa-star`}
          />
        </span>
      ) : (
        <>
          <i
            role='button'
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
    </>
  )
}

export default SaveIcon
