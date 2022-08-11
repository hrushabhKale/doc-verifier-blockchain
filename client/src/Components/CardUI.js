import React from 'react'
import { useEffect } from 'react'
import Aos from 'aos';
import "aos/dist/aos.css";

const Card = props => {
    useEffect(() => {
        Aos.init({ duration: 1000 });
    },[]);
    return(
        <div className="div card text-center bg-light text-dark border-info" >
            <div className="div overflow" data-aos='fade-up'>
                <img src={props.imgsrc} alt='image1' className='card-img-top'/>
            </div>
            <div className="div cardbody text-dark" data-aos='fade-up'>
                <h4 className="card-title">{props.title}</h4>
                <p className='card-text text-secondary'>
                    {props.desp}
                </p>
                {/* <a href='#' className='btn btn-outline-sucess'>
                    Read More
                </a> */}
            </div>
        </div>  

    );

};

export default Card;
