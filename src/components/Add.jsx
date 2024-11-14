import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Row,Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { addprojectApi } from '../services/allApis';
import { responseContext } from '../contextApi/ContextProvider';


function Add() {

  const {setResponse} = useContext(responseContext)

    const [show, setShow] = useState(false);
    const [project,setProject] = useState(
      {
        title:'',description:'',language:'',github:'',demo:'',image:''
      }
    )
    const [preview,setPreview] = useState("")

    const handleClose = () => {
      setProject({title:'',description:'',language:'',github:'',demo:'',image:''})
      setShow(false)};
    const handleShow = () => setShow(true);

    const handleProjectAdd = async()=>{
      const { title,description,language,github,demo,image} = project

      if(!title || !description ||!language ||!github ||!demo ||!image){
        toast.warning("enter valid inputs")
      }
      else{
        const fd = new FormData()
        fd.append('title',title)
        fd.append('description',description)
        fd.append('languages',language)
        fd.append('github',github)
        fd.append('demo',demo)
        fd.append('image',image)

        const header = {
          'Content-Type' :'multipart/form-data',
          'Authorization' : `Token ${sessionStorage.getItem('token')}`
        }
        
        const res = await addprojectApi(fd,header)
        if(res.status==200){
          
          toast.success("project added successfully")
          handleClose()
          setResponse(res.data)
          
        }

      }
    }


    useEffect(()=>{
      if(project.image){
        setPreview(URL.createObjectURL(project.image))
      }
      else{
        setPreview("")
      }

    },[project.image])
  
    return (
      <>
        <Button variant="danger" onClick={handleShow}>
          Add Projects
        </Button>
  
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add projects</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
                <Col sm={6} md={6}>
                    <label >
                        <input type="file" style={{display:'none'}} onChange={(e)=>setProject({...project,image:e.target.files[0]})}/>
                        <img src={preview ? preview : "https://png.pngtree.com/png-vector/20191129/ourmid/pngtree-image-upload-icon-photo-upload-icon-png-image_2047545.jpg"}
                         alt=""width={'100%'}/>
                    </label>
                   
                </Col>
                <Col sm={6} md={6}>
                    <input type="text" placeholder='title' className='form-control  my-2' onChange={(e)=>setProject({...project,title:e.target.value})}/>
                    <input type="text" placeholder='description' className='form-control  mb-2'onChange={(e)=>setProject({...project,description:e.target.value})} />
                    <input type="text" placeholder='language' className='form-control  mb-2' onChange={(e)=>setProject({...project,language:e.target.value})}/>
                    <input type="text" placeholder='Github repository link' className='form-control  mb-2'onChange={(e)=>setProject({...project,github:e.target.value})} />
                    <input type="text" placeholder='demo link' className='form-control  mb-2' onChange={(e)=>setProject({...project,demo:e.target.value})}/>
                </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={handleProjectAdd}>save</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
}

export default Add
