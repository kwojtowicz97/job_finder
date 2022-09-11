import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import OfferDetailScreen from './screens/OfferDetailScreen'
import RegisterScreen from './screens/RegisterScreen'
import Footer from './components/Footer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastMessage } from './components/ToastMessage'
import { UserInfo } from './types/User'

const queryClient = new QueryClient()

export type UserContextType = {
  userInfo: UserInfo | null
  setUserInfo: Dispatch<SetStateAction<UserInfo | null>> | null
}

export const userContext = createContext<UserContextType>({
  userInfo: null,
  setUserInfo: null,
})

function App() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  return (
    <userContext.Provider value={{ userInfo, setUserInfo }}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Header />
          <main className='py-3'>
            <Container fluid='lg' className='cnt'>
              <Routes>
                <Route path='/offer/:id' element={<OfferDetailScreen />} />
                <Route path='/' element={<HomeScreen />} />
                <Route path='/register' element={<RegisterScreen />} />
              </Routes>
            </Container>
          </main>
          <Footer />
        </Router>
        <ToastMessage />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </userContext.Provider>
  )
}

export default App
