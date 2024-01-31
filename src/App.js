import './App.css';
import React from 'react';
import {Routes,Route} from "react-router-dom";
import MainPage from './components/MainPage';
import NavBar from './components/NavBar';
import Authentication from './components-auth/Authentication';
import Registration from './components-auth/Registration';
import MakeRervation from './components-reservations/MakeRervation';

function App() {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path={"/"} element={<MainPage />} />
      <Route path={"/auth"} element={<Authentication />} />
      <Route path={"/register"} element={<Registration />} />
      <Route path={"/reservations"} element={<MakeRervation />} />
    </Routes>
    </>
  );
}

export default App;
