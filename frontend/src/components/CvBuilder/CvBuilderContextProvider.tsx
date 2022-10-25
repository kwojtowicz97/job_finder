import React, { createContext, useContext, useRef, useState } from 'react'
import { userContext } from '../../App'
import { usePersistedState } from '../../hooks/usePersistedState'

export interface PersonalInfoCardState {
  name: string | undefined
  setName: React.Dispatch<React.SetStateAction<string | undefined>> | undefined
  dateOfBirth: string
  setDateOfBirth: React.Dispatch<React.SetStateAction<string>> | undefined
  country: string | undefined
  setCountry:
    | React.Dispatch<React.SetStateAction<string | undefined>>
    | undefined
  city: string | undefined
  setCity: React.Dispatch<React.SetStateAction<string | undefined>> | undefined
  phoneNumber: string | undefined
  setPhoneNumber:
    | React.Dispatch<React.SetStateAction<string | undefined>>
    | undefined
  email: string | undefined
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>> | undefined
}

export interface JobExperienceItem {
  startDate: string
  endDate: string
  position: string
  company: string
  location: string
  description: string
}

export interface EducationItem {
  startDate: string
  endDate: string
  levelOfEducation: string
  school: string
  major: string
}

export interface LanguagesItem {
  language: string
  level: string
}

export interface ExperienceCardState {
  jobExperienceItems: JobExperienceItem[] | []
  setJobExperienceItems:
    | React.Dispatch<React.SetStateAction<JobExperienceItem[] | []>>
    | undefined
  educationItems: EducationItem[] | []
  setEducationItems:
    | React.Dispatch<React.SetStateAction<EducationItem[] | []>>
    | undefined
  languagesItems: LanguagesItem[] | []
  setLanguagesItems:
    | React.Dispatch<React.SetStateAction<LanguagesItem[] | []>>
    | undefined
}

export interface SkillsCardState {
  skillsItems: string[]
  setSkillsItems: React.Dispatch<React.SetStateAction<string[]>> | undefined
  hobbyItems: string[]
  setHobbyItems: React.Dispatch<React.SetStateAction<string[]>> | undefined
}

export interface CvBuilderContext {
  personalInfoCardState: PersonalInfoCardState
  experienceCardState: ExperienceCardState
  skillsCardState: SkillsCardState
  previewDiv?: React.RefObject<HTMLDivElement>
}

export const cvBuilderContext = createContext<CvBuilderContext>({
  skillsCardState: {
    hobbyItems: [],
    setHobbyItems: undefined,
    skillsItems: [],
    setSkillsItems: undefined,
  },
  personalInfoCardState: {
    name: '',
    setName: undefined,
    dateOfBirth: '',
    setDateOfBirth: undefined,
    country: '',
    setCountry: undefined,
    city: '',
    setCity: undefined,
    phoneNumber: '',
    setPhoneNumber: undefined,
    email: '',
    setEmail: undefined,
  },
  experienceCardState: {
    educationItems: [],
    setEducationItems: undefined,
    jobExperienceItems: [],
    setJobExperienceItems: undefined,
    languagesItems: [],
    setLanguagesItems: undefined,
  },
})

type Props = {
  children: JSX.Element | JSX.Element[] | string | string[]
}

const CvBuilderContextProvider = ({ children }: Props) => {
  const previewDiv = useRef<HTMLDivElement>(null)

  const { userInfo } = useContext(userContext)

  const [name, setName] = usePersistedState<string | undefined>(
    userInfo?.name,
    'name'
  )
  const [dateOfBirth, setDateOfBirth] = usePersistedState<string>(
    '',
    'dateOfBirth'
  )
  const [country, setCountry] = usePersistedState<string | undefined>(
    userInfo?.country,
    'country'
  )
  const [city, setCity] = usePersistedState<string | undefined>(
    userInfo?.city,
    'city'
  )
  const [phoneNumber, setPhoneNumber] = usePersistedState<string | undefined>(
    userInfo?.phoneNumber,
    'phoneNumber'
  )
  const [email, setEmail] = usePersistedState<string | undefined>(
    userInfo?.email,
    'email'
  )

  const [jobExperienceItems, setJobExperienceItems] = usePersistedState<
    JobExperienceItem[] | []
  >([], 'jobExperienceItems')
  const [educationItems, setEducationItems] = usePersistedState<
    EducationItem[] | []
  >([], 'educationItems')
  const [languagesItems, setLanguagesItems] = usePersistedState<
    LanguagesItem[] | []
  >([], 'languagesItems')

  const [skillsItems, setSkillsItems] = usePersistedState<string[]>(
    [],
    'skillsItems'
  )
  const [hobbyItems, setHobbyItems] = usePersistedState<string[]>(
    [],
    'hobbyItems'
  )

  const personalInfoCardState: PersonalInfoCardState = {
    name,
    setName,
    dateOfBirth,
    setDateOfBirth,
    country,
    setCountry,
    city,
    setCity,
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail,
  }

  const experienceCardState: ExperienceCardState = {
    educationItems,
    setEducationItems,
    jobExperienceItems,
    setJobExperienceItems,
    languagesItems,
    setLanguagesItems,
  }

  const skillsCardState: SkillsCardState = {
    skillsItems,
    setSkillsItems,
    hobbyItems,
    setHobbyItems,
  }

  return (
    <cvBuilderContext.Provider
      value={{
        skillsCardState,
        personalInfoCardState,
        experienceCardState,
        previewDiv,
      }}
    >
      {children}
    </cvBuilderContext.Provider>
  )
}

export default CvBuilderContextProvider
