import React from 'react'
import Hero from './Hero/Hero'
import About from './About/About'
import BookMark from './BookMark/BookMark'
import Footer from '../../components/Footer/Footer'
import Navbar from './Navbar/Navbar'

const Home = () => {
  return (
    <div className='overflow-hidden'>
      <Navbar/>
      <Hero/>
      <About/>
      <BookMark/>
     
    </div>
  )
}

export default Home
