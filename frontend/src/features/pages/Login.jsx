import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")

   const{loading,Log,user}=useAuth()
   
  const navigate=useNavigate()
  async function handlesubmit(e){
    e.preventDefault()
   try{
    await Log(username,password)
    navigate('/home')
   }catch(err){
    console.log(err.message)
   }

  }
 
 

  return (
    <div className="flex justify-center items-center h-screen bg-[#111] p-10">

      <form  onSubmit={(e)=>{
        handlesubmit(e)
      }}
        
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >

        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e)=>{
            setusername(e.target.value)
          }}
          className="w-full border p-3 rounded-md mb-4"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>{
            setpassword(e.target.value)
          }}
          className="w-full border p-3 rounded-md mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
        <p className="mt-4 text-s">Have not an account? <button  className="text-green-700 cursor-pointer"
        onClick={()=>{
        navigate('/register')
      }}
      >Register</button> </p>
      </form>

    </div>
  );
}

export default Login