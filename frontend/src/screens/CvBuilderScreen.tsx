import { createContext, useContext, useReducer, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { userContext } from '../App'
import CvBuilderDownload from '../components/CvBuilderDownload'
import { CvBuilderExperience } from '../components/CvBuilder/ExperienceCard/ExperienceCard'
import CvBuilderPersonalInfo from '../components/CvBuilder/PersonalInfoCard/PersonalInfoCard'
import { CvBuilderSkills } from '../components/CvBuilder/SkillsCard/SkillsCard'
import StepMenu from '../components/StepMenu'
import { CvBuilderData } from '../types/CvBuilder'

const CvBuilder = () => {
  const { userInfo } = useContext(userContext)

  const initialCvBuilderData: CvBuilderData = {
    personalInfo: {
      name: userInfo?.name,
      city: userInfo?.city,
      country: userInfo?.country,
      email: userInfo?.email,
      phoneNumber: userInfo?.phoneNumber,
      photo: undefined,
    },
  }

  const [step, setStep] = useState(2)
  return (
    <>
      <h2>CV builder</h2>
      <StepMenu setStep={setStep} step={step} />
      <Row>
        <Col className='col-7'>
          <Container className='border rounded shadow p-3'>
            {(() => {
              switch (step) {
                case 1:
                  return <CvBuilderPersonalInfo />
                case 2:
                  return <CvBuilderExperience />
                case 3:
                  return <CvBuilderSkills />
                case 4:
                  return <CvBuilderDownload />
              }
            })()}
          </Container>
        </Col>
        <Col className='col-5'>
          <Container className='border rounded shadow'>Preview</Container>
        </Col>
      </Row>
    </>
  )
}

export default CvBuilder
