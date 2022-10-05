import React from "react";
import TimeLine from "./TimeLine";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Timeline2 from "./Timeline2";

export default function TimelineSection() {
  useEffect(() => {
    Aos.init({
      offset: 300,
      duration: 2000,
    });
  }, []);
  return (
    <>
      <section>
        <div className="text-center big-banner2 text-light text-center p-5 timeline-Header">
          <h2 data-aos="slide-up">How to use Doc Verifier</h2>
          <p data-aos="slide-up">
            Doc Verifier is very easy to use, You can be certificate issuer as
            well as validator
          </p>
        </div>
      </section>

      <section className="Timeline-banner timeline-align text-light">
        <div className="container Timeline-banner text-light" id="timeline">
          {/* <div className='text-center'>
              <h2>How to use Doc Verifier</h2>
              <p>Doc Verifier is very easy to use, You can be certificate issuer as well as validator</p>
            </div> */}
          <div className="row d-sm-flex d-md-flex align-items-center justify-content-between p-4 ">
            <div className="col-md-12 col-sm-12 col-12 col-lg-6">
              <h5 className="text-center timeline-title">Issuer Flow</h5>
              <TimeLine />
            </div>
            <div className="col-md-12 col-sm-12 col-12 col-lg-6">
              <h5 className="text-center timeline-title">Validator Flow</h5>
              <Timeline2 />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
