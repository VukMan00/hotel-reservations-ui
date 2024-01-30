import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  var pathname = location.pathname;

  return (
    <div className='navigationBar'>
      <div className='authentication'>
        {pathname==='/auth' || pathname==='/register' ? (
          <></>
        ):(
          <>
          <Link to="/auth" className='auth'>LogIn</Link>
          </>
        )}
      </div>
      
    </div>
  )
}

export default NavBar
