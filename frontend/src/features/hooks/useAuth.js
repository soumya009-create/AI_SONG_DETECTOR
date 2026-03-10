import { useContext } from "react";
import { Authcontext } from "../AuthContext";

export function useAuth(){
    const context=useContext(Authcontext)
   
    return context
    
}