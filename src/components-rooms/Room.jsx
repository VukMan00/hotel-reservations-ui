import React, { useEffect, useState } from 'react'

const Room = ({room}) => {
  return (
    <div className='room'>
      <img src={`data:image/jpeg;base64,${room.picture}`}  alt={`Picture of room ${room.name}`} />
      <h2>Name: {room.name}</h2>
      <h3>Description: {room.description}</h3>
      <h3>Capacity: {room.capacity}</h3>
    </div>
  )
}

export default Room
