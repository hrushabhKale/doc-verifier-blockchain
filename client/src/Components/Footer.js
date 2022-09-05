import React from 'react'
import './../Assets/css/Navbar.css';
import image1 from './../Assets/images/Logo.jpg';
import image2 from './../Assets/images/instagram.png';
import { useEffect } from 'react'
import Aos from 'aos';
import "aos/dist/aos.css";
import './../Assets/css/Footer.css';

export default function Footer() {
  useEffect(() => {
    Aos.init({  
         duration: 2000 });
},[]);
  return (
    <>
    <section id='contact'>
      <footer>
      <div className="container-fluid Footer-banner text-light">
        <div className='row d-sm-flex align-items-center justify-content-between footer-row text-left '>
          <div className="div footer-about col-md-4 p-1">
            <img class="img-fluid logo" src={image1} alt=""/>
            <h3>Nanostuffs Technologies</h3>
            <p>Suyog Center, Pune, Maharashta - 411041</p>
          </div>

          <div className="div footer-list col-md-4 p-1">
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">What we Do ?</a></li>
              <li><a href="#">Product</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className='footer-subscription col-md-4 p-1'>
            <h5>Subscribe to get Important updates</h5>
            <form action='#'>
              {/* <input type={'email'} required autoComplete='off' placeholder='Email'/>
              <input type={'submit'} className="btn-outline-success btn" value="Subscribe" />
              <button class="btn btn-outline-success btns " type="submit">Subscribe</button> */}

              <div className='row'>
                <div class="col-md-5 col-12">
                  <div class="form-outline form-white mb-2">
                    <input type="email" id="form5Example21" class="form-control" placeholder='Email' />
                  </div>
                </div>
                <div class="col-auto">
                  <button type="submit" class="btn btn-outline-light">
                    Subscribe
                  </button>
                </div>
              </div>
            </form>
            <div className="social-icons-wrapper m-4">
                    <div><a href="#" target="_blank"
                            rel="noopener noreferrer"><svg viewBox="0 0 64 64" width="40" height="40">
                                <circle cx="32" cy="32" r="31" fill="#3b5998"></circle>
                                <path
                                    d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z"
                                    fill="white"></path>
                            </svg></a></div>
                    <div><a href="#" target="_blank" rel="noopener noreferrer"><img
                                src={image2} width="40" height="40"/></a></div>
                    <div><a href="#" target="_blank" rel="noopener noreferrer"><svg
                                viewBox="0 0 64 64" width="40" height="40">
                                <circle cx="32" cy="32" r="31" fill="#00aced"></circle>
                                <path
                                    d="M48,22.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6 C41.7,19.8,40,19,38.2,19c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5c-5.5-0.3-10.3-2.9-13.5-6.9c-0.6,1-0.9,2.1-0.9,3.3 c0,2.3,1.2,4.3,2.9,5.5c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1c2.9,1.9,6.4,2.9,10.1,2.9c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C46,24.5,47.1,23.4,48,22.1z"
                                    fill="white"></path>
                            </svg></a></div>
                    <div><a href="#" target="_blank"
                            rel="noopener noreferrer"><svg viewBox="0 0 64 64" width="40" height="40">
                                <circle cx="32" cy="32" r="31" fill="#007fb1"></circle>
                                <path
                                    d="M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z"
                                    fill="white"></path>
                            </svg></a></div>
                </div>

          </div>
        </div>
      </div>

            <div className="desktop-copyright-text bg-dark text-light">
                <p className='m-2'>©Copyright 2022 Nanostuffs Technologies - All Rights Reserved</p>
            </div>
      </footer>    

    </section>
    </>
  )
}
