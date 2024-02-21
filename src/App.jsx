import React from 'react'
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Register from './components/Register.jsx'
import Edit from './components/Edit.jsx'
import Detail from './components/Detail.jsx'
import { Routes,BrowserRouter as Router,Route } from 'react-router-dom'

function App() {

  return (
    <>
      {/* <Navbar/> */}
      <Router>
        <Routes>
          <Route path='/' element={<Navbar/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>} />
          <Route path='/edit/:id' element={<Edit/>}/>
          <Route path='/view/:id' element={<Detail/>}/>
          </Route>
          
        </Routes>
      </Router>
    </>
  )
}

export default App
