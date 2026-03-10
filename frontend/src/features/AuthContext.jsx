import React, { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { Register,Login,Getme,Logout } from './auth.api'

export const Authcontext=createContext()


const AuthContext = ({children}) => {
 
  const [loading, setloading] = useState(true)
  const [user, setuser] = useState()
  
  async function Registration(username,email,password){
        setloading(true)
        await new Promise(resolve => setTimeout(resolve,1500))
    try{
      const response=await Register(username,email,password)
    
      setuser(response.user)
      
      return response
    }catch(err){
         throw(err)
    }finally{
      setloading(false)
    }
    
  }
  async function Log(username,password){
      setloading(true)
      // await new Promise(resolve => setTimeout(resolve,1500))
      try{
        const response=await Login(username,password)
        console.log(response)
       setuser(response.user)
      return response
      }catch(err){
        throw(err)
      }
      finally{
        setloading(false)
      }
      
  }
  async function Get_details(){

    setloading(true)
    await new Promise(resolve => setTimeout(resolve,1500))
    try{
  
      const response = await Getme()
      // await new Promise(resolve => setTimeout(resolve, 1500)); 
      setuser(response.user)
  
    }catch(err){
  
      setuser(null)
  
    }finally{
  
      setloading(false)
  
    }
  
  }
  async function Log_out(){
    setloading(true)
    try{
      const response=await Logout()

      return response
    }catch(err){
      throw(err)
    }finally{
      setloading(false)
    }
  }
  useEffect(()=>{
    Get_details()
  },[])

  return (
    <Authcontext.Provider
    value={{
     loading,setloading,Registration,user,setuser,Log,Log_out
    }}
  >
    {children}
  </Authcontext.Provider>
  )
}

export default AuthContext