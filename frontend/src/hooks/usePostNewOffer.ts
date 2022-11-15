import React, { FormEvent, useContext, useState } from 'react'
import { userContext } from '../App'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'

interface SendOfferData {
  title: string
  address: string
  localization: string
  contractType: string
  time: string
  experience: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  expiresAt: string
}

const usePostOffer = () => {
  const { userInfo } = useContext(userContext)

  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [localization, setLocalization] = useState('')
  const [contractType, setContractType] = useState('')
  const [time, setTime] = useState('')
  const [experience, setExperience] = useState('')
  const [responsibiltyInput, setResponsibiltyInput] = useState<string>('')
  const [responsibilities, setResponsibilities] = useState<string[]>([])
  const [requirementInput, setRequirementInput] = useState<string>('')
  const [requirements, setRequirements] = useState<string[]>([])
  const [benefitsInput, setBenefitsInput] = useState<string>('')
  const [benefits, setBenefits] = useState<string[]>([])
  const [expiresAt, setExpiresAt] = useState('')

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo?.token}`,
    },
  }

  const sendOffer = async (offer: SendOfferData) => {
    const { data } = await axios.post(`/api/offers`, offer, config)
    return data
  }

  const postOffer = useMutation<any, Error, SendOfferData>(
    ['postOffer'],
    sendOffer
  )
  const submitHandler = (e: FormEvent) => {
    e.preventDefault()

    postOffer.mutateAsync({
      title,
      address,
      localization,
      contractType,
      experience,
      responsibilities,
      requirements,
      benefits,
      expiresAt,
      time,
    })
  }
  const applicationStates = {
    title,
    setTitle,
    address,
    setAddress,
    localization,
    setLocalization,
    contractType,
    setContractType,
    experience,
    setExperience,
    responsibilities,
    setResponsibilities,
    requirements,
    setRequirements,
    benefits,
    setBenefits,
    expiresAt,
    setExpiresAt,
    time,
    setTime,
    responsibiltyInput,
    setResponsibiltyInput,
    requirementInput,
    setRequirementInput,
    benefitsInput,
    setBenefitsInput,
  }

  return { applicationStates, postOffer, submitHandler }
}

export default usePostOffer
