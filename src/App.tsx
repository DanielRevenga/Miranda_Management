import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import Layout from './components/layout/Layout';
import Dashboard from "./components/pages/Dashboard";
import Rooms from "./components/pages/Rooms";
import Bookings from "./components/pages/Bookings";
import Contact from "./components/pages/Contact";
import Login from "./components/pages/Login";
// import { AuthContext } from "./contexts/auth-context";
import { PrivateRoute } from "./components/PrivateRoute";
import Users from "./components/pages/Users";
import { AuthProvider } from "./context/AuthContext";
import AddBooking from "./components/pages/AddBooking";
import EditBooking from "./components/pages/EditBooking";
import Register from "./components/pages/Register";
import { useDispatch } from "react-redux";
import { getBookings } from './features/bookings/bookingsSlice';

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 1em;
  }

  body, html{
    width: 100%;
    // overflow: hidden;
  }

  a{
    text-decoration: none;
    color: #fff;
  }
`;

// useEffect = (() =>{
//   try{
    
//   }catch(e){
//     console.log(e);
//   }}, []);

function App() {

  // const loadLoggedUser = () => {
  //   try {
  //       console.log(localStorage.getItem('loggedUser'));
  //       return localStorage.getItem('loggedUser');
  //       if (localStorage.getItem('loggedUser') !== null && localStorage.getItem('loggedUser')) return true;
  //       // return localStorage.getItem('loggedUser') ? localStorage.getItem('loggedUser') : false;
  //       return false;
  //   } catch (err) {
  //       console.log(err);
  //   }
  // }
  
  // const x = loadLoggedUser();
  // console.log("App");
  // console.log(x);
  // console.log("-----");
  // const [logged, setLogged] = useState(x);
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch(getBookings());
    dispatch(getBookings());
    dispatch(getBookings());
    dispatch(getBookings());
  }, []);

  return (
    <><BrowserRouter basename={process.env.PUBLIC_URL}>
    {/* <AuthContext.Provider value={{ logged, setLogged }}> */}
    <AuthProvider>
      <GlobalStyle />    
        <Layout>
            <Routes>
                {/* <Route  path='/' element={<PrivateRoute/>}>
                  <Route path='/' element={<Dashboard/>}/>          
                </Route> */}

              <Route path="/" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />

              <Route path="/rooms" element={
                <PrivateRoute>
                  <Rooms />
                </PrivateRoute>
              } />

              <Route path="/bookings" element={
                <PrivateRoute>
                  <Bookings />
                </PrivateRoute>
              } />

              <Route path="/contact" element={
                <PrivateRoute>
                  <Contact />
                </PrivateRoute>
              } />

              <Route path="/users" element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              } />

              <Route path="/addBooking" element={
                <PrivateRoute>
                  <AddBooking />
                </PrivateRoute>
              } />

              <Route path="/editBooking/:id" element={
                <PrivateRoute>
                  <EditBooking />
                </PrivateRoute>
              } />

                
            </Routes>

            <Routes>
              <Route path="/login" element={<Login />} />    
            </Routes>

            <Routes>
              <Route path="/registerTest" element={<Register />} />    
            </Routes>
            <Routes>
              <Route path="/loginTest" element={<Register />} />    
            </Routes>
            <Routes>
              <Route path="/getUserTest" element={<Register />} />    
            </Routes>
            <Routes>
              <Route path="/passportTest" element={<Register />} />    
            </Routes>
        </Layout>
      </AuthProvider>
      {/* </AuthContext.Provider> */}
      </BrowserRouter>
    </>
  );
}

export default App;
