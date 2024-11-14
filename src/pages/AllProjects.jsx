import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Projectcard from '../components/Projectcard'
import { getAllProjectsApi } from '../services/allApis'
import { searchProductsApi } from '../services/allApis'


function AllProjects() {

  const [data,setData] = useState([])
  const [key,setKey] = useState('')

  const getData = async()=>{
    const res = await searchProductsApi(key)
    if(res.status==200){
      setData(res.data)
    }
  }

 



  useEffect(()=>{
    getData()
  },[key])

  console.log(data)


  return (
    <>
        <Header />
         <div className='container-fluid p-3'>
          <div className='d-flex justify-content-between mb-5'>
          <h3>All Projects</h3>
          <input type="text" placeholder='search by language' onChange={(e)=>setKey(e.target.value)} className="form-control w-25" />
          </div>
            <div className='d-flex justify-content-around'>
              {
                data.length > 0 ? 
              <>
               {
                data.map(item=>(
                  <Projectcard projects={item}/>
                ))
               }
              </>
              
              
                :
                <h3 className='text-center text-danger'>No projects Available</h3>
              }
               
            </div>
         </div>
    </>
  )
}

export default AllProjects
