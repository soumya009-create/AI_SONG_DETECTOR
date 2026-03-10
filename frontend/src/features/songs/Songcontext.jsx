import React, { createContext, useState } from "react"

export const Songcontext = createContext()

const SongContextProvider = ({ children }) => {

  const [song, setsong] = useState({
    
  })
  const [loading, setloading] = useState(false)

  return (
    <Songcontext.Provider value={{ song, setsong, loading, setloading }}>
      {children}
    </Songcontext.Provider>
  )
}

export default SongContextProvider