import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import OfferDetailScreen from './screens/OfferDetailScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import Footer from './components/Footer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastMessage } from './components/ToastMessage'
import { UserInfo } from './types/User'
import { usePersistedState } from './hooks/usePersistedState'

const queryClient = new QueryClient()

export type UserContextType = {
  userInfo: UserInfo | null
  setUserInfo: Dispatch<SetStateAction<UserInfo | null>> | null
}

const userInfoFromLocalStorage = localStorage.getItem('userInfo') || null

const initialUserInfoValue = {
  userInfo: userInfoFromLocalStorage
    ? JSON.parse(userInfoFromLocalStorage)
    : null,
  setUserInfo: null,
}

export const userContext = createContext<UserContextType>(initialUserInfoValue)

interface Toast {
  trigger: boolean
  title?: string
  message?: string
}

export type ToastContextType = {
  toast: Toast
  setToast: Dispatch<SetStateAction<Toast>> | null
}

export const toastContext = createContext<ToastContextType>({
  toast: { trigger: false },
  setToast: null,
})

function App() {
  const [userInfo, setUserInfo] = usePersistedState<UserInfo | null>(
    initialUserInfoValue.userInfo,
    'userInfo'
  )

  const [toast, setToast] = useState<Toast>({ trigger: false })
  return (
    <userContext.Provider value={{ userInfo, setUserInfo }}>
      <toastContext.Provider value={{ toast, setToast }}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Header />
            <main className='py-3'>
              <Container fluid='lg' className='cnt'>
                <Routes>
                  <Route path='/offer/:id' element={<OfferDetailScreen />} />
                  <Route path='/' element={<HomeScreen />} />
                  <Route path='/register' element={<RegisterScreen />} />
                  <Route path='/register' element={<RegisterScreen />} />
                  <Route path='/login' element={<LoginScreen />} />
                </Routes>
              </Container>
            </main>
            <Footer />
          </Router>
          {toast.trigger && <ToastMessage />}
          <ReactQueryDevtools />
        </QueryClientProvider>
      </toastContext.Provider>
    </userContext.Provider>
  )
}

export default App
