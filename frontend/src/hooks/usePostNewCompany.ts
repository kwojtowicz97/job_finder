import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'
import { userContext } from '../App'

interface CompanyCreateData {
  name: string
  country: string
  city: string
  address: string
  phoneNumber: string
  image: string | undefined
  description: string | undefined
}

export const usePostNewCompany = () => {
  const { userInfo } = useContext(userContext)
  const configFile = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo?.token}`,
    },
  }
  const postNewCompany = async (company: CompanyCreateData) => {
    const { data } = await axios.post('/api/companies', company, configFile)
    return data
  }

  return useMutation(['postNewCompany'], postNewCompany)
}
