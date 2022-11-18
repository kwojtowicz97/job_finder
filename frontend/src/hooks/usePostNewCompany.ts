import { useMutation, useQueryClient } from '@tanstack/react-query'
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
  const queryClient = useQueryClient()
  const { userInfo } = useContext(userContext)
  const configFile = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo?.token}`,
    },
  }
  const postNewCompany = async (company: CompanyCreateData) => {
    const { data } = await axios.post('/api/companies', company, configFile)
    queryClient.invalidateQueries(['userInfo'])
    return data
  }

  return useMutation(['postNewCompany'], postNewCompany)
}
