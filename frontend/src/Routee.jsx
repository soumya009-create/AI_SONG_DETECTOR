import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './features/pages/Login'
import { Home } from './features/pages/Home'

import Registration from './features/pages/Registration'
import Protected from './features/pages/Protected'

const Routee = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/home' element={<Protected><Home/></Protected>} />
        <Route  path='/' element={<Login/>} />
        <Route path='/register' element={<Registration/>} />
    </Routes>
    </BrowserRouter>

  )
}

export default Routee