import axios from "axios";

const apiBaseUrl =
  import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:3000" : "");

const baseApi = axios.create({
  baseURL: `${apiBaseUrl}/api`,
  withCredentials: true,
});

export async function Register(username,email,password){
    try{
        const response=await baseApi.post('/register',{
            username,email,password
        })
        
        return response.data
    }catch(err){
        console.log(err.message)
    }
}
export async function Login(username,password){
    try{
        const response=await baseApi.post('/login',{
            username,password
        })
         console.log(response.data)
        return response.data
    }catch(err){
        console.log("password is wrong please try again")
        throw(err)

    }
}

export async function Getme(){
        try{
            const response=await baseApi.get('/get-me')

            return response.data
        }catch(err){
            throw(err)
        }
}

export async function Logout(){
    try{
        const response=await baseApi.post('/logout')

        return response.data
    }catch(err){
        throw(err)
    }
}
