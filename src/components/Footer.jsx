import React from 'react'
import { Link } from 'react-router-dom'
import { Row,Col } from 'react-bootstrap'

function Footer() {
  return (
   <>
    <div className='container-fluid p-3 ' style={{backgroundColor:'#DDA0DD'}}>
        <Row>
            <Col>
                <h3>Project fair 2024</h3>
                      <p style={{textAlign:'justify'}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis sint iusto quos, incidunt hic illo temporibus earum amet quaerat iure exercitationem perferendis natus nesciunt impedit unde laboriosam consectetur eum? Corporis?</p>
            </Col>
            <Col>
                <h3>Links</h3>
                <div className='d-flex flex-column justify-content-around'>
                    <Link to={'/'} className='text-light'>Landing</Link>
                    <Link to={'/auth'} className='text-light'>Login</Link>
                </div>
            </Col>
            <Col>
                <h3>Feedback</h3>
                <textarea name="" id="" className='form-control my-3'></textarea>
                <button className="btn btn-secondary">send</button>
            </Col>
        </Row>



    </div>
   </>
  )
}

export default Footer
