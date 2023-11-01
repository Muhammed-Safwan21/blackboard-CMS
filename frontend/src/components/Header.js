import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {FaUser} from 'react-icons/fa'
import { useSelector } from 'react-redux'
import logo from '../assets/logo.png'
import { LinkContainer} from 'react-router-bootstrap'


const Header = () => {
  const {userInfo} = useSelector(state=>state.auth)
  return (
    <header>
        <Navbar bg='dark' variant='dark' expand='md' className='px-4' collapseOnSelect>
                <LinkContainer to='/'>
                <Navbar.Brand  className='font-medium'>
                    <img src={logo} className='w-41 h-8' alt='blackboard'/>
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                  <Nav className='ms-auto '>
                  <LinkContainer to='/about'>
                <Nav.Link className='text-white'>About Us</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/contact'>
                <Nav.Link className='text-white'>Contact Us</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/faq'>
                <Nav.Link className='text-white'>FAQ</Nav.Link>
              </LinkContainer>
              {userInfo && (
                <div className='ml-3 flex flex-row items-center px-2 rounded-md bg-white text-black'>
                  <FaUser/><span className='ml-1'>{userInfo?.name}({userInfo?.role})</span>
                  </div>
              
              )}  
                  </Nav>
                </Navbar.Collapse>
        </Navbar>
    </header>
  )
}

export default Header