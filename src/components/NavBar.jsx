import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  var pathname = location.pathname;

  return (
    <div className='navigationBar'>
      <div className='authentication'>
        {pathname==='/login' || pathname==='/register' ? (
          <></>
        ):(
          <>
          <Link to="/login" className='login'>LogIn</Link>
          <Link className='signup'>SignUp</Link>
          </>
        )}
      </div>
      
    </div>
  )
}

export default NavBar
