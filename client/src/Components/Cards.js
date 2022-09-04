import React, { Component } from 'react'
import Card from './CardUI';
import image2 from './../Assets/images/ethereum.png';
import image3 from './../Assets/images/sales-circle-icon.png';
import image4 from './../Assets/images/ipfs.png';
import "aos/dist/aos.css";
import './../Assets/css/Cards.css';


 class Cards extends Component{
    

    render(){
        return(
            <section>
            <div className="container-fluid p-5 card-banner text-dark text-center cards2" >
              <h2 className='pb-5 text-light'>Key Feature of Doc Verifier</h2>          
            
            <div className="d-flex justify-content-center">
                <div className="row">
                    <div className="col-md-4 col-sm-4" data-aos='zoom-in'>
                        <Card imgsrc={image2} title='Ethereum'
                        desp="Ethereum is a decentralized platform that runs smart contracts, 
                        Applications that run exactly as programmed without any possibility of downtime, censorship, fraud or third-party interference."/>
                    </div>
                    <div className="col-md-4 col-sm-4" data-aos='zoom-in'>
                        <Card imgsrc={image3} title='Doc-Verifier'
                         desp="Certificate Issue, Doc-Verifier is built on top of Ethereum Blockchain and the IPFS technology
                          which will help you to issue certificate and avoid fake certificates via our validation platform"/>
                    </div>
                    <div className="col-md-4 col-sm-4" data-aos='zoom-in'>
                        <Card imgsrc={image4} title='IPFS'
                        desp="InterPlanetary File System is a protocol and network designed to create a content-addressable,
                         peer-to-peer method of storing and sharing hypermedia in a distributed file system."/>
                    </div>
                </div>
            </div></div>
            </section>
        );
    }
 }

 export default Cards;