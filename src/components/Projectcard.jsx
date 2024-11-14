import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Row,Col } from 'react-bootstrap';
import { getAllProjectsApi } from '../services/allApis';
import base_url from '../services/base_url';



function Projectcard({projects}) {


    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [allProject,setAllProject] = useState([])


    const getAllProjects = async()=>{
      const res = await getAllProjectsApi()
      if(res.status==200){
        setAllProject(res.data) 
      }
    }

    useEffect(()=>{
      getAllProjects()
    },[])




  return (
   <>

     <Card style={{ width: '18rem' }} className='mb-3'>
      <Card.Img variant="top" onClick={handleShow} style={{cursor:'pointer'}} src={`${base_url}/uploads/${projects.image}`} height={'300px'}/>
      <Card.Body>
        <Card.Title>{projects.title}</Card.Title>
      </Card.Body>
    </Card>



    <Modal show={show}  onHide={handleClose}  backdrop="static" keyboard={false} >
        <Modal.Header closeButton>
          <Modal.Title>{projects.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                    <img src={`${base_url}/uploads/${projects.image}`} alt="" className='img-fluid' />
                </Col>
                <Col>
                    <h4>{projects.title}</h4>
                    <h6><span className='text-info'>Description : </span>
                      {projects.description}
                    </h6>
                    <h6><span className='text-info'>Language : </span>
                    {projects.languages}
                    </h6>
                    <div className='mt-3 d-flex justify-content-between'>
                        <a href={projects.github}>
                        <i className="fa-brands fa-github fa-lg" />
                        </a>
                        <a href={projects.demo}>
                        <i className="fa-solid fa-link fa-lg" />
                        </a>
                    </div>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>



   </>
  )
}

export default Projectcard
