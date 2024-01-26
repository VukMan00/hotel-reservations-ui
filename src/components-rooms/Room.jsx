import React from 'react'

const Room = ({room}) => {
  return (
    <div className='room'>
      <img className='roomImage' src={`data:image/jpeg;base64,${room.picture}`} alt='roomImage' />
      <h2>Name: {room.name}</h2>
      <h3>Description: {room.description}</h3>
      <h3>Capacity: {room.capacity}</h3>
    </div>
  )
}

export default Room
