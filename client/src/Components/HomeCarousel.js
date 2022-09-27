import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import image3 from "./../Assets/images/shubham-dhage-JlijbOtSWuw-unsplash.jpg";
import image2 from "./../Assets/images/Background2.jpg";
import image1 from "./../Assets/images/Banner2.jpg";
import "./../Assets/css/Carosuel.css";
import Aos from "aos";
import "aos/dist/aos.css";

export default function HomeCarousel() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <>
      <Carousel controls={false}>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src={image1}
            alt="First slide"
            data-aos="zoom-out"
          />
          <Carousel.Caption>
            <div>
              <p>Proof of Existence on </p>
              <span></span>
              <h2>Blockchain.</h2>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src={image2}
            alt="Second slide"
            data-aos="zoom-out"
          />

          <Carousel.Caption>
            <p>With The Power Of </p>
            <span></span>
            <h2>IPFS</h2>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src={image3}
            alt="Third slide"
            data-aos="zoom-out"
          />

          <Carousel.Caption>
            <p>Sign the Transactions on</p>
            <span></span>
            <h2
              className="fadeInUpShorter animated"
              data-animation="fadeInUpShorter"
              data-animation-delay="1.5s"
              style={{ animationDelay: "1.5s", opacity: "1" }}
            >
              ETHEREUM
            </h2>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}
