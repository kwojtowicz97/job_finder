import React, { useContext, useEffect } from 'react'
import { userContext } from '../App'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { FormEvent } from 'react'

const usePostLogo = (
  setLogoFile: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  const { userInfo } = useContext(userContext)
  const configFile = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${userInfo?.token}`,
    },
  }
  const { mutateAsync, data, isLoading, isSuccess } = useMutation<
    any,
    Error,
    FormData
  >(async (formData) => {
    const { data } = await axios.post('/api/uploads/logo', formData, configFile)
    return data
  })

  const sendLogoHandler = (e: FormEvent) => {
    const target = e.target as HTMLInputElement
    if (target.files !== null) {
      const formData = new FormData()

      const file = target.files[0]
      formData.append('file', file)

      mutateAsync(formData)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setLogoFile(data)
    }
  }, [isSuccess])

  return { sendLogoHandler, isLoading, isSuccess }
}

export default usePostLogo
