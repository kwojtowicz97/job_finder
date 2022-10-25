import React, { useContext } from 'react'
import { Button, Container } from 'react-bootstrap'
import { cvBuilderContext } from '../CvBuilderContextProvider'
import HobbyItem from './HobbySection/HobbyItem'
import NewHobbyItem from './HobbySection/NewHobbyItem'
import NewSkillItem from './SkillsSection/NewSkillItem'
import SkillItem from './SkillsSection/SkillItem'

export const CvBuilderSkills = () => {
  const {
    skillsCardState: { skillsItems, setSkillsItems, hobbyItems, setHobbyItems },
  } = useContext(cvBuilderContext)

  const skillDeleteHandler = (skill: string) => {
    setSkillsItems!((state) => state.filter((item) => item !== skill))
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
            <SkillItem item={item} index={index} />
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
            <HobbyItem item={item} index={index} />
          ))}
        </ul>
        <Container className='text-end'>
          <Button variant='info' className='my-3 ms-auto'>
            Next
          </Button>
        </Container>
      </Container>
    </>
  )
}
