import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Layout from './layout/Layout';

import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Bookings from "./pages/Bookings";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import { AuthContext } from "../contexts/auth-context";
import { PrivateRoute } from "./PrivateRoute";
import Users from "./pages/Users";

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

  const loadLoggedUser = () => {
    try {
        console.log(localStorage.getItem('loggedUser'));
        return localStorage.getItem('loggedUser');
        if (localStorage.getItem('loggedUser') !== null && localStorage.getItem('loggedUser')) return true;
        // return localStorage.getItem('loggedUser') ? localStorage.getItem('loggedUser') : false;
        return false;
    } catch (err) {
        console.log(err);
    }
  }
  
  const x = loadLoggedUser();
  console.log("App");
  console.log(x);
  console.log("-----");
  const [logged, setLogged] = useState(x);

  return (
    <>
    <AuthContext.Provider value={{ logged, setLogged }}>
      <GlobalStyle  />    
        <Layout logged={logged}>
            <Routes>
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

              <Route path="/login" element={<Login />} />      
            </Routes>
        </Layout>
          
      </AuthContext.Provider>
    </>
  );
}

export default App;