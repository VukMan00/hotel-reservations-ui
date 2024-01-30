import React from 'react'

const Registration = () => {
  return (
    <div className='authentication-page'>
      <div className='authentication-component'>
        <div className='heading-authentication-page'>
          <h1>Welcome to Registration page of</h1>
          <h1>Hotel FONsion</h1>
        </div>
        <form className='registration-form'>
          <label htmlFor='username'>Username</label>
          <input type="text" name="username" id="username" placeholder='Type username...'/>
          <label htmlFor='password'>Password</label>
          <input type="password" name="password" id="password" placeholder='Type password...'/>
          <label htmlFor='jmbg'>JMBG</label>
          <input type="jmbg" name="jmbg" id="jmbg" placeholder='Type JMBG - 13 letters...'/>
          <label htmlFor='dateOfBirth'>Date of birth</label>
          <input type="date" name="dateOfBirth" id="dateOfBirth"/>
          <label htmlFor='name'>Firstname</label>
          <input type="text" name="name" id="name" placeholder='Type firstname...'/>
          <label htmlFor='lastname'>Lastname</label>
          <input type="text" name="lastname" id="lastname" placeholder='Type lastname...'/>
          <div className='button'>
              <input type="submit" name="register" id="btn-register" value="Register" />
          </div>
        </form>
      </div>
      <div className='image'>
        <img style={{border:'none'}} src='https://i.redd.it/e6fv5luhykp41.jpg' alt='Slavija/Belgrade'/>
      </div>
    </div>
  );
}

export default Registration
