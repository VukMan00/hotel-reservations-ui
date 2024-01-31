import {CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom';
import { deleteGuest, saveGuest } from '../service/GuestService';

const Registration = () => {
  const[isLoading,setIsLoading]=useState(false);
  const navigate = useNavigate();

  const[username,setUsername]=useState('');
  const[password,setPassword]=useState('');
  const[email,setEmail]=useState('');

  const[guest,setGuest] = useState({
    'jmbg':'',
    'dateOfBirth':'',
    'name':'',
    'lastname':'',
    'username':username  
  });

  const[codeRegistration,setCodeRegistration]=useState('');

  const userPool = new CognitoUserPool({
    UserPoolId: 'us-east-1_2luIwzMCv',
    ClientId: '29m9qjp3qkpc43j7e6773eofao',
  });

  function handleInput(e){
    let newGuest = guest;
    newGuest[e.target.name]=e.target.value;
    setGuest(newGuest);
  }

  const register = async(e)=>{
    e.preventDefault();
    setIsLoading(true);
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
    ];
    guest.username = username;
    const response = saveGuest(guest);
    response.then((result)=>{
      console.log(result);
      userPool.signUp(username, password, attributeList, null, (err, result) => {
        setIsLoading(false);
        if (err) {
          console.error('Registration error', err);
          const response = deleteGuest(guest.jmbg);
          console.log(response);
          document.getElementById('textAlertRegistration').innerHTML = 'Registration failed';
          document.getElementById('alert').style.visibility = 'visible';
        } else {
          const cognitoUser = result.user;
          console.log('Registration successful. Cognito User:', cognitoUser);
          document.getElementById('alertConfirmRegistration').style.visibility = 'visible';
        }
      });
    }).catch((error)=>{
      console.log(error);
      setIsLoading(false);
      document.getElementById('textAlertRegistration').innerHTML = 'Registration failed';
      document.getElementById('alert').style.visibility = 'visible';
    });
  }

  const confirmRegistration = async(e)=>{
    e.preventDefault();
    setIsLoading(true);
    try {
      const userData = {
        Username: username,
        Pool: userPool,
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.confirmRegistration(codeRegistration, true, (err, result) => {
        if(codeRegistration===''){
          return;
        }
        document.getElementById('alertConfirmRegistration').style.visibility = 'hidden';
        if (err) {
          console.error('Verification error', err);
          setIsLoading(false);
          document.getElementById('textAlertRegistration').innerHTML = 'Verification of code failed';
          document.getElementById('alert').style.visibility = 'visible';
        } else {
          console.log('Verification successful. Result:', result);
          setIsLoading(false);
          document.getElementById('textAlertRegistration').innerHTML = 'Registration is successfull';
          document.getElementById('alert').style.visibility = 'visible';
        }
      });
    } catch (error) {
      console.error('Error during verification', error);
    }
  }

  function confirm(){
    document.getElementById("alert").style.visibility = 'hidden';
    if(document.getElementById('textAlertRegistration').innerHTML === 'Registration is successfull'){
        navigate('/auth');
    }
  }

  return (
    <div className='authentication-page'>
      <div className='authentication-component'>
        <div className='heading-authentication-page'>
          <h1>Welcome to Registration page of</h1>
          <h1>Hotel FONsion</h1>
        </div>
        <form className='registration-form' onSubmit={register}>
          <label htmlFor='username'>Username</label>
          <input type="text" name="username" id="username" placeholder='Type username...' onChange={(e)=>setUsername(e.target.value)}/>
          <label htmlFor='password'>Password</label>
          <input type="password" name="password" id="password" placeholder='Type password...' onChange={(e)=>setPassword(e.target.value)}/>
          <label htmlFor='email'>Email</label>
          <input type="email" name="email" id="email" placeholder='Type email...' onChange={(e)=>setEmail(e.target.value)}/>
          <label htmlFor='jmbg'>JMBG</label>
          <input type="jmbg" name="jmbg" id="jmbg" placeholder='Type JMBG - 13 letters...' onInput={(e)=>handleInput(e)}/>
          <label htmlFor='dateOfBirth'>Date of birth</label>
          <input type="date" name="dateOfBirth" id="dateOfBirth" onInput={(e)=>handleInput(e)}/>
          <label htmlFor='name'>Firstname</label>
          <input type="text" name="name" id="name" placeholder='Type firstname...' onInput={(e)=>handleInput(e)}/>
          <label htmlFor='lastname'>Lastname</label>
          <input type="text" name="lastname" id="lastname" placeholder='Type lastname...' onInput={(e)=>handleInput(e)}/>
          <div className='button'>
              <input type="submit" name="register" id="btn-register" value="Register"/>
          </div>
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
      <div id="alertConfirmRegistration">
        <div id="boxConfirmRegistration">
          <div className="message">
              Alert!
          </div>
          <div className="content">
            <label id="textConfirmRegistration" htmlFor='code'>Unesite code:</label>
            <input style={{border:'2px solid black'}} name='code' type="text" value={codeRegistration} onChange={(e) => setCodeRegistration(e.target.value)} />
            <button id="confirm" onClick={(e)=>confirmRegistration(e)}>Confirm</button>
          </div>
        </div>
      </div>
      <div id="alert">
        <div id="box">
            <div className="message">
                Alert!
            </div>
            <div className="content">
                <p id="textAlertRegistration"></p>
                <button id="confirm" onClick={(e)=>confirm(e)}>Confirm</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Registration
