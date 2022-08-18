import * as React from 'react';
import './../Assets/css/timeLine.css';
import { useEffect } from 'react'
import Aos from 'aos';
import "aos/dist/aos.css";

export default function Timeline2() {
    useEffect(() => {
        Aos.init({
             offset: 300,
             duration: 2500 });
    },[]);
  return (
    <>
              <section className='timeline-section'>
            <div className="timeline-items">
                    <div className="timeline-item">
                    <div className="timeline-dot text-center"><p className='text-dark' data-aos='zoom-in'><b>1</b></p></div>
                    <div className="timeline-date"></div>
                    <div className="timeline-content" data-aos='flip-left'>
                        <h3>Login</h3>
                        <p></p>
                    </div>
                    </div>

                    <div className="timeline-item">
                    <div className="timeline-dot text-center"><p className='text-dark' data-aos='zoom-in'><b>2</b></p></div>
                    <div className="timeline-date"></div>
                    <div className="timeline-content" data-aos='flip-right'>
                        <h3>Unique Id</h3>
                        <p>Pass the unique id to verify a certificate</p>
                    </div>
                    </div>

                    <div className="timeline-item">
                    <div className="timeline-dot text-center"><p className='text-dark' data-aos='zoom-in'><b>3</b></p></div>
                    <div className="timeline-date"></div>
                    <div className="timeline-content" data-aos='flip-left'>
                        <h3>Show</h3>
                        <p>Certificate is in View as well as Download</p>
                    </div>
                    </div>

                    <div className="timeline-item">
                    <div className="timeline-dot text-center"><p className='text-dark'data-aos='zoom-in'><b>4</b></p></div>
                    <div className="timeline-date"></div>
                    <div className="timeline-content" data-aos='flip-right'>
                        <h3>Authenticition</h3>
                        <p>Access to issuers authenticity</p>
                    </div>
                    </div>
            </div>
        </section>
    </>
  )
}
