import React from 'react';
import { Link } from "react-router-dom";
import './../Assets/css/Navbar.css';

export default function Navbar() {
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
                  <a class="nav-link active text-light" aria-current="page" href="/">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-light" href="#">What we Do?</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-light" aria-current="page" href="#">Product</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-light" href="/aboutUs">About Us</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-light" aria-current="page" href="#">Contact</a>
                </li>
                    <li class="nav-item align-items-right ">
                    <Link to="/SignIn" exact><button class="btn btn-outline-primary btns " type="submit">Login</button></Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav> 
    </>
  )
}
