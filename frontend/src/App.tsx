import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from 'react'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import OfferDetailScreen from './screens/OfferDetailScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import ProfileScreen from './screens/ProfileScreen'
import NewOfferScreen from './screens/NewOfferScreen'
import Footer from './components/Footer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastMessage } from './components/ToastMessage'
import { UserInfo } from './types/User'
import { usePersistedState } from './hooks/usePersistedState'
import { ApplyScreen } from './screens/ApplyScreen'
import { NewComapnyScreen } from './screens/NewComapnyScreen'
import CompanyScreen from './screens/CompanyScreen'
import MainNavBar from './components/MainNavBar'
import RecievedJobApplicationsScreen from './screens/RecievedJobApplicationsScreen'
import CompaniesScreen from './screens/CompaniesScreen'
import SendJobApplicationsScreen from './screens/SendJobApplicationsScreen'

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

  const portalContainer = useRef<HTMLDivElement>(null)

  const [toast, setToast] = useState<Toast>({ trigger: false })
  return (
    <userContext.Provider value={{ userInfo, setUserInfo }}>
      <toastContext.Provider value={{ toast, setToast }}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Header />
            <MainNavBar />
            <div ref={portalContainer} className='portal-container' />
            <main className='p-3'>
              <Container fluid='lg' className='cnt'>
                <Routes>
                  <Route path='/offer/:id' element={<OfferDetailScreen />} />
                  <Route
                    path='/'
                    element={<HomeScreen portalContainer={portalContainer} />}
                  />
                  <Route path='/register' element={<RegisterScreen />} />
                  <Route path='/company/:id' element={<CompanyScreen />} />
                  <Route path='/companies' element={<CompaniesScreen />} />
                  <Route path='/login' element={<LoginScreen />} />
                  <Route path='/profile' element={<ProfileScreen />} />
                  <Route
                    path='/company/newoffer'
                    element={<NewOfferScreen />}
                  />
                  <Route path='/apply/:id' element={<ApplyScreen />} />
                  <Route path='/newcompany' element={<NewComapnyScreen />} />
                  <Route
                    path='/recieved-applications'
                    element={<RecievedJobApplicationsScreen />}
                  />
                  <Route
                    path='/send-applications'
                    element={<SendJobApplicationsScreen />}
                  />
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
