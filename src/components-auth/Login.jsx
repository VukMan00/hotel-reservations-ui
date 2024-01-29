import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import awsExports from '../amplifyconfiguration.json'

Amplify.configure(awsExports);

const Login = () => {
  const[isLoading,setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const[user,setUser]=useState({
    'username':'',
    'password':''
  });

  const[guest,setGuest]=useState({
    'jmbg':'',
    'dateOfBirth':'',
    'name':'',
    'lastname':''
  });
  
  return (
    <div className='login-page'>
      <div className='login-component'>
        <div className='heading-login-page'>
          <h1>Welcome to LogIn page of</h1>
          <h1>Hotel FONsion</h1>
        </div>
        <Authenticator>
          {({ signOut, user}) => (
            <main>
              <h1>Hello {user.username}</h1>
              {console.log(user)}
              <button onClick={signOut}>Sign out</button>
            </main>
          )}
      </Authenticator>
      </div>
      <div className='image'>
        <img style={{border:'none'}} src='https://i.redd.it/e6fv5luhykp41.jpg'/>
      </div>
      <div id="alertLoading" style={isLoading ? {visibility:'visible'} : {visibility:'hidden'}}>
            <div id="boxLoading">
                <div className="message">
                    Alert!
                </div>
                <div className="content">
                    <p id="textAlert">Loading...</p>
                    <p id='textAlert'>Please wait!</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
