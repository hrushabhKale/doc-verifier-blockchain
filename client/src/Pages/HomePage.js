import React from 'react'
import AboutUS from '../Components/AboutUS'
import Cards from '../Components/Cards'
import Footer from '../Components/Footer'
import HomeCarousel from '../Components/HomeCarousel'
import Navbar from '../Components/Navbar'
import TimelineSection from '../Components/TimelineSection'
import VideoSection from '../Components/VideoSection'

export default function HomePage() {
  return (
    <>
     <Navbar/>
     <HomeCarousel/>
     <VideoSection/>
     <Cards/>
     <TimelineSection/>
     <AboutUS/>
     <Footer/>
    </>
  )
}
