import logo from './logo.svg';
import './App.css';
import Ajout from './pages/Article/Ajout';
import { Route, Routes } from 'react-router-dom';
import List from './pages/Article/List';
import Details from './pages/Article/Details';
import FaceApi from './pages/Faceapi/Faceapi';
import Mety from './pages/Faceapi/Mety';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<FaceApi/>} ></Route>
      <Route exact path="/mety" element={<Mety/>} ></Route>
    </Routes> 
  );
}

export default App;
