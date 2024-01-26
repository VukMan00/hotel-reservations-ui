import React from 'react';
import Rooms from '../components-rooms/Rooms';

const MainPage = () => {
  return (
    <div className='mainPage'>
      <div className='pageInfo'>
        <h1 id='fonsionTitle'>Hotel FONsion</h1>
        <h3 className='description'>Hotel FONsion is one of the best hotels in Belgrade.</h3>
        <h3 className='description'>Located nearby Slavija, hotel FONsion is positioned in one of the most urban and popular places in Belgrade.</h3>
        <h3 className='description'>FONsion has 5 stars grade and is also a home to a number of buissness and corporate managers, directors, CEOs, CFOs and so on.</h3>
      </div>
      <div className='pageOfRooms'>
        <div className='headingOfRooms'>
          <h1>Available rooms</h1>
        </div>        
        <Rooms />
      </div>
    </div>
  )
}

export default MainPage
