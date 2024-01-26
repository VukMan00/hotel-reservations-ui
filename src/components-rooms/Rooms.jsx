import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Room from './Room';
import { getRooms } from '../service/RoomsService';

const Rooms = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const[rooms,setRooms]=useState([]);

  useEffect(()=>{
    let isMounted = true;
    const controller = new AbortController();
    const getAllRooms = async()=>{
      try{
        const dbRooms = await getRooms();
        isMounted && setRooms(dbRooms);
      }catch(err){
        console.error(err);
        setRooms([]);
      }
    }
    getAllRooms();
  
    return ()=>{
      isMounted = false;
      isMounted && controller.abort();
    }
  },[location,navigate]);

  return (
    <div className='rooms'>
      <div className='array-of-rooms'>
        {console.log(rooms)}
        {rooms.map((room,i)=>
          <Room key={i} room={room} />
        )}
      </div>
    </div>
  )
}

export default Rooms
