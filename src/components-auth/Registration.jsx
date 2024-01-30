import {CognitoUser, CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom';

const Registration = () => {
  const[isLoading,setIsLoading]=useState(false);
  const navigate = useNavigate();

  const[user,setUser] = useState({
    'username':'',
    'password':'',
    'email':'',
    'jmbg':'',
    'dateOfBirth':'',
    'name':'',
    'lastname':'',  
  });

  const[codeRegistration,setCodeRegistration]=useState('');

  const userPool = new CognitoUserPool({
    UserPoolId: 'us-east-1_0JjHGByy9',
    ClientId: '1ldkq6d1h0hhnmtg4usa6ef5om',
  });

  function handleInput(e){
    let newUser = user;
    newUser[e.target.name]=e.target.value;
    setUser(newUser);
  }

  const register = async(e)=>{
    e.preventDefault();
    setIsLoading(true);
    try{
      const attributeList = [
        new CognitoUserAttribute({ Name: 'email', Value: user.email }),
      ];
      userPool.signUp(user.username, user.password, attributeList, null, (err, result) => {
        if (err) {
          console.error('Registration error', err);
          setIsLoading(false);
          document.getElementById('textAlertRegistration').innerHTML = 'Registration failed';
          document.getElementById('alert').style.visibility = 'visible';
        } else {
          const cognitoUser = result.user;
          console.log('Registration successful. Cognito User:', cognitoUser);
          setIsLoading(false);
          document.getElementById('alertConfirmRegistration').style.visibility = 'visible';
        }
      });
    }catch(e){
      console.log(e);
    }
  }

  const confirmRegistration = async(e)=>{
    e.preventDefault();
    setIsLoading(true);
    try {
      const userData = {
        Username: user.username,
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
          <input type="text" name="username" id="username" placeholder='Type username...' onInput={(e)=>handleInput(e)}/>
          <label htmlFor='password'>Password</label>
          <input type="password" name="password" id="password" placeholder='Type password...' onInput={(e)=>handleInput(e)}/>
          <label htmlFor='email'>Email</label>
          <input type="email" name="email" id="email" placeholder='Type email...' onInput={(e)=>handleInput(e)}/>
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
