import React from 'react'
import Hero from './Hero/Hero'
import About from './About/About'
import BookMark from './BookMark/BookMark'
import Footer from '../Footer/Footer'
import Navbar from './Navbar/Navbar'

const Home = () => {
  return (
    <div className='overflow-hidden'>
      <Navbar/>
      <Hero/>
      <About/>
      <BookMark/>
      <Footer/>
    </div>
  )
}

export default Home
