import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
function Registration() {
  const navigate = useNavigate()
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const { loading, setloading, Registration } = useAuth()
  
 async function handleSubmit(e) {

    e.preventDefault()
   await Registration(username,email,password)
   navigate('/home')

    


  }
 

  return (
    <div className="flex justify-center items-center h-screen bg-[#111] ">

      <form   onSubmit={(e)=>{
        handleSubmit(e)
      }}

        className="bg-white p-8 rounded-xl shadow-md w-96"
      >

        <h2 className="text-2xl font-bold text-center mb-6">
          Register
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
          type="email"
          name="email"
          placeholder="Email"
value={email}
onChange={(e)=>{
  setemail(e.target.value)
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
          className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600"
        >
           {loading ? "Registering..." : "Register"}
        </button>
        <p className="mt-4 text-s">Already have an account? <button className="text-blue-500 cursor-pointer"
          onClick={() => {
            navigate('/')
          }}
        >Login</button> </p>

      </form>



    </div>
  );
}

export default Registration;