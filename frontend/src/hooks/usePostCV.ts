import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { userContext } from '../App'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { FormEvent } from 'react'

const usePostCV = (
  offerId: string,
  setCvFile: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  const { userInfo } = useContext(userContext)
  const configFile = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${userInfo?.token}`,
    },
  }
  const {
    mutateAsync: mutateAsyncCv,
    data: dataResponse,
    isLoading: isSending,
    isSuccess: isSend,
  } = useMutation<any, Error, FormData>(async (formData) => {
    const { data } = await axios.post('/api/uploads', formData, configFile)
    return data
  })

  const sendCvHandler = (e: FormEvent) => {
    const target = e.target as HTMLInputElement
    if (target.files !== null && userInfo?._id && offerId) {
      const formData = new FormData()
      formData.append('userId', userInfo?._id)
      formData.append('offerId', offerId)

      const file = target.files[0]
      formData.append('file', file)

      mutateAsyncCv(formData)
    }
  }

  useEffect(() => {
    if (isSend) {
      setCvFile(dataResponse)
    }
  }, [isSend])

  return { sendCvHandler, isSending, isSend }
}

export default usePostCV
