import React, { useEffect, useState } from 'react'
import { deleteReservation} from '../service/Reservations';
import { useNavigate } from 'react-router-dom';

const GetReservation = () => {

  const[isLoading,setIsLoading]=useState(false);
  const[email,setEmail]=useState('');
  const[token,setToken]=useState('');
  
  const navigate = useNavigate();

  const[reservation]=useState({
    'guestName':sessionStorage?.getItem('guestName'),
    'guestLastname':sessionStorage?.getItem('guestLastname'),
    'guestJMBG':sessionStorage?.getItem('guestJMBG'),
    'dateFrom':sessionStorage?.getItem('dateFrom'),
    'dateTo':sessionStorage?.getItem('dateTo'),
    'roomName':sessionStorage?.getItem('roomName'),
    'roomDescription':sessionStorage?.getItem('roomDescription'),
    'roomPrice':sessionStorage?.getItem('roomPrice'),
    'roomPicture':sessionStorage?.getItem('roomPicture'),
    'email':sessionStorage?.getItem('email'),
    'token':sessionStorage?.getItem('token')
  })

  useEffect(()=>{
    sessionStorage.removeItem('guestName');
    sessionStorage.removeItem('guestLastname');
    sessionStorage.removeItem('guestJMBG');
    sessionStorage.removeItem('dateFrom');
    sessionStorage.removeItem('dateTo');
    sessionStorage.removeItem('roomName');
    sessionStorage.removeItem('roomDescription');
    sessionStorage.removeItem('roomPrice');
    sessionStorage.removeItem('roomPicture');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('token');
  },[]);

  const showCredentials = async(e)=>{
    e.preventDefault();
    document.getElementById('alertCredentials').style.visibility='visible';
  }

  const confirmCredentials = async(e)=>{
    e.preventDefault();
    setIsLoading(true);
    try{
        if(reservation.email === email && reservation.token === token){
            const response = await deleteReservation(email,token);
            console.log(response);
            setIsLoading(false);
            document.getElementById('textAlertDeleting').innerHTML = 'Reservation is successfully deleted';
            document.getElementById('alert').style.visibility = 'visible';
        }else{
            setIsLoading(false);
            document.getElementById('textAlertDeleting').innerHTML = 'Invalid credentials of reservation';
            document.getElementById('alert').style.visibility = 'visible';
        }
    }catch(e){
      setIsLoading(false);
      let error = e.response.data.message.error;
      if(error.includes('404')){
        document.getElementById('textAlertDeleting').innerHTML = 'Reservation not found';
        document.getElementById('alert').style.visibility = 'visible';
      }
      else{
        document.getElementById('textAlertDeleting').innerHTML = 'Request failed';
        document.getElementById('alert').style.visibility = 'visible';
      }
    }
  }

  function confirm(){
    document.getElementById("alert").style.visibility = 'hidden';
    if((document.getElementById('textAlertDeleting').innerHTML === 'Reservation is successfully deleted')){
        navigate('/');
    }
  }

  function close(e){
    e.preventDefault();
    document.getElementById('alertCredentials').style.visibility='hidden';
  }

  return (
    <div className='reservations'>
        <div className='heading-reservations'>
          <h1>Your reservation</h1>
          <h1>{reservation.roomName}</h1>
          <h1>{reservation.roomDescription}</h1>
        </div>
        <div className='reservation-field'>
            <form className='reservation-form' onSubmit={showCredentials}>
                <label htmlFor='guest'>Guest</label>
                <input type='text' name='guest' id='guest' value={reservation.guestName + " " + reservation.guestLastname} readOnly/>
                <input type='text' name='jmbg' id='jmbg' value={reservation.guestJMBG} readOnly/>
                <label style={{marginTop:'20px',marginBottom:'10px'}}>Reservation data</label>
                <label style={{fontSize:'large'}} htmlFor='dateFrom'>Date from</label>
                <input type='text' name='dateFrom' id='dateFrom' value={reservation.dateFrom} readOnly/>
                <label style={{fontSize:'large'}} htmlFor='dateTo'>Date to</label>
                <input type='text' name='dateTo' id='dateTo' value={reservation.dateTo} readOnly/>
                <label htmlFor='price' style={{fontSize:'large'}}>Paid price</label>
                <input type="text" name="price" id="price" value={reservation.roomPrice} readOnly/>
                <label htmlFor='email' style={{fontSize:'large'}}>Email</label>
                <input type="text" name="email" id="email" value={reservation.email} readOnly/>
                <label htmlFor='token' style={{fontSize:'large'}}>Token</label>
                <input type="password" name="token" id="token" value={reservation.token} readOnly/>
                <div className='button' style={{textAlign:'center'}}>
                    <input type="submit" name="deleteReservation" id="btn-delete-reservation" value="Delete reservations"/>
                </div>
            </form>
            <img style={{width:'40%',height:'40%',borderRadius:'20px',border:'5px solid black'}}className='roomImage' src={`data:image/jpeg;base64,${reservation.roomPicture}`} alt='roomImage' />
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
                        <input type='password' style={{border:'2px solid black'}} name='token' id='token' placeholder='Type token...' onChange={(e)=>setToken(e.target.value)} />
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
                    <p id="textAlertDeleting">Reservation is successfully deleted</p>
                    <button id="confirm" onClick={(e)=>confirm(e)}>Confirm</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default GetReservation
