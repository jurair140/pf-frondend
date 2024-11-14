import React, { useContext } from 'react'
import { Row,Col } from 'react-bootstrap'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { registerApi,loginApi } from '../services/allApis'
import { useNavigate } from 'react-router-dom'
import { logContext } from '../contextApi/AuthContext'



function Auth() {

  const [authStatus,setAuthStatus]=useState(false)
  const [user,setUser] = useState({
    email:"",username:"",password:""
  })

 const nav = useNavigate()

 const {setlogStatus} = useContext(logContext)
 
  const changeStatus = () =>{
    setAuthStatus(!authStatus)
  }

  const handleRegister = async()=>{
      console.log(user)
      const {email,username,password} = user

      const res =await registerApi(user)
      if(res.status !==200){
        toast.warning("enter valid input")
      }
      else{
      
        console.log(res)
        if(res.status==200){
          toast.success("Registered successfull")
          changeStatus()
          setUser({
            email:"",username:"",password:""
          })
        }
        else{
          toast.error("Registration failed")
        }
      }

  }

  const handleLogin = async()=>{
    const {email,password} = user
     if(!email || !password){
      toast.warning("enter valid input")
     }
     else{
      const res = await loginApi(user)
      
      if(res.status==200){
        toast.success("Login successfull")
        changeStatus()
        setlogStatus(true)
        setUser({
          email:"",password:""
        })
        sessionStorage.setItem('token',res.data.token)
        sessionStorage.setItem('user',res.data.username)
        sessionStorage.setItem('profile',res.data.profile)
        sessionStorage.setItem('github',res.data.github)
        sessionStorage.setItem('linkedin',res.data.linkedin)
        
        nav('/')
      }
      else{
        toast.error("login failed")
      }
     }
      


    }
  

  return (
   <>
   <div className='container-fluid w-100 d-flex justify-content-center align-items-center' style={{height:"100vh"}}>
    <div className='w-75 border border-2 shadow'>
      <Row>
        <Col  sm={6} md={6}>
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-page-illustration-download-in-svg-png-gif-file-formats--app-developing-development-secure-mobile-webapp-and-pack-design-illustrations-3783954.png?f=webp"alt="" className='img-fluid'/>
        </Col>
        <Col sm={6} md={6} className='d-flex flex-column justify-content-center'>
          <h4>
             {
              authStatus? <>Register</>
              :
              <>Login</>
             }

          </h4>
          <div>
            <input type="email" placeholder='Enter Email Id' value={user.email} className='form-control my-3' onChange={(e)=> setUser({...user,email:e.target.value})}/>


             {
              authStatus &&
              <input type="text" placeholder='Enter Username'value= {user.username} className='form-control mb-3' onChange={(e)=> setUser({...user,username:e.target.value})} />
              }

            <input type="password" placeholder='Enter Password' value={user.password} className='form-control mb-3' onChange={(e)=> setUser({...user,password:e.target.value})}/>
          </div>

          <div className='d-flex justify-content-between'>
              {
                authStatus ?
                <button className='btn btn-primary' onClick={handleRegister}>Register</button>  

                :
                <button className='btn btn-primary' onClick={handleLogin}>Login</button>  

              }


            <button className='btn btn-link text-info' onClick={changeStatus}>
              {
                authStatus ? 
                <>Already A User</>
                :
                <>New User</>
              }
            </button>
            
          </div>
        </Col>
      </Row>



    </div>
   </div>
   </>
  )
}

export default Auth
