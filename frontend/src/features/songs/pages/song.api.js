import axios from "axios";

const apiBaseUrl =
  import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:3000" : "");

const baseApi = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});


export async function Get_song({mood}){

    try{
        const response=await baseApi.get('/song/?mood='+mood)
          console.log(response.data)
        return response.data
    }catch(err){
        throw(err)
    }
}
