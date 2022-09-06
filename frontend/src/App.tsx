import React from 'react'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import OfferDetailScreen from './screens/OfferDetailScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container fluid='lg' className='cnt'>
          <Routes>
            <Route path='/offer/:id' element={<OfferDetailScreen />} />
            <Route path='/' element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
    </Router>
  )
}

export default App
