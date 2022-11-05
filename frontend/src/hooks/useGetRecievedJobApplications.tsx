import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { application } from 'express'
import { off } from 'process'
import { useContext } from 'react'
import { userContext } from '../App'
import { Offer } from '../types'
import { JobApplication } from '../types/JobApplication'

export interface ApplicationByOffer {
  applications: JobApplication[]
  offerTitle: string
  _id: string
}

const useGetRecievedJobApplications = () => {
  const { userInfo } = useContext(userContext)

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo?.token}`,
    },
  }
  const listRecievedJobApplications = async () => {
    const { data }: { data: Offer[] } = await axios.get(
      `/api/applications/received-job-applications`,
      config
    )

    const applicationsByOffer: ApplicationByOffer[] = data.map((offer) => {
      return {
        _id: offer._id,
        applications: offer.jobApplications,
        offerTitle: offer.title,
      }
    })
    return applicationsByOffer
  }
  return useQuery<ApplicationByOffer[], Error>(
    [`listRecievedJobApplications`],
    () => listRecievedJobApplications()
  )
}

export default useGetRecievedJobApplications
