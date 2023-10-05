import React, { useEffect } from "react";
import { useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader/Loader";
import { validateEmail } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { login, RESET_AUTH } from "../../redux/features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoading, isLoggedIn , isSuccess} = useSelector(
    (state) => state.auth
  )

  

  const loginUser = async(e) => {
    // e.preventDefault();
    // setIsLoading(true);
    // axios.post("http://localhost:3001/login", { email, password })
    //   .then(result => {
    //     console.log(result.data);
    //     if(result.data === "Success"){
    //       toast.success("Login Successful...");
    //       setTimeout(() => {
    //         setIsLoading(false)
    //         navigate('/')
    //       }, 1000);
    //     }
    //     // } else if(result.data === "The password is incorrect"){
    //     //   toast.error("The password is incorrect")
    //     // }else{
    //     //   toast.error("No record existed")

    //     // }
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //     toast.error(err.message);
    //   });
    
    e.preventDefault();
    console.log( email, password);
    if(!email || !password){
      return toast.error("All fields are required")
    }
    
    if(!validateEmail(email)){
      return toast.error("Please enter a valid email");
    }
   
    const userData = {
      
      email,
      password,
    }
    console.log(userData);
    
    await dispatch(login(userData));
  };

  useEffect(() =>{
    if(isSuccess && isLoggedIn){
      navigate('/');

    } 
    dispatch(RESET_AUTH());
  },[isSuccess, isLoggedIn, dispatch, navigate])


  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>-- or --</p>
            </form>
            <button className="--btn --btn-danger --btn-block">
              <FaGoogle color="#fff" /> Login With Google
            </button>
            <span className={styles.register}>
              <p>Don't have an account?</p>
              <Link to="/register">Register</Link>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
