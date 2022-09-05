import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../Assets/css/Navbar.css";

export default function Navbar(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState();
  useEffect(() => {
    if (localStorage.getItem("UserCredentials")) {
      setIsAuthenticated(true);
      setUserData(JSON.parse(localStorage.getItem("UserCredentials")));
    }
  }, []);

  const handleClick = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark  text-sm-start fixed-top Nav-header">
        <div class="container">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navmenu">
            <ul class="navbar-nav ms-auto ">
              <li class="nav-item">
                <a
                  class="nav-link active text-light achr"
                  aria-current="page"
                  href="/"
                >
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-light achr" href="#what-we-do">
                  What we Do ?
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link text-light achr"
                  aria-current="page"
                  href="#timeline"
                >
                  Product
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-light achr" href="#aboutUs">
                  About Us
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link text-light achr"
                  aria-current="page"
                  href="#contact"
                >
                  Contact
                </a>
              </li>
              <li class="nav-item align-items-right ">
                {isAuthenticated ? (
                  <>
                    <li class="nav-item dropdown ">
                      <div
                        className="nav-link dropdown-toggle text-light drop-align"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {userData.userName}
                      </div>
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <li>
                          <Link
                            class="dropdown-item"
                            to={
                              userData.type === "issuer"
                                ? "/DashboardForm"
                                : "/Validator-Dashboard"
                            }
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <hr class="dropdown-divider" />
                        </li>
                        <li>
                          <Link
                            class="dropdown-item"
                            to="/"
                            onClick={handleClick}
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </>
                ) : (
                  <>
                    <li class="nav-item align-items-right ">
                      <Link to="/SignIn" exact>
                        <button
                          class="btn btn-outline-primary btns achr"
                          type="submit"
                        >
                          {props.btn1}
                        </button>
                      </Link>
                    </li>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
