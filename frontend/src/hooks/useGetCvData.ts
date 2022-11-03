import React, { useContext } from 'react'
import { userContext } from '../App'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import {
  ExperienceCardState,
  PersonalInfoCardState,
  SkillsCardState,
} from '../components/CvBuilder/CvBuilderContextProvider'

const useGetCvData = () => {
  const { userInfo } = useContext(userContext)

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo?.token}`,
    },
  }

  const getCvData = async () => {
    const { data } = await axios.get('/api/users/cvData', config)
    return data
  }

  return useQuery<
    | {
        experienceCardState: ExperienceCardState
        personalInfoCardState: PersonalInfoCardState
        skillsCardState: SkillsCardState
      }
    | undefined,
    Error
  >(['updateStatusOfJobApplication'], getCvData)
}

export default useGetCvData
