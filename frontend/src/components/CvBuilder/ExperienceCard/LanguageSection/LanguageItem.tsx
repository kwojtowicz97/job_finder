import React, { useContext, useState } from 'react'
import { Container } from 'react-bootstrap'
import { cvBuilderContext, LanguagesItem } from '../../CvBuilderContextProvider'
import CvBuilderNewLanguageItem from './NewLanguageItem'

interface Props {
  item: LanguagesItem
  index: number
}

const CvBuilderLanguageItem = ({ item, index }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const {
    experienceCardState: { setLanguagesItems },
  } = useContext(cvBuilderContext)

  const deleteHandler = () => {
    setLanguagesItems!((state) => state.filter((i) => i !== item))
  }

  const editHandler = () => {
    setIsEditing(true)
  }
  return (
    <>
      <CvBuilderNewLanguageItem
        show={isEditing}
        setItems={setLanguagesItems}
        index={index}
        setShow={setIsEditing}
        item={item}
      />
      <Container className='border rounded p-3 my-1'>
        <Container fluid className='d-flex justify-content-end'>
          <i
            role='button'
            onClick={editHandler}
            className='job-experience-item-button fa-solid fa-pen-to-square'
          ></i>
          <i
            onClick={deleteHandler}
            role='button'
            className='job-experience-item-button fa-solid fa-trash ms-3'
          ></i>
        </Container>
        <label>Language</label>
        <p>
          <b>{item.language}</b>
        </p>
        <label>Level</label>
        <p>
          <b>{item.level}</b>
        </p>
      </Container>
    </>
  )
}

export default CvBuilderLanguageItem
