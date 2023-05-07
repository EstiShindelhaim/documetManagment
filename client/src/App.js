import Files from "./Components/files/files";
import Home from "./Components/Home";
import React from "react";
import Login from "./Components/login/login";
import Officers from "./Components/officers/officers"
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import {useNavigate, useLocation} from "react-router-dom"
import Menu from "./Components/menu";
import ProfessionUnit from "./Components/professionUnit/professionUnit";
import Dashboard from "./Components/dashbord/dashbord";
import {useEffect, useState } from "react";
import UserProvider from "./Components/User/UserProvider";
import SpecificFiles from "./Components/files/specificFile";
// import { useEffect, useState, useContext } from 'react'



function App() {
const location= useLocation().pathname;
const [userId, setUserId] = useState('');


useEffect(() => {
  const userIdFromLocalStorage = localStorage.getItem("userId");
  if (userIdFromLocalStorage) setUserId(userIdFromLocalStorage);
}, []);

// useEffect(() => {
//   const userIdFromLocalStorage = localStorage.getItem("userId");
//   if (userIdFromLocalStorage) setUserId(userIdFromLocalStorage);
// }, []);

const setUserIdCallback = (id) => {
  console.log("logggggggggggggggggggggggggggg",id);
  setUserId(id);
}
  return (<>
  <UserProvider user1={userId}>
    <div className="App" style={{ direction: "rtl"}}>
      {(location==="/" || location==="/Login" )?<></>:<Menu></Menu>}
     {/* <Router> */}
            <Routes>
            <Route path='/' element={<Login setUserId={setUserIdCallback}></Login>} />
            <Route path='/home' element={<Home />} />
            <Route path='/officers' element={<Officers />} />
            <Route path='/files' element={<Files />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/professionUnits' element={<ProfessionUnit />} />
            <Route exact path='/file/:id' element={<SpecificFiles/>}></Route>
            <Route path='*' element={<h1> 404 Page not found</h1>} />
            </Routes>
      {/* </Router> */}
      {/* <Home/> */}
      {/* <Login></Login>  */}
    </div>
    </UserProvider>
    </>
  );
}

export default App;
