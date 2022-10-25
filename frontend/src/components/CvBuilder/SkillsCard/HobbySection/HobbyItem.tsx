import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import { cvBuilderContext } from '../../CvBuilderContextProvider'

interface Props {
  item: string
  index: number
}

const HobbyItem = ({ item, index }: Props) => {
  const {
    skillsCardState: { setHobbyItems },
  } = useContext(cvBuilderContext)

  const deleteHandler = () => {
    setHobbyItems!((state) => state.filter((_, i) => i !== index))
  }
  return (
    <li className='my-2 skill-item'>
      <span className='rounded border p-2 px-3 shadow-sm'>
        {item}
        <i
          role='button'
          onClick={deleteHandler}
          className='ms-2 fa-solid fa-xmark'
        />
      </span>
    </li>
  )
}

export default HobbyItem
