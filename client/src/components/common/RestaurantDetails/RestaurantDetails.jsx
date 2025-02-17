import React from 'react';
import { useLocation } from 'react-router-dom';
import "./RestaurantDetails.css"; 

function RestaurantDetails() {
   const location = useLocation();
   const { restaurant } = location.state || {};
   console.log(restaurant);

   if (!restaurant) {
      return <p className="no-data">No restaurant data available here!!</p>;
   }

   return (
      <div className="restaurant-detail">
         <h1 className="restaurant-name">{restaurant.name}</h1>
         
         <div className="content-wrapper">
            <div className="image-container">
               <img 
                  className="restaurant-image"
                  src={restaurant.featured_image || "fallback-image-url.jpg"} 
                  alt={restaurant.name} 
               />
            </div>

            <div className="details-container">
               <p className="cuisines"><strong>Cuisines:</strong> {restaurant.cuisines}</p>
               <p className="location"><strong>Location:</strong> {restaurant.location.address}</p>
               <p className="cost"><strong>Average Cost for Two:</strong> ₹{restaurant.average_cost_for_two}</p>
               <p className="rating">
                  <strong>Rating:</strong> {restaurant.user_rating.aggregate_rating} ({restaurant.user_rating.rating_text})
               </p>
               <p className="votes"><strong>Votes:</strong> {restaurant.user_rating.votes}</p>
               <p className="price-range"><strong>Price Range:</strong> {restaurant.price_range}</p>
               <p className="delivery">
                  <strong>Online Delivery:</strong> {restaurant.has_online_delivery ? "Available" : "Not Available"}
               </p>
               <p className="booking">
                  <strong>Table Booking:</strong> {restaurant.has_table_booking ? "Available" : "Not Available"}
               </p>

               <div className="restaurant-links">
                  <a href={restaurant.menu_url} target="_blank" rel="noopener noreferrer">View Menu</a>
                  <a href={restaurant.url} target="_blank" rel="noopener noreferrer">Visit Website</a>
               </div>
            </div>
         </div>
      </div>
   );
}

export default RestaurantDetails;