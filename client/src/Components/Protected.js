import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const navigate = useNavigate();
  const Component =props.component
     useEffect(()=>{
         if(!localStorage.getItem("UserCredentials")){
           navigate('/SignIn')
         }
     },[])

  return (
    <div>
      <Component/>
         </div>
  )
}

export default Protected