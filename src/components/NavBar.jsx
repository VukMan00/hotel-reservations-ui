import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();
  var pathname = location.pathname;

  function logOut(){
    sessionStorage.clear();
    window.location.reload();
  }

  return (
    <div className='navigationBar'>
      <div className='authentication'>
        {pathname==='/auth' || pathname==='/register' ? (
          <></>
        ):(
          <>
          {sessionStorage.getItem('accessToken')!==undefined && sessionStorage.getItem('accessToken')!=='' && sessionStorage.getItem('accessToken')!==null ? (
            <>
            <button className='auth' onClick={()=>logOut()}>LogOut</button>
            <h1>{sessionStorage.getItem('username')}</h1>
            </>
          ):(
            <>
            <Link to="/auth" className='auth'>LogIn</Link>
            <Link to="/register" className='auth'>Register</Link>
            </>
          )}
          </>
        )}
      </div>
      
    </div>
  )
}

export default NavBar
