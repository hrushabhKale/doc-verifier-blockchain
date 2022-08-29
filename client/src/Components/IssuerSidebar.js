import React, { useState } from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as GrIcons from 'react-icons/gr';
import * as MdIcons from 'react-icons/md';
import './../Assets/css/Sidebar.css';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import image2 from './../Assets/images/ethereum.png';

export default function IssuerSidebar() {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => setSidebar(!sidebar)
  return (
    <>
            <IconContext.Provider value={{color:"#fff"}}>
 
                <div class="row">
                    <div className='navbar text-light ' id = 'sidenavDiv'>
                    <div class="col-md-2">
                    <Link to="#" className='menu-bars'>    
                    <AiIcons.AiOutlineMenu onClick={showSidebar} className="svg-color"/>
                    </Link>
                    </div>
                </div>
                </div>
                <nav className={sidebar ? 'nav-menu active' : "nav-menu"}>
                    <div className='nav-menu-items' onClick={showSidebar}>
                        <div className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose className="cross-svg-color" style={{color: 'black'}}/>
                            </Link>
                        </div>
                        <div className="pro-sidebar-header Sidebar_header__1KB1K">  
                                        <div className="Sidebar_userDesc__HPrgs">
                                        <img src={image2} alt='image1' className='Sidebar-img-top'/>
                                            <h3>Company Name</h3>
                                            <p>issuer</p>
                                        </div>
                                    </div>
                                    <div className="pro-sidebar-content sidebarContent">
                                        <nav className="pro-menu Sidebar_menu__2X59C shaped square inner-submenu-arrows"
                                            style={{listStyleType: 'none'}}>
                                            <ul><Link firstchild="1" popperarrow="0" to="/">
                                                    <li className="pro-menu-item Sidebar_menuItem__37ym_">
                                                        <div className="pro-inner-item" tabindex="0" role="button"><span
                                                                className="pro-icon-wrapper"><span className="pro-icon"><svg
                                                                        stroke="currentColor" fill="currentColor" stroke-width="0"
                                                                        viewBox="0 0 24 24" className="Sidebar_icons__2Z2FR" height="25"
                                                                        width="25" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                                                        <path d="M12 3L4 9v12h5v-7h6v7h5V9z"></path>
                                                                    </svg></span></span><span className="pro-item-content"><span> Home
                                                                </span></span></div>
                                                    </li>
                                                </Link><Link firstchild="1" popperarrow="0" to="/DashboardForm">
                                                    <li className="pro-menu-item Sidebar_menuItem__37ym_" >
                                                        <div className="pro-inner-item" tabindex="0" role="button"><span
                                                                className="pro-icon-wrapper"><span className="pro-icon">
                                                                    <MdIcons.MdOutlineDashboardCustomize className="Sidebar_icons__2Z2FR" style={{color: 'black', height:"25", width:"25"}}/>
                                                                    </span></span><span className="pro-item-content"><span> Dashboard
                                                                </span></span></div>
                                                    </li>
                                                </Link><Link firstchild="1" popperarrow="0" to="/Transction">
                                                    <li className="pro-menu-item Sidebar_menuItem__37ym_">
                                                        <div className="pro-inner-item" tabindex="0" role="button"><span
                                                                className="pro-icon-wrapper"><span className="pro-icon">
                                                                    <GrIcons.GrTransaction className="Sidebar_icons__2Z2FR" style={{color: 'black', height:"25", width:"25"}}/>
                                                                    </span></span><span className="pro-item-content"><span>
                                                                    Transaction</span></span></div>
                                                                    
                                                    </li>
                                                </Link><Link firstchild="1" popperarrow="0" to="/Help-desk">
                                                    <li className="pro-menu-item Sidebar_menuItem__37ym_">
                                                        <div className="pro-inner-item" tabindex="0" role="button"><span
                                                                className="pro-icon-wrapper"><span className="pro-icon"><svg
                                                                stroke="currentColor" fill="currentColor" stroke-width="0"
                                                                role="img" viewBox="0 0 24 24" className="Sidebar_icons__2Z2FR"
                                                                height="25" width="25" xmlns="http://www.w3.org/2000/svg">
                                                                <title></title>
                                                                <path
                                                                    d="M6.816 15.126l4.703 2.715v-5.433L6.814 9.695v5.432zm-2.025 1.168l6.73 3.882v3.82L1.481 18.206V6.616l3.31 1.91v7.769zM12 6.145L7.298 8.863 12 11.579l4.704-2.717L12 6.146zm0-2.332l5.659 3.274 3.31-1.91L12 0 1.975 5.79 5.28 7.695zm7.207 12.48v-3.947l-2.023 1.167v1.614l-4.703 2.715v.005-5.436L22.518 6.62v11.587L12.48 24v-3.817l6.727-3.887z">
                                                                </path>
                                                            </svg></span></span><span className="pro-item-content"><span>
                                                                    Help Desk</span></span></div>
                                                    </li>
                                                </Link></ul>
                                        </nav>
                                    </div>
                                    <div className="pro-sidebar-footer Sidebar_footer__3pqwB"><Link to="/SignIn"><button>Login<svg
                                                    stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512"
                                                    className="Sidebar_iconPowerOff__2umpb" height="15" width="15"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z">
                                                    </path>
                                                </svg></button></Link>
                                    </div>

                    </div>
                </nav>
                </IconContext.Provider>

    </>
  )
}
