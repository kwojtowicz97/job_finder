import React, { useContext } from 'react'
import { Button, Container } from 'react-bootstrap'
import { cvBuilderContext } from '../CvBuilderContextProvider'
import HobbyItem from './HobbySection/HobbyItem'
import NewHobbyItem from './HobbySection/NewHobbyItem'
import NewSkillItem from './SkillsSection/NewSkillItem'
import SkillItem from './SkillsSection/SkillItem'

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export const CvBuilderSkills = ({ setStep }: Props) => {
  const {
    skillsCardState: { skillsItems, setSkillsItems, hobbyItems, setHobbyItems },
  } = useContext(cvBuilderContext)

  const nextPageHandler = () => {
    setStep((step) => step + 1)
    window.scrollTo(0, 0)
  }

  const prevPageHandler = () => {
    window.scrollTo(0, 0)
    setStep((step) => step - 1)
  }

  return (
    <>
      <Container className='m-0 p-3 border-bottom'>
        <h2>Skills</h2>
        <NewSkillItem setItems={setSkillsItems!} />
        <ul
          style={{ listStyle: 'none' }}
          className='d-flex flex-column justify-content-center px-0'
        >
          {skillsItems.map((item, index) => (
            <SkillItem key={index} item={item} index={index} />
          ))}
        </ul>
      </Container>
      <Container className='m-0 p-3'>
        <h2>Hobbys</h2>
        <NewHobbyItem setItems={setHobbyItems!} />
        <ul
          style={{ listStyle: 'none' }}
          className='d-flex flex-column justify-content-center px-0'
        >
          {hobbyItems.map((item, index) => (
            <HobbyItem key={index} item={item} index={index} />
          ))}
        </ul>
        <Container className='d-flex justify-content-around border-top'>
          <Button onClick={prevPageHandler} variant='info' className='my-3 '>
            Back
          </Button>
          <Button onClick={nextPageHandler} variant='info' className='my-3 '>
            Next
          </Button>
        </Container>
      </Container>
    </>
  )
}
