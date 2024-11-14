import { useContext, useState } from 'react'
import './bootstrap.min.css'
import Landing from './pages/Landing'
import './App.css'
import Dashboard from './pages/Dashboard'
import AllProjects from './pages/AllProjects'
import Auth from './pages/Auth'
import Footer from './components/Footer'
import { Routes,Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logContext } from './contextApi/AuthContext'

function App() {

  const {logStatus} = useContext(logContext)
 
  return (
    <>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='auth' element={<Auth/>}/>
      <Route path='projects' element={logStatus?<AllProjects/>:<Auth/>}/>
      <Route path='dash' element={logStatus?<Dashboard/>:<Auth/>}/>
    </Routes>
    <Footer/>
      <ToastContainer/>
    </>
  )
}

export default App
