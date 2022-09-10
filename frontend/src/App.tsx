import React from 'react'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import OfferDetailScreen from './screens/OfferDetailScreen'
import Footer from './components/Footer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <main className='py-3 my-auto'>
          <Container fluid='lg' className='cnt'>
            <Routes>
              <Route path='/offer/:id' element={<OfferDetailScreen />} />
              <Route path='/' element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </QueryClientProvider>
  )
}

export default App
