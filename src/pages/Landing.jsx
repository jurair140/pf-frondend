import React, { useEffect, useState } from 'react'
import { Row,Col } from 'react-bootstrap'
import  { Link } from 'react-router-dom'
import Projectcard from '../components/Projectcard'
import { getAllProjectsApi } from '../services/allApis'


function Landing() {

 const [logStatus,setLogStatus] = useState(false)

 const[data,setData] = useState([])

  const getData = async()=>{
    const res = await getAllProjectsApi()
    if(res.status==200){
        console.log(res.data)
        setData(res.data)
    }
   
  }

 useEffect(()=>{
    if(sessionStorage.getItem('token')){
        setLogStatus(true)
    }
    else{
        setLogStatus(false)
    }
    getData()
 },[])

  return (
    <>
     <div className='d-flex flex-column justify-content-center align-items-center p-5'style={{height:'90vh',backgroundColor:'#E6E6FA'}}>
        <Row>
            <Col className='d-flex flex-column justify-content-center '>
                <h1 className='text-warning mb-5'>Project Fair</h1>
                <p style={{textAlign:'justify'}}> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio rerum laudantium vitae numquam consectetur, cupiditate eligendi aperiam esse! Accusamus sint a officia fugiat recusandae aspernatur quam deserunt. Odio, pariatur consequuntur.</p>
                <div className='d-grid'>
                    {
                        logStatus ? 
                        <Link className='btn btn-warning mt-3' to='/dash'>Go To Dash</Link>

                        :
                        <Link className='btn btn-primary mt-3' to='/auth'>start to explore</Link>

                    }
                </div>
            </Col>
            <Col>
                <img src="https://png.pngtree.com/png-vector/20240309/ourmid/pngtree-developers-are-coding-programs-on-computers-programmers-are-analyzing-data-png-image_11902650.png"
                 alt="" className='img-fluid' width={'80%'}/>
            </Col>
        </Row>

     </div>
 
      <div>
            <h2 className='mb-3 text-center text-warning'>Projects</h2>

            {
                data.length>0 ?

                <div className='my-3 d-flex justify-content-around'>
               {
                data.slice(0,3).map(item =>(
                    <Projectcard projects={item}/>
                ))
               }
                
               
            </div>
            :
            <h3 className='text-center my-3'>No Projects Available</h3>
            }

           

            <div className='text-center'>
                    <Link to={'/projects'} className='text-dark'>view more</Link>
                </div>
       </div>
    </>
  )
}

export default Landing
