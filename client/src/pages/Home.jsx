import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import LiveStats from '../components/LiveStats'
import AiTools from '../components/AiTools'
import Testimonial from '../components/Testimonial'
import Plan from '../components/Plan'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AiTools />
      <LiveStats />
      <Plan />
      <Testimonial />
      <Footer />
    </>
  )
}

export default Home