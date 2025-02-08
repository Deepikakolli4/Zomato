import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = data;
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setData({
      ...data, [e.target.name]: e.target.value
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Store authToken and username in localStorage
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('username', name);  // Storing the username as well

        // Redirect to home page
        navigate("/home");
      } else {
        setError(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form className="input-container" onSubmit={submitHandler}>
          <input
            name="name"
            value={name}
            placeholder="Username"
            type="text"
            required
            onChange={changeHandler}
          />
          <input
            name="email"
            value={email}
            placeholder="Email"
            type="email"
            required
            onChange={changeHandler}
          />
          <input
            name="password"
            value={password}
            placeholder="Password"
            type="password"
            required
            onChange={changeHandler}
          />
          <button className="gmail-login" onClick={submitHandler}>Login</button>
          <p className="create-account">
            New to Zomato? <a href="/signup">Create Account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
