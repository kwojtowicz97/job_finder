import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../App'

interface Props {
  children?: JSX.Element
  type: 'logged' | 'user' | 'company' | 'notLogged' | 'any'
}

const Protect = ({ children, type }: Props) => {
  const { userInfo } = useContext(userContext)
  const navigate = useNavigate()

  useEffect(() => {
    let allow = false
    switch (type) {
      case 'logged':
        if (userInfo) allow = true
        break
      case 'user':
        if (!userInfo?.company) allow = true
        break
      case 'company':
        if (userInfo?.company) allow = true
        break
      case 'notLogged':
        if (!userInfo) allow = true
        break
      case 'any':
        allow = true
    }

    if (!allow) navigate('/')
  }, [userInfo])
  return <>{children}</>
}

export default Protect
