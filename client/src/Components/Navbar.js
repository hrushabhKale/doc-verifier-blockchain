import React from 'react';
import { Link } from "react-router-dom";
import './../Assets/css/Navbar.css';

export default function Navbar(props) {
  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-dark  text-sm-start fixed-top Nav-header">
        <div class="container">
             <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navmenu">
            <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navmenu">
                <ul class="navbar-nav ms-auto " >
                <li class="nav-item">
                  <a class="nav-link active text-light achr" aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-light achr" href="#what-we-do">What we Do?</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-light achr" aria-current="page" href="#timeline">Product</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-light achr" href="#aboutUs">About Us</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-light achr" aria-current="page" href="#contact">Contact</a>
                </li>
                    <li class="nav-item align-items-right ">
                    <Link to="/SignIn" exact><button class="btn btn-outline-primary btns achr" type="submit">{props.btn1}</button></Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav> 
    </>
  )
}
