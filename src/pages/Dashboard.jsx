import React,{useContext, useEffect, useState} from 'react'
import Header from '../components/Header'
import { Row,Col } from 'react-bootstrap'
import Add from '../components/Add'
import Edit from '../components/Edit'
import { getProjectsApi, updateUserApi } from '../services/allApis'
import { responseContext } from '../contextApi/ContextProvider'
import { deleteProjectApi } from '../services/allApis'
import { toast } from 'react-toastify'
import base_url from '../services/base_url'
import Profile from '../components/Profile'




function Dashboard() {

  const {response} = useContext(responseContext)
  

  const [view,setView]=useState(false)
  const [uname,setUname] = useState("")
  const [project,setProject] = useState([])
  // const [userData,setUserData] = useState({
  //   profile:"",usersame:"",github:"",linkedin:""
  // })

  // const [prev,setPrev]=useState("")

  // useEffect(()=>{
  //   if(userData.profile?.type){
  //     setPrev(URL.createObjectURL(userData.profile))
  //   }
  //   else{
  //     setPrev("")
  //   }
  // },[userData.profile])




  const getData = async()=>{
    const header = {
    'Content-Type':'application/json',
    'Authorization':`Token ${sessionStorage.getItem('token')}`
  }
  const res = await getProjectsApi(header)
  if(res.status==200){
    setProject(res.data) 
  }
  
  }


  useEffect(()=>{
    if(sessionStorage.getItem('user')){
      setUname(sessionStorage.getItem('user'))
    }
    getData()

  },[response])


  const handleView=()=>{
    setView(!view)
  }


  const handleDelte = async(id)=>{
    const header = {
      'Content-Type':'application/json',
      'Authorization':`Token ${sessionStorage.getItem('token')}`
    }

    const res = await deleteProjectApi(id,header)
    if(res.status==200){
      getData()

    }
    else{
      toast.error("Deletion failed")
    }
  }


  // const handleUpdateUser = async()=>{

  //   const {profile,username,github,linkedin} = userData
  

  // if(userData.profile.type){
  //   const fd = new FormData()

  //   fd.append('profile',profile)
  //   fd.append('username',username)
  //   fd.append('github',github)
  //   fd.append('linkedin',linkedin)
 

  // const header = {
  //   'Content-Type':'multipart/form-data',
  //   'Authorization':`Token ${sessionStorage.getItem('token')}`
  // }

  // const res = await updateUserApi(header,fd)

  // console.log(res);
  

  // }
// }




  return (
    <>
    <Header/>
    <div className='container-fluid p-3'>
      <h1 className='text-center my-3'>Welcome ,<span className='text-info'>{uname}</span></h1>
      
      <Row>
        <Col md={8} sm={12}>
          <h3>Projects</h3>
          <div className='border border-3 border-dark shadow p-2'>
            <Add/>
            <div className='my-2'>
              {
                project.length > 0 ?
                project.map((item,index)=>(
                  <div className='border p-2 border-2 border-info shadow mb-3 d-flex justify-content-between'>
                <h5>{item.title}</h5>
                <div>
                  <a href={item.github} className='me-2'><i className="fa-brands fa-github fa-xl" style={{color: "#540788",}} /></a>
                    <Edit projects = {item}/>
                  <button className='btn'>
                  <i className="fa-solid fa-trash fa-xl" style={{color: "#df0101",}} onClick={()=>handleDelte(item._id)}/>
                  </button>
                </div>
              </div>
                ))
                
              :
              <h4>no projects available</h4>
              }
             
            </div>
          </div>
        </Col>
        <Col  md={4} sm={12}> 
          <Profile/>

        </Col>
      </Row>
    </div>
    </>
  )
}

export default Dashboard

