import React, { FormEvent, useContext, useState } from 'react'
import { userContext } from '../App'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import useUploadFile from './useUploadFile'
import { FetchedCompanyData } from './useGetCompanyDetails'

export interface UpdateCompanyData {
  name: string
  country: string
  city: string
  address: string
  phoneNumber: string
  description: string
  logoURL: string | undefined
}

const useUpdateCompany = (
  companyId: string,
  initialState: FetchedCompanyData
) => {
  const { userInfo } = useContext(userContext)

  const [name, setName] = useState<string>(initialState.company.name)
  const [country, setCountry] = useState<string>(initialState.company.country)
  const [city, setCity] = useState<string>(initialState.company.city)
  const [address, setAddress] = useState<string>(initialState.company.address)
  const [phoneNumber, setPhoneNumber] = useState<string>(
    initialState.company.phoneNumber
  )
  const [description, setDescription] = useState<string>(
    initialState.company.description
  )
  const [logoURL, setLogoURL] = useState<string | undefined>(
    initialState.company.image
  )

  const { isSending, isSend, sendFileHandler } = useUploadFile(setLogoURL)

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo?.token}`,
    },
  }

  const updateCompany = async (application: UpdateCompanyData) => {
    const { data } = await axios.put(
      `/api/companies/${companyId}`,
      application,
      config
    )
    return data
  }

  const updateCompanyMutation = useMutation<any, Error, UpdateCompanyData>(
    ['updateCompany'],
    updateCompany
  )
  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    updateCompanyMutation.mutateAsync({
      name,
      country,
      city,
      address,
      phoneNumber,
      description,
      logoURL,
    })
  }
  const applicationStates = {
    name,
    setName,
    country,
    setCountry,
    city,
    setCity,
    address,
    setAddress,
    phoneNumber,
    setPhoneNumber,
    description,
    setDescription,
    logoURL,
    setLogoURL,
  }

  return {
    applicationStates,
    updateCompanyMutation,
    submitHandler,
    sendFileHandler,
  }
}

export default useUpdateCompany
