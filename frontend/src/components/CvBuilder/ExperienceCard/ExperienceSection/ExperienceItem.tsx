import React, { useContext, useState } from 'react'
import { Container } from 'react-bootstrap'
import {
  cvBuilderContext,
  JobExperienceItem,
} from '../../CvBuilderContextProvider'
import CvBuilderNewEducationItem from '../EducationSection/NewEducationItem'
import CvBuilderNewExperience from './NewExperience'

interface Props {
  item: JobExperienceItem
  index: number
}

const CvBuilderExperienceItem = ({ item, index }: Props) => {
  const [isEditing, setIsEditing] = useState(false)

  const {
    experienceCardState: { setJobExperienceItems },
  } = useContext(cvBuilderContext)

  const deleteHandler = () => {
    setJobExperienceItems!((state) => state.filter((i) => i !== item))
  }

  const editHandler = () => {
    setIsEditing(true)
  }
  return (
    <>
      <CvBuilderNewExperience
        show={isEditing}
        setShow={setIsEditing}
        item={item}
        index={index}
        setItems={setJobExperienceItems}
      />
      <Container className='border rounded shadow-sm p-3 my-1'>
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
        <label>Period</label>
        <p>
          <b>{`${item.startDate} - ${item.endDate}`}</b>
        </p>
        <label>Position</label>
        <p>
          <b>{item.position}</b>
        </p>
        <label>Company</label>
        <p>
          <b>{item.company}</b>
        </p>
        <label>Location</label>
        <p>
          <b>{item.location}</b>
        </p>
        <label>Description</label>
        <p>
          <b>{item.description}</b>
        </p>
      </Container>
    </>
  )
}

export default CvBuilderExperienceItem
