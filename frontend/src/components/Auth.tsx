import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import { userContext } from '../App'

interface Props {
  children?: JSX.Element
}

export const Auth = ({ children }: Props) => {
  const { userInfo, setUserInfo } = useContext(userContext)
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo?.token}`,
    },
  }

  const getUserData = async () => {
    const { data } = await axios.get('/api/users', config)
    setUserInfo!(data)
    return data
  }

  useQuery(['userInfo'], getUserData)
  return <>{children}</>
}
