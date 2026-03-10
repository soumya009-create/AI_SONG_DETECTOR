import axios from "axios";

const baseApi=axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})


export async function Get_song({mood}){

    try{
        const response=await baseApi.get('/song/?mood='+mood)
          console.log(response.data)
        return response.data
    }catch(err){
        throw(err)
    }
}