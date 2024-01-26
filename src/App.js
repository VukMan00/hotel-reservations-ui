import './App.css';
import {Routes,Route} from "react-router-dom";
import MainPage from './components/MainPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path={"/"} element={<MainPage />} />
    </Routes>
    </>
  );
}

export default App;
