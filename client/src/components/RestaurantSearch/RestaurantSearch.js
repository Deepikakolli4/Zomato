import React from 'react';
import { useLocation } from 'react-router-dom';
import './RestaurantSearch.css';

const RestaurantSearch = () => {
    const location = useLocation();
    const { restaurants = [] } = location.state || {};  // Ensure it's an array
    console.log(restaurants);

    return (
        <div className="restaurant-search">
            <h1 className="title">Search Results</h1>
            {restaurants.length > 0 ? (
                <div className="restaurant-list">
                    {restaurants.map((restaurant) => (
                        <div key={restaurant.id} className="restaurant-card">
                            <img 
                                className="restaurant-img" 
                                src={restaurant.featured_image || "fallback-image-url.jpg"} 
                                alt={restaurant.name || "Restaurant Image"} 
                            />
                            <h2 className="restaurant-name">{restaurant.name || "Unknown Name"}</h2>
                            <p className="cuisines">{restaurant.cuisines || "Not available"}</p>
                            <p className="rating">
                                ⭐ {restaurant.user_rating?.aggregate_rating ?? "No Rating"}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
};

export default RestaurantSearch;
