import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getPayments } from '../service/Reservations';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  var pathname = location.pathname;

  const[myPayments,setMyPayments]=useState(0);

  useEffect(()=>{
    const retrieveMyPayments = async()=>{
      try{
        const jmbg = sessionStorage?.getItem('jmbg');
        if(jmbg!==null){
          const response = await getPayments(jmbg);
          setMyPayments(response?.data)
        }
      }catch(e){
        console.log(e);
      }
    }
    retrieveMyPayments();
  })

  function logOut(){
    sessionStorage.clear();
    navigate('/');
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
            <h2>My Payments: {myPayments} RSD</h2>
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
