import React, { useState } from 'react'
import './Login.css'
import{login} from '../service/authService';
import { StoreContext } from '../contex/StoreContex';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const{setToken,loadCartData}=React.useContext(StoreContext);
  const navigate=useNavigate();
  const[data,setData]=useState({
    email:"",
    password:""
  });

  const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData(data=>({...data,[name]:value}));
  }

  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    try{
      const response = await login(data);
      if(response.status === 200){
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        await loadCartData(response.data.token);
        // navigate("/");
      }else{
        toast.error("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      console.error("Error occurred while logging in:", error);
      toast.error("An error occurred while logging in. Please try again.");
    }
    // console.log(data);
  }
  return (
   
  <div className="container login-container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
            <form onSubmit={onSubmitHandler}>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name='email' value={data.email} onChange={onChangeHandler} required/>
                <label htmlfor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password' value={data.password} onChange={onChangeHandler} required />
                <label htmlfor="floatingPassword">Password</label>
              </div>

             
           
              <div className="d-grid">
                <button className="btn btn-outline-primary btn-login text-uppercase" type="submit">Sign
                  in</button>
              </div>

            <div className="d-grid">
                <button className="btn btn-outline-warning btn-login text-uppercase mt-2" type="reset">Reset</button>
              </div>

              <div className="mt-4">
                Don't have an account? <Link to="/register" className="text-decoration-none">Signup</Link>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}

export default Login;