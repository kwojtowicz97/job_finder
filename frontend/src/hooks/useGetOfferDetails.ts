import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Offer } from '../types'

const useGetOfferDetails = (offerId: string | undefined) => {
  const listOfferDetails = async (id: string) => {
    const { data } = await axios.get(`/api/offers/${id}`)
    return data
  }
  const getApplicationDetails = useQuery<Offer, Error>(
    [`listOfferDetails:${offerId || undefined}`],
    () => listOfferDetails(offerId || '')
  )
  return getApplicationDetails
}

export default useGetOfferDetails
