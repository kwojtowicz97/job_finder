import React, { useContext, useState } from 'react'
import { Container } from 'react-bootstrap'
import { cvBuilderContext, EducationItem } from '../../CvBuilderContextProvider'
import CvBuilderNewEducationItem from './NewEducationItem'

interface Props {
  item: EducationItem
  index: number
}

const CvBuilderEducationItem = ({ item, index }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const {
    experienceCardState: { setEducationItems },
  } = useContext(cvBuilderContext)

  const deleteHandler = () => {
    setEducationItems!((state) => state.filter((i) => i !== item))
  }

  const editHandler = () => {
    setIsEditing(true)
  }

  return (
    <>
      <CvBuilderNewEducationItem
        show={isEditing}
        setShow={setIsEditing}
        item={item}
        index={index}
        setItems={setEducationItems}
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
        <label>Level of education</label>
        <p>
          <b>{item.levelOfEducation}</b>
        </p>
        <label>School</label>
        <p>
          <b>{item.school}</b>
        </p>
        <label>Major</label>
        <p>
          <b>{item.school}</b>
        </p>
        <label>Period</label>
        <p>
          <b>{`${item.startDate} -  ${item.endDate}`}</b>
        </p>
      </Container>
    </>
  )
}

export default CvBuilderEducationItem
