import React, { useContext, useEffect } from 'react'
import { userContext } from '../App'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { FormEvent } from 'react'

const useUploadFile = (
  setUploadFile: React.Dispatch<React.SetStateAction<string | undefined>>
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
    const { data } = await axios.post('/api/uploads/cv', formData, configFile)
    return data
  })

  const sendFileHandler = (e: FormEvent) => {
    const target = e.target as HTMLInputElement
    if (target.files !== null) {
      const formData = new FormData()

      const file = target.files[0]
      formData.append('file', file)

      mutateAsyncCv(formData)
    }
  }

  useEffect(() => {
    if (isSend) {
      setUploadFile(dataResponse)
    }
  }, [isSend, dataResponse, setUploadFile])

  return { sendFileHandler, isSending, isSend }
}

export default useUploadFile
