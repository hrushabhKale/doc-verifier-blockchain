import React from 'react'
import { useEffect } from 'react'
import Aos from 'aos';
import "aos/dist/aos.css";

export default function AboutUS() {
    useEffect(() => {
        Aos.init({
             offset: 300,
             duration: 500 });
    },[]);
  return (
    <div>
    <section className='big-banner2 text-light'>
      <div className='container big-banner2 text-light text-center p-4'>
        <div className='about-us'>
          <h2 data-aos='slide-up'>About Us</h2>
        </div>
        <div className='desp justify-content-center'>
          <p style={{ fontFamily: "InterRegular"}} data-aos='slide-up' > Nanostuffs was founded in Oct 2010. Has its headquaters in Pune (India),
           extending operations & sales offices in Mumbai (India), Columbus OH (USA), Dubai (UAE) and Singapore.
            So far we have grown to an experience of 230+ Salesforce Implementations,
             400+ Mobile Apps Developed & several AI/ML/Blockchain projects.</p>
        </div>
      </div>

    </section>
    </div>
  )
}
