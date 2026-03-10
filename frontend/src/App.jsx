import React from 'react'
import Routee from './Routee'
import AuthContext from './features/AuthContext'
import SongContextprovider from './features/songs/SongContext'

const App = () => {
  return (
     <AuthContext>
    <SongContextprovider>
    <Routee/>
    </SongContextprovider>
     </AuthContext>
  )
}

export default App
