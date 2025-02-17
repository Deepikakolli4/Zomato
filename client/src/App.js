import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import RestaurantDetails from "./components/common/RestaurantDetails/RestaurantDetails";
import RestaurantSearch from "./components/RestaurantSearch/RestaurantSearch";

function App() {
  return (
    <Routes>  
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/restaurantDetail" element={<RestaurantDetails />} /> 
        <Route path="/restaurantSearch" element={<RestaurantSearch />} />
    </Routes>
  );
}

export default App;
