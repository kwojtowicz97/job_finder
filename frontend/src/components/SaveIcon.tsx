import React, { useState } from 'react'

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
    <span
      role='button'
      className={spanClassName}
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
    </span>
  )
}

export default SaveIcon
