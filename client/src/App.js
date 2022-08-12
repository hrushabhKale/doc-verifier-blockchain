import logo from "./logo.svg";
import React from 'react';
import "./App.css";
import SignUpFile from "./Components/SignUp";
import SignInFile from "./Components/SignIn";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SecretTokenFile from "./Components/SecretToken";


function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <>
    <Router>
        <Routes>
          <Route exact path="/" element={<SignInFile />} />
          <Route path="/SignInFile" element={<SignInFile />} />
          <Route path="/SignUpFile" element={<SignUpFile />} />
          <Route path="/SecretTokenFile" element={<SecretTokenFile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
