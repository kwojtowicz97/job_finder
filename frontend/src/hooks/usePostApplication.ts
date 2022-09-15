import React, { FormEvent, useContext, useState } from 'react'
import { userContext } from '../App'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'

interface SendApplicationData {
  name: string
  email: string
  phoneNumber: string
  country: string
  city: string
  experience: string
  cvFile: string
}

const usePostApplication = (offerId: string) => {
  const { userInfo } = useContext(userContext)

  const [name, setName] = useState<string>(userInfo!.name)
  const [email, setEmail] = useState<string>(userInfo!.email)
  const [phoneNumber, setPhoneNumber] = useState<string>(userInfo!.phoneNumber)
  const [country, setCountry] = useState<string>(userInfo!.country)
  const [city, setCity] = useState<string>(userInfo!.city)
  const [experience, setExperience] = useState<string | undefined>(undefined)
  const [cvFile, setCvFile] = useState<string | undefined>(undefined)

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo?.token}`,
    },
  }

  const sendApplication = async (application: SendApplicationData) => {
    const { data } = await axios.post(
      `/api/applications/${offerId}`,
      application,
      config
    )
    return data
  }

  const postApplication = useMutation<any, Error, SendApplicationData>(
    ['registerResponse'],
    sendApplication
  )
  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (experience && cvFile) {
      postApplication.mutateAsync({
        name,
        email,
        phoneNumber,
        country,
        city,
        experience,
        cvFile,
      })
    }
  }
  const applicationStates = {
    name,
    setName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    country,
    setCountry,
    city,
    setCity,
    experience,
    setExperience,
    cvFile,
    setCvFile,
  }

  return { applicationStates, postApplication, submitHandler }
}

export default usePostApplication
