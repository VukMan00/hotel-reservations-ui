import React, { useState } from 'react';
import Rooms from '../components-rooms/Rooms';
import { Link, useNavigate } from 'react-router-dom';
import { getReservation } from '../service/Reservations';

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const[email,setEmail]=useState('');
  const[token,setToken]=useState('');

  const showReservation = async(e)=>{
    e.preventDefault();
    document.getElementById('alertCredentials').style.visibility='visible';
  }

  const confirmCredentials = async(e)=>{
    e.preventDefault();
    setIsLoading(true);
    try{
      const response = await getReservation(email,token);
      console.log(response);
      sessionStorage.setItem('roomName',response.room.name);
      sessionStorage.setItem('roomDescription',response.room.description);
      sessionStorage.setItem('roomPrice',response.price);
      sessionStorage.setItem('roomPicture',response.room.picture);
      sessionStorage.setItem('guestName',response.guest.name);
      sessionStorage.setItem('guestLastname',response.guest.lastname);
      sessionStorage.setItem('guestJMBG',response.reservationPK.jmbg);
      sessionStorage.setItem('dateFrom',response.reservationPK.dateFrom);
      sessionStorage.setItem('dateTo',response.reservationPK.dateTo);
      sessionStorage.setItem('email',email);
      sessionStorage.setItem('token',token);
      setIsLoading(false);
      navigate('/myreservations');
    }catch(e){
      setIsLoading(false);
      let error = e.response.data.message.error;
      if(error.includes('404')){
        document.getElementById('textAlertError').innerHTML = 'Reservation not found';
        document.getElementById('alert').style.visibility = 'visible';
      }
      else{
        document.getElementById('textAlertError').innerHTML = 'Request failed';
        document.getElementById('alert').style.visibility = 'visible';
      }
    }
  }

  function confirm(){
    document.getElementById("alert").style.visibility = 'hidden';
  }

  function close(e){
    e.preventDefault();
    document.getElementById('alertCredentials').style.visibility='hidden';
  }

  return (
    <div className='mainPage'>
      <div className='pageInfo'>
        <h1 id='fonsionTitle'>Hotel FONsion</h1>
        <h3 className='description'>Hotel FONsion is one of the best hotels in Belgrade.</h3>
        <h3 className='description'>Located nearby Slavija, hotel FONsion is positioned in one of the most urban and popular places in Belgrade.</h3>
        <h3 className='description'>FONsion has 5 stars grade and is also a home to a number of buissness and corporate managers, directors, CEOs, CFOs and so on.</h3>
        {sessionStorage?.getItem('accessToken')!=undefined ? (
          <div style={{height:'auto',marginTop:'15%',display:'flex',flexDirection:'row',justifyContent:'center'}}>
            <Link className='btn-my-reservations' onClick={(e)=>showReservation(e)}>My reservation</Link>
          </div>
        ):(
          <>
          </>
        )}
      </div>
      <div className='pageOfRooms'>
        <div className='headingOfRooms'>
          <h1>Available rooms</h1>
        </div>        
        <Rooms />
      </div>
      <div id="alertLoading" style={isLoading ? {visibility:'visible'} : {visibility:'hidden'}}>
        <div id="boxLoading">
          <div className="message">
              Alert!
          </div>
          <div className="content" style={{color:'black'}}>
              <p id="textAlert">Loading...</p>
              <p id='textAlert'>Please wait!</p>
          </div>
        </div>
      </div>
      <div id="alertCredentials">
        <div id="box">
          <div className="message">
              Alert!
              <button id="close" onClick={(e)=>close(e)}>X</button>
          </div>
          <div className="content" style={{color:'black'}}>
              <p id="textReservationCredentials">Insert credentials of reservation</p>
              <form style={{display:'flex',flexDirection:'column',textAlign:'left',padding:'5px 5px 5px 5px'}} onSubmit={confirmCredentials}>
                <label htmlFor='email'>Email:</label>
                <input style={{border:'2px solid black'}} name='email' id='email' placeholder='Type email...' onChange={(e)=>setEmail(e.target.value)} />
                <label htmlFor='token'>Token:</label>
                <input type="password" style={{border:'2px solid black'}} name='token' id='token' placeholder='Type token...' onChange={(e)=>setToken(e.target.value)} />
                <input type='submit' id="confirm" name="confirm" value={'Submit'} />
              </form>
          </div>
        </div>
      </div>
      <div id="alert">
        <div id="box">
            <div className="message">
                Alert!
            </div>
            <div className="content" style={{color:'black'}}>
                <p id="textAlertError"></p>
                <button id="confirm" onClick={(e)=>confirm(e)}>Confirm</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
