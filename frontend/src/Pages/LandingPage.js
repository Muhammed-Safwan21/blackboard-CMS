import React from 'react'
import {Row, Col, Image} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <>
    <div className='mt-4 mb-3 pl-12 flex justify-center items-center'>
    <Row className='m-0'>
        <Col md={6} className='flex flex-column justify-center items-center'>
            <h1 className='leading-snug'><span>Empowering</span> Educators,<br/> <span>Engaging</span> Students,<br/><span>Enriching</span> Learning..!</h1>
            <div className='w-4/5 px-3'>
            <p >This platform offers the resources for efficient and 
               organized teaching,fostering collaboration and inspiring
               active participation. Join us in transforming education<br/>
               and changing lives.</p>
                <Link to='/login'>
                 <button className='bg-gray-500 text-white text-lg hover:bg-gray-700 rounded-3xl mt-2 py-2 px-3 '>Get Started</button>
                </Link>
            </div>
           
           
        </Col>
        <Col md={6}>
        <Image src="images/bg1.jpg" alt="landing-image" className='w-3/4'/>
        </Col>
    </Row>
    </div>
    </>
  )
}

export default LandingPage

