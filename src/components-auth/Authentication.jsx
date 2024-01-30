import React, { useState } from 'react'
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Authentication = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const signIn = async(e) => {
    e.preventDefault();
    setIsLoading(true)
    const authenticationData = {
      Username: username,
      Password: password,
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const poolData = {
      UserPoolId: 'us-east-1_0JjHGByy9',
      ClientId: '1ldkq6d1h0hhnmtg4usa6ef5om',
    };

    const userPool = new CognitoUserPool(poolData);

    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        console.log('Authentication successful', session);

        // Access the JWT token
        const accessToken = session.getAccessToken().getJwtToken();
        console.log('JWT Token:', accessToken);
        setIsLoading(false);
        sessionStorage.setItem('accessToken',accessToken);
        sessionStorage.setItem('username',username);
        document.getElementById('textAlertLogin').innerHTML ='Login is successfull';
        document.getElementById("alert").style.visibility = 'visible';
      },
      onFailure: (error) => {
        console.error('Authentication failed', error);
        setIsLoading(false);
        document.getElementById('textAlertLogin').innerHTML = 'Incorrect username or password';
        document.getElementById("alert").style.visibility = 'visible';
      },
    });
  };

  function confirm(){
    document.getElementById("alert").style.visibility = 'hidden';
    if(document.getElementById('textAlertLogin').innerHTML === 'Login is successfull'){
        navigate(from,{replace:true});
    }
  }

  return (
    <div className='authentication-page'>
      <div className='authentication-component'>
        <div className='heading-authentication-page'>
          <h1>Welcome to LogIn page of</h1>
          <h1>Hotel FONsion</h1>
        </div>
        <form className='login-form' onSubmit={signIn}>
          <label htmlFor='username'>Username</label>
          <input type="text" name="username" id="username" placeholder='Type username...' onInput={(e)=>setUsername(e.target.value)} />
          <label htmlFor='password'>Password</label>
          <input type="password" name="password" id="password" placeholder='Type password' onInput={(e)=>setPassword(e.target.value)}/>
          <div className='button'>
              <input type="submit" name="login" id="btn-login" value="LogIn" />
          </div>
          <p style={{fontSize:'large'}}>Don't have account? <Link to={"/register"} style={{textDecoration:'none',color:'rgba(54, 194, 241, 0.82)'}} className='link-register'>Register here</Link></p>
        </form>
      </div>
      <div className='image'>
        <img style={{border:'none'}} src='https://i.redd.it/e6fv5luhykp41.jpg' alt='Slavija/Belgrade'/>
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
      <div id="alert">
        <div id="box">
            <div className="message">
                Alert!
            </div>
            <div className="content">
                <p id="textAlertLogin"></p>
                <button id="confirm" onClick={()=>confirm()}>OK</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Authentication
