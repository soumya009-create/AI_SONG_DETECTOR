import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from "react-router-dom"
// import { Login } from '../pages/Login'

const Protected = ({children}) => {
  const {user,loading}=useAuth()
//   const navigate=useNavigate()

  if(loading){
    return <h1 className='text-2xl text-white'>loading..</h1>
  }
  if(!loading && !user){
   return <Navigate to='/'/>
  }
  
  return children
}

export default Protected