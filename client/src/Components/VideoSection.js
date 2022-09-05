import React, { useEffect } from 'react'
import Aos from 'aos';
import "aos/dist/aos.css";

export default function VideoSection() {
    useEffect(() => {
        Aos.init({ duration: 2000 });
    },[]);
  return (
    <>
    <section class="big-banner2 text-light p-5 text-center" id="what-we-do">
        <div class="container">
            <div class=" row d-sm-flex align-items-center justify-content-between">
                <div className='col-md-6 text-box' data-aos='fade-right'>
                    <h1>What is DocVerifier Platform ?</h1>
                      <p className='video-Paragraph '>Doc-Verifier is a platform where Governments, Universities and Companies can Issue and Validate all kind of Certificates,
                         We are using the Ethereum Blockchain and IPFS Technology.
                      </p>
                </div>
                <div className='col-md-6 video-lenght' data-aos='fade-left'>
                {/* <img class="img-fluid w-20 h-10 " src={image1} alt=""/> */}
                <iframe width="100%" height='100%' src="https://www.youtube.com/embed/tgbNymZ7vqY">
                  </iframe>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}
