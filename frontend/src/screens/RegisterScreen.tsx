import React from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Button } from 'react-bootstrap'

interface UserData {
  name: string
  email: string
  password: string
}
const RegisterScreen = () => {
  const { data, error, isLoading, mutate } = useMutation((user: UserData) =>
    axios.post('/api/users', user)
  )

  const user = { name: 'john', email: 'john@example.com', password: '1234' }

  return (
    <div>
      <Button onClick={() => mutate(user)}>Register</Button>
    </div>
  )
}

export default RegisterScreen
