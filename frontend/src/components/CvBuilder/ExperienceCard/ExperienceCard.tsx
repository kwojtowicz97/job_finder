import React, { useState } from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'
import CvBuilderEducationItem from './EducationSection/EducationItem'
import CvBuilderExperienceItem from './ExperienceSection/ExperienceItem'
import CvBuilderLanguageItem from './LanguageSection/LanguageItem'
import CvBuilderNewEducationItem from './EducationSection/NewEducationItem'
import CvBuilderNewExperience from './ExperienceSection/NewExperience'
import CvBuilderNewLanguageItem from './LanguageSection/NewLanguageItem'

export const CvBuilderExperience = () => {
  const [showNewJobExperience, setShowNewJobExperience] = useState(false)
  const [showNewEducation, setShowNewEducation] = useState(false)
  const [showNewLanguage, setShowNewLanguage] = useState(false)
  return (
    <Container className='d-flex flex-column justify-content-center'>
      <h2>Job experience</h2>
      <CvBuilderExperienceItem />
      <CvBuilderExperienceItem />
      <Button
        variant='info'
        className='mx-auto my-3'
        onClick={() => setShowNewJobExperience(true)}
      >
        Add new
      </Button>
      <CvBuilderNewExperience
        show={showNewJobExperience}
        setShow={setShowNewJobExperience}
      />
      <h2>Education</h2>
      <CvBuilderEducationItem />
      <Button
        variant='info'
        className='mx-auto my-3'
        onClick={() => setShowNewEducation(true)}
      >
        Add new
      </Button>
      <CvBuilderNewEducationItem
        show={showNewEducation}
        setShow={setShowNewEducation}
      />
      <h2>Languages</h2>
      <CvBuilderLanguageItem />
      <Button
        variant='info'
        className='mx-auto my-3'
        onClick={() => setShowNewLanguage(true)}
      >
        Add new
      </Button>
      <CvBuilderNewLanguageItem
        show={showNewLanguage}
        setShow={setShowNewLanguage}
      />
    </Container>
  )
}
