import { BrowserRouter, Route, Routes } from "react-router-dom";

// pages
import {Home, Contact, Login, Register, Reset} from "./pages";

// components
import {Header, Footer} from "./components"
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoginStatus } from "./redux/features/auth/authSlice";
import Profile from "./pages/profile/Profile";



function App() {


  axios.defaults.withCredentials = true;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoginStatus())
 
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
      <ToastContainer />
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />   
          <Route path="/contact" element={<Contact />} />   
          <Route path="/login" element={<Login />} />   
          <Route path="/register" element={<Register />} />   
          <Route path="/reset" element={<Reset />} />   
          <Route path="/profile" element={<Profile />}/>
          
        </Routes>
      <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
