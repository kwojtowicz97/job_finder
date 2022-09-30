import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Offer } from '../types'
import { Company } from '../types/Company'

export interface FetchedCompanyData {
  company: Company
  offers: Array<Offer>
}

const useGetCompanyDetails = (companyId: string | undefined) => {
  const listComapnyDetails = async (id: string) => {
    const { data } = await axios.get(`/api/companies/${id}`)
    return data
  }
  return useQuery<FetchedCompanyData, Error>(
    [`listComapnyDetails:${companyId || undefined}`],
    () => listComapnyDetails(companyId || '')
  )
}

export default useGetCompanyDetails
