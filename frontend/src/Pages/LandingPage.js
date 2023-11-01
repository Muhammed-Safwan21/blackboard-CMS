import React from 'react'
import {Row, Col, Image, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <>
    <div className='mt-4 mb-3 flex justify-center items-center'>
    <Row className='m-0'>
        <Col md={6} className='flex flex-column justify-center items-center'>
            <h1><span>Empowering</span> Educators,<br/> <span>Engaging</span> Students,<br/><span>Enriching</span> Learning..!</h1>
            <div className='w-4/5 px-4'>
            <p>This platform offers the resources for efficient and organized teaching,
                fostering collaboration and inspiring active participation.
                Join us in transforming education and changing lives.</p>
                <Link to='/login'>
                 <Button className='button hover:bg-gray-900'>Get Started</Button>
                </Link>
            </div>
           
           
        </Col>
        <Col md={6}  >
        <Image src="images/bg-landing.png" alt="landing-image" />
        </Col>
    </Row>
    </div>
    </>
  )
}

export default LandingPage


//     .image-container{
//         display: flex;
//         justify-content: flex-end;
       
//     }
//     @media (max-width:768px) {
//         text-align: center;
//         .text-container{
//             margin-top: 20px;
//             justify-content: center;
//         }
//         .image-container{
//             justify-content: center;

//         }
        
//     }
// }

