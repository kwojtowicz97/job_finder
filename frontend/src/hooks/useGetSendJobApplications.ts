import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'
import { userContext } from '../App'
import { JobApplication } from '../types/JobApplication'

export interface ApplicationsByOffer {
  [key: string]: {
    applications: JobApplication[]
    offerTitle: string
    _id: string
  }
}

const useGetSendJobApplications = () => {
  const { userInfo } = useContext(userContext)

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo?.token}`,
    },
  }
  const listSendJobApplications = async () => {
    const { data }: { data: JobApplication[] } = await axios.get(
      `/api/applications`,
      config
    )

    const applicationsByOffer: ApplicationsByOffer = {}

    console.log(data)

    data.forEach((application) => {
      if (applicationsByOffer.hasOwnProperty(application.offer._id)) {
        applicationsByOffer[application.offer._id].applications!.push(
          application
        )
      } else {
        applicationsByOffer[application.offer._id] = {
          applications: [application],
          offerTitle: application.offer.title,
          _id: application.offer._id,
        }
      }
    })

    console.log(applicationsByOffer)
    return applicationsByOffer
  }
  return useQuery<ApplicationsByOffer, Error>([`listSendJobApplications`], () =>
    listSendJobApplications()
  )
}

export default useGetSendJobApplications
