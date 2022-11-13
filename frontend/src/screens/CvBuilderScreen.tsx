import { createContext, useContext, useReducer, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { userContext } from '../App'
import CvBuilderDownload from '../components/CvBuilderDownload'
import { CvBuilderExperience } from '../components/CvBuilder/ExperienceCard/ExperienceCard'
import CvBuilderPersonalInfo from '../components/CvBuilder/PersonalInfoCard/PersonalInfoCard'
import { CvBuilderSkills } from '../components/CvBuilder/SkillsCard/SkillsCard'
import StepMenu from '../components/StepMenu'
import { CvBuilderData } from '../types/CvBuilder'
import CvBuilderContextProvider, {
  cvBuilderContext,
} from '../components/CvBuilder/CvBuilderContextProvider'
import Preview from '../components/CvBuilder/Preview'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Loader from '../components/Loader'
import useGetCvData from '../hooks/useGetCvData'
import { errorHandler } from '../utils/errorHandler'
import Message from '../components/Message'

const CvBuilder = () => {
  const [step, setStep] = useState<number>(1)

  const { data, isLoading, error, isError } = useGetCvData()

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message>{errorHandler(error)}</Message>
      ) : (
        <CvBuilderContextProvider cvData={data}>
          <h2>CV builder</h2>
          <StepMenu setStep={setStep!} step={step} />
          <Container className='d-flex flex-column flex-lg-row justify-content-center'>
            <Container className='border rounded h-100 shadow px-0 my-2'>
              {(() => {
                switch (step) {
                  case 1:
                    return <CvBuilderPersonalInfo setStep={setStep} />
                  case 2:
                    return <CvBuilderExperience setStep={setStep} />
                  case 3:
                    return <CvBuilderSkills setStep={setStep} />
                  case 4:
                    return <CvBuilderDownload setStep={setStep} />
                }
              })()}
            </Container>
            <Container
              id='cv-preview'
              className={`${
                step === 4 ? 'cv-preview-show' : ''
              } border rounded shadow m-2 mb-auto`}
            >
              <Preview step={step} />
            </Container>
          </Container>
        </CvBuilderContextProvider>
      )}
    </>
  )
}

export default CvBuilder
