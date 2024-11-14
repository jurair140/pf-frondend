import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logContext } from '../contextApi/AuthContext';

function Header() {

  const nav = useNavigate()

  const {setlogStatus} = useContext(logContext)

  const HandleLogOut = ()=>{
    sessionStorage.clear()
    toast.info("logged out!!")
    setlogStatus(false)
    nav('/auth')
  }

  return (
    <>
        <Navbar className="bg-body-secondary">
        <Container>
          <Navbar.Brand href="#home">
          <i className="fa-solid fa-diagram-project d-inline-block fa-xl " style={{color: "#423371",}} />
            {' '}
            Project Fair
          </Navbar.Brand>
          <button className='btn btn-danger' onClick={HandleLogOut}>Logout</button>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
