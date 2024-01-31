import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getRoom } from '../service/RoomsService';
import { getGuestFromUsername, getPromoCodes } from '../service/GuestService';
import { createReservation } from '../service/Reservations';

const MakeRervation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roomId = location.state?.roomId;
  const username = sessionStorage.getItem('username');

  const[isLoading,setIsLoading]=useState(false);

  const[room,setRoom]=useState({
    'id':'',
    'capacity':'',
    'description':'',
    'name':'',
    'picture':'',
    'price':''
  });

  const[guest,setGuest]=useState({
    'jmbg':'',
    'date_of_birth':'',
    'name':'',
    'lastname':'',
    'username':''
  });

  const[reservationPK,setReservationPK]=useState({
    'dateFrom':'',
    'dateTo':'',
    'id': room.id,
    'jmbg':guest.jmbg
  })

  const[reservation,setReservation]=useState({
    'reservationPK':reservationPK,
    'email':'',
    'price':room.price,
    'token':'',
  });

  const[promoCodes,setPromoCodes]=useState([]);
  
  const[selectedPromoCodes,setSelectedPromoCodes]=useState([]);

  useEffect(()=>{
    const retrieveRoom = async()=>{
      try{
        const response = await getRoom(roomId);
        setRoom(response);
      }catch(e){
        setRoom(null);
        console.log(e);
      }
    }
    retrieveRoom();
  },[roomId])

  useEffect(()=>{
    const retrieveGuest = async()=>{
      try{
        const response = await getGuestFromUsername(username);
        setGuest(response);
        const responsePromoCodes = getPromoCodes(response.jmbg);
        responsePromoCodes.then((result)=>{
          console.log(result);
          setPromoCodes(result.data);
        }).catch((error)=>{
          console.log(error);
          setPromoCodes([]);
        })
      }catch(e){
        setGuest(null);
        console.log(e);
      }
    }
    retrieveGuest();
  },[username])

  function handleInput(e){
    let newReservation = reservation;
    newReservation[e.target.name] = e.target.value;
    setReservation(newReservation);
  }

  function handleInputReservationPK(e){
    let newReservationPK = reservationPK;
    newReservationPK[e.target.name] = e.target.value;
    setReservationPK(newReservationPK);
  }

  const handleSelectedPromoCodes = (event)=>{
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    if(selectedOptions[0]!==-1){
      setSelectedPromoCodes(selectedOptions);
    }
    else{
      setSelectedPromoCodes([]);
    }
  };

  const makeReservation = async(e)=>{
    e.preventDefault();
    setIsLoading(true);
    reservationPK.id = room.id;
    reservationPK.jmbg = guest.jmbg;
    reservation.reservationPK = reservationPK;
    reservation.price = room.price;
    try{  
      const response = await createReservation(reservation);
      console.log(response);
      const emailToken = response.split(',');

      const email = emailToken[0];
      const token = emailToken[1];

      if(selectedPromoCodes.length !== 0){
        const promoCode = selectedPromoCodes[0];
        console.log(promoCode);
        //IMPLEMENTACIJA UPDATE CENE!!!!
      }

      document.getElementById('textAlertReservation').innerHTML = `Your reservation is successfully made. Your email is: ${email} and token: ${token}`;
      document.getElementById('alert').style.visibility = 'visible';
      setIsLoading(false);
    }catch(e){
      console.log(e);
      document.getElementById('textAlertReservation').innerHTML = 'Error making reservation';
      document.getElementById('alert').style.visibility = 'visible';
      setIsLoading(false);
    }
  }

  function confirm(){
    document.getElementById("alert").style.visibility = 'hidden';
    if(!(document.getElementById('textAlertReservation').innerHTML === 'Error making reservation')){
        navigate('/');
    }
  }

  return (
    <div className='reservations'>
      <div className='heading-reservations'>
          <h1>Make a reservation to</h1>
          <h1>{room.name}</h1>
          <h1>{room.description}</h1>
          <h1>Price:{room.price}</h1>
      </div>
      <div className='reservation-field'>
          <form className='reservation-form' onSubmit={makeReservation}>
            <label htmlFor='guest'>Guest</label>
            <input type='text' name='guest' id='guest' value={guest.name + " " + guest.lastname} readOnly/>
            <input type='text' name='jmbg' id='jmbg' value={guest.jmbg} readOnly/>
            <label style={{marginTop:'20px',marginBottom:'10px'}}>Reservation data</label>
            <label style={{fontSize:'large'}} htmlFor='dateFrom'>Date from</label>
            <input type='date' name='dateFrom' id='dateFrom' onInput={(e)=>handleInputReservationPK(e)}/>
            <label style={{fontSize:'large'}} htmlFor='dateTo'>Date to</label>
            <input type='date' name='dateTo' id='dateTo' onInput={(e)=>handleInputReservationPK(e)}/>
            <label style={{fontSize:'large'}} htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' onInput={(e)=>handleInput(e)}/>
            <label style={{marginTop:'20px', marginBottom:'10px'}} htmlFor='promoCodes'>Promo Code</label>
            <select name='promoCodes' id='selectionOption' multiple value={selectedPromoCodes} onChange={(e)=>handleSelectedPromoCodes(e)}>
              {promoCodes?.length
              ? (
                <>
                {promoCodes.map((promoCode,i)=>
                  <option style={{fontSize:'larger'}}key={i} value={promoCode?.id}>{promoCode?.code}</option>
                )}
                </>
              ):
                <option value={-1}>Guest doesn't have any promo codes</option>}
            </select>
            <div className='button' style={{textAlign:'center'}}>
              <input type="submit" name="makeReservation" id="btn-make-reservation" value="Make reservation"/>
            </div>
          </form>
          <img style={{width:'30%'}}className='roomImage' src={`data:image/jpeg;base64,${room.picture}`} alt='roomImage' />
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
              <p id="textAlertReservation"></p>
              <button id="confirm" onClick={(e)=>confirm(e)}>Confirm</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MakeRervation
