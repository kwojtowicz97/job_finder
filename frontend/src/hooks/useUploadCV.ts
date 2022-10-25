import React, { useContext, useEffect } from 'react'
import { userContext } from '../App'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { FormEvent } from 'react'

const useUploadCV = (
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
  } = useMutation<any, Error, FormData>(async (cvFile) => {
    const { data } = await axios.post('/api/uploads/cv', cvFile, configFile)
    return data
  })

  const sendFileHandler = (cvFile: Blob) => {
    const file = cvFile as Blob
    const formData = new FormData()

    formData.append('file', file)

    mutateAsyncCv(formData)
  }

  useEffect(() => {
    if (isSend) {
      setUploadFile(dataResponse)
    }
  }, [isSend, dataResponse, setUploadFile])

  return { sendFileHandler, isSending, isSend }
}

export default useUploadCV
