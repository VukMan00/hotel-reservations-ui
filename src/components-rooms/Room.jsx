import React from 'react'
import { Link } from 'react-router-dom'

const Room = ({room}) => {
  return (
    <div className='room'>
      <img className='roomImage' src={`data:image/jpeg;base64,${room.picture}`} alt='roomImage' />
      <h2>Name: {room.name}</h2>
      <h3>Description: {room.description}</h3>
      <h3>Capacity: {room.capacity}</h3>
      {sessionStorage.getItem('accessToken')!=undefined ? (
        <>
        <Link to={'/reservations'} className='make-reservations' state={{roomId:room.id}}>Make a reservation</Link>
        </>
      ):(
        <></>
      )}
    </div>
  )
}

export default Room
