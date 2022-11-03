import React, { useContext, useState } from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'
import CvBuilderEducationItem from './EducationSection/EducationItem'
import CvBuilderExperienceItem from './ExperienceSection/ExperienceItem'
import CvBuilderLanguageItem from './LanguageSection/LanguageItem'
import CvBuilderNewEducationItem from './EducationSection/NewEducationItem'
import CvBuilderNewExperience from './ExperienceSection/NewExperience'
import CvBuilderNewLanguageItem from './LanguageSection/NewLanguageItem'
import { cvBuilderContext } from '../CvBuilderContextProvider'

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export const CvBuilderExperience = ({ setStep }: Props) => {
  const [showNewJobExperience, setShowNewJobExperience] = useState(false)
  const [showNewEducation, setShowNewEducation] = useState(false)
  const [showNewLanguage, setShowNewLanguage] = useState(false)

  const nextPageHandler = () => {
    window.scrollTo(0, 0)
    setStep((step) => step + 1)
  }
  const prevPageHandler = () => {
    window.scrollTo(0, 0)
    setStep((step) => step - 1)
  }

  const {
    experienceCardState: {
      jobExperienceItems,
      setJobExperienceItems,
      educationItems,
      setEducationItems,
      languagesItems,
      setLanguagesItems,
    },
  } = useContext(cvBuilderContext)

  return (
    <Container className='d-flex p-3 flex-column justify-content-center'>
      <h2>Job experience</h2>
      {jobExperienceItems.map((item, index) => (
        <CvBuilderExperienceItem item={item} index={index} />
      ))}
      <Button
        variant='info'
        className='mx-auto my-3'
        onClick={() => setShowNewJobExperience(true)}
      >
        Add new
      </Button>
      {showNewJobExperience && (
        <CvBuilderNewExperience
          setItems={setJobExperienceItems}
          show={showNewJobExperience}
          setShow={setShowNewJobExperience}
        />
      )}
      <h2>Education</h2>
      {educationItems.map((item, index) => (
        <CvBuilderEducationItem item={item} index={index} />
      ))}
      <Button
        variant='info'
        className='mx-auto my-3'
        onClick={() => setShowNewEducation(true)}
      >
        Add new
      </Button>
      <CvBuilderNewEducationItem
        setItems={setEducationItems}
        show={showNewEducation}
        setShow={setShowNewEducation}
      />
      <h2>Languages</h2>
      {languagesItems.map((item, index) => (
        <CvBuilderLanguageItem item={item} index={index} />
      ))}
      <Button
        variant='info'
        className='mx-auto my-3'
        onClick={() => setShowNewLanguage(true)}
      >
        Add new
      </Button>
      <CvBuilderNewLanguageItem
        setItems={setLanguagesItems}
        show={showNewLanguage}
        setShow={setShowNewLanguage}
      />
      <Container className='d-flex justify-content-around'>
        <Button onClick={prevPageHandler} variant='info' className='my-3 '>
          Back
        </Button>
        <Button onClick={nextPageHandler} variant='info' className='my-3 '>
          Next
        </Button>
      </Container>
    </Container>
  )
}
