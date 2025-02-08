import React, { useState } from "react";
import "./signup.css";
import {useNavigate}  from "react-router-dom";
const SignUp = () => {
const [data,setData] = useState({
  name : '',
  email: '',
  password:'',
  confirmpassword:''
})

const navigate = useNavigate();


const {name,email,password,confirmpassword} = data;
const changeHandler = (e) =>{
  setData({
    ...data,[e.target.name] : e.target.value
  })
}
const submitHandler = async(e) =>{
    e.preventDefault();
    if(name.length <= 5){
      alert("username must be at least 5 character");
    }else if(password !== confirmpassword){
      alert("passwords are not matching");
    }else{
      try {
        const response = await fetch("http://localhost:8000/user/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });
      
        console.log("Response Status:", response.status); // Log status code
      
        const text = await response.text(); // Read response as text
        console.log("Response Body:", text); // Log raw response body
      
        let result;
        try {
          result = JSON.parse(text); // Attempt to parse JSON
        } catch (parseError) {
          console.error("JSON Parse Error:", parseError);
          alert("Invalid response from server");
          return;
        }
      
        if (response.ok) {
          navigate("/login");
        } else {
          alert(`Error: ${result.message || "Unknown error occurred"}`);
        }
      } catch (error) {
        console.error("Signup Error:", error);
        alert("Something went wrong. Try again.");
      }
    }      
}
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>

        <form className="input-container" onSubmit={submitHandler}>
          <input type="text"  name="name" value={name}  onChange={changeHandler} placeholder="Full Name" required />
          <input type="email" name="email" value={email} onChange={changeHandler} placeholder="Email"  required />
          <input type="password" name="password" value={password} onChange={changeHandler} placeholder="password" required />
          <input type="password" name="confirmpassword" value={confirmpassword} onChange={changeHandler} placeholder="confirm password" require />
          {password !== confirmpassword? <p>passwords not matching</p> : null}
          <button type="submit" className="google-signup" onClick={submitHandler}>SignUp</button>
        </form>

        <div className="checkbox-container">
          <input
            type="checkbox" required/>
          <label htmlFor="terms">
            I agree to Zomato's <a href="#">Terms of Service</a>,{" "}
            <a href="#">Privacy Policy</a>, and{" "}
            <a href="#">Content Policies</a>.
          </label>
        </div>
        <p className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
