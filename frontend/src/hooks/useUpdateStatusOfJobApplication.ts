import React, { FormEvent, useContext, useState } from 'react'
import { userContext } from '../App'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { Status } from '../components/JobApplication'

interface RequestBody {
  status: Status
}

const useUpdateStatusOfJobApplication = (applicationId: string) => {
  const { userInfo } = useContext(userContext)

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo?.token}`,
    },
  }

  const updatedJobApplication = async (applicationStatus: RequestBody) => {
    const { data } = await axios.put(
      `/api/applications/${applicationId}`,
      applicationStatus,
      config
    )
    return data
  }

  return useMutation<any, Error, RequestBody>(
    ['updateStatusOfJobApplication'],
    updatedJobApplication
  )
}

export default useUpdateStatusOfJobApplication
