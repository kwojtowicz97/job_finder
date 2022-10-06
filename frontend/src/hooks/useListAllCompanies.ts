import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Company } from '../types/Company'

type DataResponse = Company[]

const useListAllCompanies = () => {
  const listOffers = async () => {
    const { data } = await axios.get('/api/companies')
    return data
  }

  return useQuery<DataResponse, Error>(['listAllCompanies'], listOffers)
}

export default useListAllCompanies
