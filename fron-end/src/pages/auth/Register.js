import { useEffect, useState } from "react";
import { Link, useNavigate,  } from "react-router-dom";
import registerImg from "../../assets/register.png";
import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { toast, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateEmail } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { register, RESET_AUTH } from "../../redux/features/auth/authSlice";
import Loader from "../../components/loader/Loader";

const initialState = {
  name:"",
  email:"",
  password:"",
  cPassword:"",
};

const Register = () => {

  const [formData, setFormData] = useState(initialState);
  const {name, email, password, cPassword} = formData;

  const dispatch = useDispatch();

  const {isLoading, isLoggedIn , isSuccess} = useSelector(
    (state) => state.auth
  )

  const navigate = useNavigate();




  const handleInputChange = (e) =>{
    const {name, value} =  e.target
    setFormData({ ...formData, [name]:value })
  }

  const registerUser = async (e) => {
    // e.preventDefault();
    //   setIsLoading(true);

    // if (password !== cPassword) {
    //   toast.error("Password do not match.");
    // } else{
    //   axios.post('http://localhost:3001/register', { email, password })
    //   .then((result) => {
    //     console.log(result); 
    //     if(result.data === "Success"){
    //       toast.success("Registration Successful...");
    //       setTimeout(() => {
    //         setIsLoading(false)
    //         navigate('/login')
    //       }, 1000);
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error(err.message);
    //     setIsLoading(false);
    //   });
    // }  

    e.preventDefault();
    console.log(name, email, password, cPassword);
    if(!email || !password){
      return toast.error("All fields are required")
    }
    if(password.length < 6){
      return toast.error("Password must be up to 6 charaters")
    }
    if(!validateEmail(email)){
      return toast.error("Please enter a valid email");
    }
    if (password !== cPassword) {
        toast.error("Password do not match.");
    } 
    const userData = {
      name,
      email,
      password,
    }

    await dispatch(register(userData))
  };

  useEffect(() =>{
    if(isSuccess && isLoggedIn){
      navigate('/');

    }
    dispatch(RESET_AUTH());
  },[isSuccess, isLoggedIn, dispatch, navigate])

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Email"
                required
                name="email"

                value={email}
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"

                value={password}
                onChange={handleInputChange}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                name="cPassword"

                value={cPassword}
                onChange={handleInputChange}
              />

              <button
                typeof="submit"
                className="--btn --btn-primary --btn-block"
              >
                Register
              </button>
            </form>
            <span className={styles.register}>
              <p>Already an account? </p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={registerImg} alt="Register" width="400" />
        </div>
      </section>
    </>
  );
};

export default Register;


