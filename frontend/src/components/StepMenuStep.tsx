import React from 'react'

interface Props {
  step: number
  dataStepCounter: number
  setStep: React.Dispatch<React.SetStateAction<number>>
}

const StepsLabels = ['Personal info', 'Experience', 'Skills', 'Download CV']

const StepMenuStep = ({ step, dataStepCounter, setStep }: Props) => {
  return (
    <li
      onClick={() => setStep(dataStepCounter)}
      className={`step-menu-step ${step === dataStepCounter && 'active'} ${
        step > dataStepCounter && 'filled'
      }`}
    >
      <span
        className='step-menu-bagde'
        data-step-counter={dataStepCounter}
      ></span>
      <span className='step-menu-label'>
        {StepsLabels[dataStepCounter - 1]}
      </span>
    </li>
  )
}

export default StepMenuStep
