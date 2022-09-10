import React from 'react'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container, Toast, ToastContainer } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import OfferDetailScreen from './screens/OfferDetailScreen'
import RegisterScreen from './screens/RegisterScreen'
import Footer from './components/Footer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastMessage } from './components/ToastMessage'

const queryClient = new QueryClient()

function App() {
  return (
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
  )
}

export default App
