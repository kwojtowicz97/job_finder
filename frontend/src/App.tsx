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
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
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
import CvBuilder from './screens/CvBuilderScreen'
import Protect from './components/Protect'
import FavouritesScreen from './screens/FavouritesScreen'
import { Auth } from './components/Auth'

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
    <QueryClientProvider client={queryClient}>
      <userContext.Provider value={{ userInfo, setUserInfo }}>
        <Auth>
          <toastContext.Provider value={{ toast, setToast }}>
            <Router>
              <Header />
              {/* <MainNavBar /> */}
              <div ref={portalContainer} className='portal-container' />
              <main className='p-0 p-lg-3'>
                <Container fluid='lg' className='cnt py-3'>
                  <Routes>
                    <Route
                      path='/offer/:id'
                      element={
                        <Protect type='any'>
                          <OfferDetailScreen />
                        </Protect>
                      }
                    />
                    <Route
                      path='/'
                      element={
                        <Protect type='any'>
                          <HomeScreen portalContainer={portalContainer} />
                        </Protect>
                      }
                    />
                    <Route
                      path='/register'
                      element={
                        <Protect type='notLogged'>
                          <RegisterScreen />
                        </Protect>
                      }
                    />
                    <Route
                      path='/company/:id'
                      element={
                        <Protect type='any'>
                          <CompanyScreen />
                        </Protect>
                      }
                    />
                    <Route
                      path='/companies'
                      element={
                        <Protect type='any'>
                          <CompaniesScreen />
                        </Protect>
                      }
                    />
                    <Route
                      path='/login'
                      element={
                        <Protect type='notLogged'>
                          <LoginScreen />
                        </Protect>
                      }
                    />
                    <Route
                      path='/profile'
                      element={
                        <Protect type='logged'>
                          <ProfileScreen />
                        </Protect>
                      }
                    />
                    <Route
                      path='/favourites'
                      element={
                        <Protect type='logged'>
                          <FavouritesScreen />
                        </Protect>
                      }
                    />
                    <Route
                      path='/newoffer'
                      element={
                        <Protect type='company'>
                          <NewOfferScreen />
                        </Protect>
                      }
                    />
                    <Route
                      path='/apply/:id'
                      element={
                        <Protect type='user'>
                          <ApplyScreen />
                        </Protect>
                      }
                    />
                    <Route
                      path='/newcompany'
                      element={
                        <Protect type='user'>
                          <NewComapnyScreen />
                        </Protect>
                      }
                    />
                    <Route
                      path='/recieved-applications'
                      element={
                        <Protect type='company'>
                          <RecievedJobApplicationsScreen />
                        </Protect>
                      }
                    />
                    <Route
                      path='/send-applications'
                      element={
                        <Protect type='user'>
                          <SendJobApplicationsScreen />
                        </Protect>
                      }
                    />
                    <Route
                      path='/cv-builder'
                      element={
                        <Protect type='user'>
                          <CvBuilder />
                        </Protect>
                      }
                    />
                  </Routes>
                </Container>
              </main>
              <Footer />
            </Router>
            {toast.trigger && <ToastMessage />}
          </toastContext.Provider>
        </Auth>
      </userContext.Provider>
    </QueryClientProvider>
  )
}

export default App
