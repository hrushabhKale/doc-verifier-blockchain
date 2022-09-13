import React, { useState, useEffect } from "react";
import * as AiIcons from "react-icons/ai";
import * as GrIcons from "react-icons/gr";
import * as MdIcons from "react-icons/md";
import "./../Assets/css/Sidebar.css";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import image2 from "./../Assets/images/ethereum.png";

export default function Sidebar() {
    const [sidebar, setSidebar] = useState(false);
    const [userType, setUserType] = useState();
  
    useEffect(() => {
      setUserType(JSON.parse(localStorage.getItem("UserCredentials")).type);
    }, []);
  
    const handleClick = () => {
      localStorage.clear();
    };
  
    const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div class="row">
          <div className="navbar text-light " id="sidenavDiv">
            <div class="col-md-2">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineMenu
                  onClick={showSidebar}
                  className="svg-color"
                />
              </Link>
            </div>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <div className="nav-menu-items" onClick={showSidebar}>
            <div className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose
                  className="cross-svg-color"
                  style={{ color: "black" }}
                />
              </Link>
            </div>
            <div className="pro-sidebar-header Sidebar_header__1KB1K">
              <div className="Sidebar_userDesc__HPrgs">
                <img src={image2} alt="image1" className="Sidebar-img-top" />
                <h3>Company Name</h3>
                <p>{userType}</p>
              </div>
            </div>
            <div className="pro-sidebar-content sidebarContent">
              <nav
                className="pro-menu Sidebar_menu__2X59C shaped square inner-submenu-arrows"
                style={{ listStyleType: "none" }}
              >
                <ul>
                  <Link firstchild="1" popperarrow="0" to="/">
                    <li className="pro-menu-item Sidebar_menuItem__37ym_">
                      <div
                        className="pro-inner-item"
                        tabindex="0"
                        role="button"
                      >
                        <span className="pro-icon-wrapper">
                          <span className="pro-icon">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              stroke-width="0"
                              viewBox="0 0 24 24"
                              className="Sidebar_icons__2Z2FR"
                              height="25"
                              width="25"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path fill="none" d="M0 0h24v24H0z"></path>
                              <path d="M12 3L4 9v12h5v-7h6v7h5V9z"></path>
                            </svg>
                          </span>
                        </span>
                        <span className="pro-item-content">
                          <span> Home</span>
                        </span>
                      </div>
                    </li>
                  </Link>
                  <Link
                    firstchild="1"
                    popperarrow="0"
                    to={
                      userType === "issuer"
                        ? "/Issuer-Dashboard"
                        : "/Validator-Dashboard"
                    }
                  >
                    <li className="pro-menu-item Sidebar_menuItem__37ym_">
                      <div
                        className="pro-inner-item"
                        tabindex="0"
                        role="button"
                      >
                        <span className="pro-icon-wrapper">
                          <span className="pro-icon">
                            <MdIcons.MdOutlineDashboardCustomize
                              className="Sidebar_icons__2Z2FR"
                              style={{
                                color: "black",
                                height: "25",
                                width: "25",
                              }}
                            />
                          </span>
                        </span>
                        <span className="pro-item-content">
                          <span> Dashboard</span>
                        </span>
                      </div>
                    </li>
                  </Link>
                  {userType === "issuer" && (
                    <Link firstchild="1" popperarrow="0" to="/Transaction">
                      <li className="pro-menu-item Sidebar_menuItem__37ym_">
                        <div
                          className="pro-inner-item"
                          tabindex="0"
                          role="button"
                        >
                          <span className="pro-icon-wrapper">
                            <span className="pro-icon">
                              <GrIcons.GrTransaction
                                className="Sidebar_icons__2Z2FR"
                                style={{
                                  color: "black",
                                  height: "25",
                                  width: "25",
                                }}
                              />
                            </span>
                          </span>
                          <span className="pro-item-content">
                            <span>Transaction</span>
                          </span>
                        </div>
                      </li>
                    </Link>
                  )}
                  <Link firstchild="1" popperarrow="0" to="/Help-desk">
                    <li className="pro-menu-item Sidebar_menuItem__37ym_">
                      <div
                        className="pro-inner-item"
                        tabindex="0"
                        role="button"
                      >
                        <span className="pro-icon-wrapper">
                          <span className="pro-icon">
                          <AiIcons.AiOutlineUsergroupAdd
                              className="Sidebar_icons__2Z2FR"
                              style={{
                                color: "black",
                                height: "25",
                                width: "25",
                              }}
                            />
                          </span>
                        </span>
                        <span className="pro-item-content">
                          <span>Help Desk</span>
                        </span>
                      </div>
                    </li>
                  </Link>
                </ul>
              </nav>
            </div>
            <div className="pro-sidebar-footer Sidebar_footer__3pqwB">
              <Link to="/">
                <button onClick={handleClick}>Logout</button>
              </Link>
            </div>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  )
}
