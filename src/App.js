import './App.css';
import React from 'react';
import {Routes,Route} from "react-router-dom";
import MainPage from './components/MainPage';
import NavBar from './components/NavBar';
import Login from './components-auth/Login';

function App() {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path={"/"} element={<MainPage />} />
      <Route path={"/login"} element={<Login />} />
    </Routes>
    </>
  );
}

export default App;
