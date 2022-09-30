import React, { useState } from 'react'

interface Props {
  className: string
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
}

const RatingSelector = ({ className, setValue, value }: Props) => {
  const color = '#feb903'
  const [isClicked, setIsClicked] = useState<boolean>(false)

  const hoverHandler = (valueNumber: number) => {
    console.log(value)
    if (isClicked) return
    setValue(valueNumber)
    console.log(value)
  }

  const clickHandler = (valueNumber: number) => {
    setIsClicked(true)
    setValue(valueNumber)
  }
  return (
    <span className={className}>
      <span
        onMouseEnter={() => hoverHandler(1)}
        onMouseLeave={() => hoverHandler(0)}
        onClick={() => clickHandler(1)}
      >
        <i
          style={{ color }}
          className={
            value >= 1
              ? 'fas fa-star'
              : value >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span
        onMouseEnter={() => hoverHandler(2)}
        onMouseLeave={() => hoverHandler(0)}
        onClick={() => clickHandler(2)}
      >
        <i
          style={{ color }}
          className={
            value >= 2
              ? 'fas fa-star'
              : value >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span
        onMouseEnter={() => hoverHandler(3)}
        onMouseLeave={() => hoverHandler(0)}
        onClick={() => clickHandler(3)}
      >
        <i
          style={{ color }}
          className={
            value >= 3
              ? 'fas fa-star'
              : value >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span
        onMouseEnter={() => hoverHandler(4)}
        onMouseLeave={() => hoverHandler(0)}
        onClick={() => clickHandler(4)}
      >
        <i
          style={{ color }}
          className={
            value >= 4
              ? 'fas fa-star'
              : value >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span
        onMouseEnter={() => hoverHandler(5)}
        onMouseLeave={() => hoverHandler(0)}
        onClick={() => clickHandler(5)}
      >
        <i
          style={{ color }}
          className={
            value >= 5
              ? 'fas fa-star'
              : value >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
    </span>
  )
}

export default RatingSelector
