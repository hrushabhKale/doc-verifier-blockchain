import React, { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const [userType,setUserType]=useState()
  const navigate = useNavigate();
  const Component =props.component
  useEffect(()=>{
    setUserType(JSON.parse(localStorage.getItem("UserCredentials"))?.type)
       if(!localStorage.getItem("UserCredentials")){
         navigate('/SignIn')
       }
      },[])

  return (
    <div>
     {props?.type ? (props?.type === userType ?<Component/> : "Cannot access" ) :<Component/>} 
         </div>
  )
}

export default Protected