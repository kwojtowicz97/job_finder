import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Company } from '../types/Company'

type DataResponse = { companies: Company[]; page: number; pages: number }

interface Props {
  companySearch: string
  locationSearch: string
  pageNumber: number
}

const useListCompanies = ({
  companySearch,
  locationSearch,
  pageNumber,
}: Props) => {
  const listOffers = async () => {
    const { data } = await axios.get(
      `/api/companies?company=${companySearch}&location=${locationSearch}&pageNumber=${pageNumber}`
    )
    return data
  }

  return useQuery<DataResponse, Error>(['listCompanies'], listOffers)
}

export default useListCompanies
