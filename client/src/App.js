import React,{useEffect, useState} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";


function App() {
  const [isAuthenticated, setisAuthenticate] = useState(false);

  const setAuth = (boolean)=>{
    setisAuthenticate(boolean);
  }

  async function isAuth(){
    try {

      const response = await fetch("http://localhost:5000/auth/is-verify",{
        method: "GET",
        headers: {token: localStorage.token}
      });

      const parseRes = await response.json()
      parseRes === true ? setisAuthenticate(true) : setisAuthenticate(false);
      
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(()=>{
    isAuth()
  })
  
  return (
    <Router>
      <div className="container-fluid">
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login setAuth={setAuth}/> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <Register setAuth={setAuth}/> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard setAuth={setAuth}/> : <Navigate to="/login"/>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
 
