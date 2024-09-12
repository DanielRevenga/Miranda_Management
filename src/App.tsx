import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import "./App.css";

import Layout from './components/layout/Layout';
import Dashboard from "./components/pages/Dashboard";
import Rooms from "./components/pages/Rooms";
import Bookings from "./components/pages/Bookings";
import Users from "./components/pages/Users";
import Contact from "./components/pages/Contact";
import Login from "./components/pages/Login";
// import { AuthContext } from "./contexts/auth-context";
import { PrivateRoute } from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import AddBooking from "./components/pages/AddBooking";
import Register from "./components/pages/Register";
import { useDispatch } from "react-redux";
import { getBookings } from './features/bookings/bookingsSlice';
import { getRooms } from "./features/rooms/roomsSlice";
import { getContacts } from "./features/contacts/contactsSlice";
import { getUsers } from "./features/users/usersSlice";
import { ToastContainer } from "react-toastify";
import AddUser from "./components/pages/AddUser";
import EditUser from "./components/pages/EditUser";
import BookingsDetails from "./components/pages/BookingDetails";
import AddRoom from "./components/pages/AddRoom";
import EditRoom from "./components/pages/EditRoom";

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
  // const dispatch = useDispatch();

  const dispatch = useDispatch();
  const getStates = async() => { 
      await dispatch(getBookings());
      await dispatch(getRooms());
      await dispatch(getContacts());
      await dispatch(getUsers());
  }   
  
  useEffect( () => {
      const getStates2 = async() => {
          await getStates();
      }

      getStates2();
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

              {/* BOOKINGS */}
              <Route path="/bookings" element={
                <PrivateRoute>
                  <Bookings />
                </PrivateRoute>
              } />           

              <Route path="/bookings/addBooking" element={
                <PrivateRoute>
                  <AddBooking />
                </PrivateRoute>
              } />

              <Route path="/bookings/bookingDetails/:id" element={
                <PrivateRoute>
                  <BookingsDetails />
                </PrivateRoute>
              } />

              {/* ROOMS */}
              <Route path="/rooms" element={
                <PrivateRoute>
                  <Rooms />
                </PrivateRoute>
              } />

              <Route path="/rooms/editRoom" element={
                <PrivateRoute>
                  <AddRoom />
                </PrivateRoute>
              } />

              <Route path="/rooms/editRoom/:id" element={
                <PrivateRoute>
                  <EditRoom />
                </PrivateRoute>
              } />

              {/* CONTACTS */}
              <Route path="/contact" element={
                <PrivateRoute>
                  <Contact />
                </PrivateRoute>
              } />


              {/* USERS */}
              <Route path="/users" element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              } />

              <Route path="/users/addUser" element={
                <PrivateRoute>
                  <AddUser />
                </PrivateRoute>
              } />

              <Route path="/users/editUser/:id" element={
                <PrivateRoute>
                  <EditUser />
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
        <ToastContainer
                    position="top-right"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
      </AuthProvider>
      {/* </AuthContext.Provider> */}
      </BrowserRouter>
    </>
  );
}

export default App;
