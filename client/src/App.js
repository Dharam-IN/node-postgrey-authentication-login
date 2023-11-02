import React,{useState} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";


function App() {
  const [isAuthenticated, setisAuthenticate] = useState(false);

  const setAuth = (boolean)=>{
    setisAuthenticate(setAuth);
  }
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login setAuth={setAuth}/> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <Register setAuth={setAuth}/> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard setAuth={setAuth}/> : <Navigate to="/login"/>} />
      </Routes>
    </Router>
  );
}

export default App;
 