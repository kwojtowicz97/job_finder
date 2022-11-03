import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Company } from '../types/Company'

type DataResponse = Company[]

interface Props {
  companySearch: string
  locationSearch: string
}

const useListAllCompanies = ({ companySearch, locationSearch }: Props) => {
  const listOffers = async () => {
    const { data } = await axios.get(
      `/api/companies?company=${companySearch}&location=${locationSearch}`
    )
    return data
  }

  return useQuery<DataResponse, Error>(['listAllCompanies'], listOffers)
}

export default useListAllCompanies
