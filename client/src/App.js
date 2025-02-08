import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import RestaurantDetail from "./components/common/RestaurantDetails/RestaurantDetails";
function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/restaurantDetail" element={<RestaurantDetail />} />
      </Routes>
  );
}

export default App;
