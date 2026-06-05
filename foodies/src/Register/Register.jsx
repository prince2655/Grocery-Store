import React, { useState } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { registerUser } from '../service/authService';

const Register = () => {
  const navigate = useNavigate();
  const[data,setData]=useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setData(data=>({...data,[name]:value}));
  }

  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    // console.log(data);
    try{
     
      const response = await registerUser(data);
      if(response.status === 200){
        toast.success("Registration successful! Please log in.");
        navigate("/login");
      }else{
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred while registering:", error);
      toast.error("An error occurred while registering. Please try again.");
    }
  }
  
  return (
      <div className="container login-container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">SignUp</h5>
            <form onSubmit={onSubmitHandler}>

                <div className="form-floating mb-3">
                <input type="name" className="form-control" id="floatingName" placeholder="John Doe" name='name' value={data.name} onChange={onChangeHandler} required/>
                <label htmlfor="floatingName">Full Name</label>
              </div>

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
                Already have an account? <Link to="/login" className="text-decoration-none">Sign in</Link>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Register;