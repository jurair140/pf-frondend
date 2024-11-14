import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Row,Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import base_url from '../services/base_url';
import { toast } from 'react-toastify';
import { updateProjectApi } from '../services/allApis';
import { responseContext } from '../contextApi/ContextProvider';

function Edit({projects}) {
  
    const [show, setShow] = useState(false);
    const [data,setData] = useState({
      title:'',description:'',language:'',github:'',demo:'',image:''

    })

    const [prev,setPrev] = useState("")

    const {setResponse} = useContext(responseContext)

    useEffect(()=>{
      setData({...projects})
    },[])

    useEffect(()=>{
      if(data.image?.type){
        setPrev(URL.createObjectURL(data.image))
      }
      else{
        setPrev("")
      }
    },[data.image])



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const handleUpdate = async() => {
      const {title,description,languages,github,demo,image} = data

      if(!title || !description ||!languages ||!github ||!demo ||!image){
        toast.warning("enter valid inputs")
      }
      else{
        if(data.image.type){

          const fd = new FormData()

          fd.append('title',title)
          fd.append('description',description)
          fd.append('languages',languages)
          fd.append('github',github)
          fd.append('demo',demo)
          fd.append('image',image)
  
          const header = {
            'Content-Type' :'multipart/form-data',
            'Authorization' : `Token ${sessionStorage.getItem('token')}`
          }
          
          const res = await updateProjectApi(projects._id,header,fd)
          if(res.status==200){
            
            toast.success("project updated successfully")
            handleClose()
            setResponse(res.data)
            
          }
          else{
            toast.error("something went wrong")
          }
        }
        else{
          const header = {
            'Content-Type' : 'application/json',
            'Authorization' : `Token ${sessionStorage.getItem('token')}`
          }

          const res = await updateProjectApi(projects._id,header,data)
          if(res.status==200){
            
            toast.success("project updated successfully")
            handleClose()
            setResponse(res.data)
            
          }
          else{
            toast.error("something went wrong")
          }
        }
      }
    }


 
  
    return (
      <>
      <button className='btn' onClick={handleShow}>
      <i className="fa-solid fa-pen-to-square fa-xl" style={{color: "#29054d",}} />                  
      </button>
       
  
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit projects</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
                <Col>
                    <label >
                        <input type="file" style={{display:'none'}} onChange={(e)=>setData({...data,image:e.target.files[0]})}/>
                        <img src={prev?prev:`${base_url}/uploads/${data.image}`}
                         alt=""width={'100%'}/>
                    </label>
                   
                </Col>
                <Col>
                    <input type="text" onChange={(e)=>setData({...data,title:e.target.value})} defaultValue={data.title} placeholder='title' className='form-control  my-2' />
                    <input type="text" onChange={(e)=>setData({...data,description:e.target.value})} defaultValue={data.description} placeholder='description' className='form-control  mb-2' />
                    <input type="text" onChange={(e)=>setData({...data,languages:e.target.value})} defaultValue={data.languages} placeholder='language' className='form-control  mb-2' />
                    <input type="text" onChange={(e)=>setData({...data,github:e.target.value})} defaultValue={data.github} placeholder='Github repository link' className='form-control  mb-2' />
                    <input type="text" onChange={(e)=>setData({...data,demo:e.target.value})} defaultValue={data.demo} placeholder='demo link' className='form-control  mb-2' />
                </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={handleUpdate}>Edit</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  
}

export default Edit
