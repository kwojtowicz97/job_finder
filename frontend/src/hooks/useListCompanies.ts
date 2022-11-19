import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { Company } from '../types/Company'

type DataResponse = { companies: Company[]; page: number; pages: number }

interface Props {
  companySearch: string
  locationSearch: string
  pageNumber: number
  setShowResetButton: React.Dispatch<React.SetStateAction<boolean>>
}

const useListCompanies = ({
  companySearch,
  locationSearch,
  pageNumber,
}: Props) => {
  const [trigger, setTrigger] = useState(false)
  const listOffers = async () => {
    const { data } = await axios.get(
      `/api/companies?company=${companySearch}&location=${locationSearch}&pageNumber=${pageNumber}`
    )
    return data
  }

  return {
    setTrigger,
    query: useQuery<DataResponse, Error>(
      ['listCompanies', trigger],
      listOffers
    ),
  }
}

export default useListCompanies
