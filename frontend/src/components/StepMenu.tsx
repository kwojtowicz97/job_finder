import React from 'react'
import { Col, Row } from 'react-bootstrap'
import StepMenuStep from './StepMenuStep'

interface Props {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
}

const StepMenu = ({ step, setStep }: Props) => {
  return (
    <ul>
      <Row className='step-menu d-none d-lg-flex'>
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Col key={Math.random()}>
              <StepMenuStep
                step={step}
                dataStepCounter={i + 1}
                setStep={setStep}
              />
            </Col>
          ))}
      </Row>
    </ul>
  )
}

export default StepMenu
